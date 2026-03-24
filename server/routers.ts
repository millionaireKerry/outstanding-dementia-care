import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { voiceRouter } from "./voiceRouter";
import { uploadRouter } from "./uploadRouter";
import { createCheckoutSession } from "./stripeWebhook";
import { PRODUCTS, type ProductKey } from "./products";
import { createHighLevelContact } from "./highlevel";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  voice: voiceRouter,
  upload: uploadRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  blog: router({
    list: publicProcedure.query(async () => {
      return await db.getAllBlogPosts(true);
    }),

    listAll: adminProcedure.query(async () => {
      return await db.getAllBlogPosts(false);
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await db.getBlogPostBySlug(input.slug);
      }),

    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getBlogPostById(input.id);
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().min(1),
        coverImageUrl: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().default(false),
        featured: z.boolean().default(false),
      }))
      .mutation(async ({ input, ctx }) => {
        const publishedAt = input.published ? new Date() : null;
        await db.createBlogPost({
          ...input,
          authorId: ctx.user.id,
          publishedAt,
        });
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        coverImageUrl: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().optional(),
        featured: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        const post = await db.getBlogPostById(id);
        
        if (!post) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Blog post not found' });
        }

        const publishedAt = updates.published && !post.published ? new Date() : undefined;
        
        await db.updateBlogPost(id, {
          ...updates,
          ...(publishedAt && { publishedAt }),
        });
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteBlogPost(input.id);
        return { success: true };
      }),

    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return await db.searchBlogPosts(input.query);
      }),
  }),

  ebook: router({
    list: publicProcedure.query(async () => {
      return await db.getAllEbooks(true);
    }),

    listAll: adminProcedure.query(async () => {
      return await db.getAllEbooks(false);
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getEbookById(input.id);
      }),

    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        coverImageUrl: z.string().optional(),
        fileUrl: z.string().min(1),
        fileKey: z.string().min(1),
        fileSize: z.number().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().default(false),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createEbook({
          ...input,
          authorId: ctx.user.id,
        });
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        coverImageUrl: z.string().optional(),
        fileUrl: z.string().optional(),
        fileKey: z.string().optional(),
        fileSize: z.number().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        await db.updateEbook(id, updates);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteEbook(input.id);
        return { success: true };
      }),

    incrementDownload: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.incrementEbookDownload(input.id);
        return { success: true };
      }),
    downloadWithEmail: publicProcedure
      .input(z.object({
        ebookId: z.string(),
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const contact = await createHighLevelContact({
            email: input.email,
            firstName: input.firstName,
            lastName: input.lastName,
            source: "Website - Ebook Download",
            tags: ["ebook-download", `ebook-${input.ebookId}`],
          });

          if (!contact) {
            console.warn("[Ebook] Failed to create HighLevel contact");
            return { success: true, message: "Ebook download initiated" };
          }

          return { success: true, message: "Contact added to CRM" };
        } catch (error) {
          console.error("[Ebook] Error:", error);
          return { success: true, message: "Ebook download initiated" };
        }
      }),
  }),

  supportGroup: router({
    list: publicProcedure.query(async () => {
      return await db.getAllSupportGroups(true);
    }),

    listAll: adminProcedure.query(async () => {
      return await db.getAllSupportGroups(false);
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getSupportGroupById(input.id);
      }),

    create: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        url: z.string().url(),
        category: z.string().optional(),
        country: z.string().optional(),
        region: z.string().optional(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().optional(),
        published: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        await db.createSupportGroup(input);
        return { success: true };
      }),

    update: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        url: z.string().url().optional(),
        category: z.string().optional(),
        country: z.string().optional(),
        region: z.string().optional(),
        contactEmail: z.string().email().optional(),
        contactPhone: z.string().optional(),
        published: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...updates } = input;
        await db.updateSupportGroup(id, updates);
        return { success: true };
      }),

    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteSupportGroup(input.id);
        return { success: true };
      }),
  }),

  dailyGoodNews: router({
    // Generate today's edition
    generateToday: protectedProcedure.mutation(async ({ ctx }) => {
      const { generateDailyGoodNewsContent } = await import('./dailyGoodNews');
      const { generateDailyGoodNewsPDF } = await import('./dailyGoodNewsPDF');
      const { storagePut } = await import('./storage');
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Check if edition already exists for today
      const existing = await db.getDailyGoodNewsEditionByDate(today);
      if (existing) {
        return { success: true, edition: existing, message: 'Today\'s edition already exists' };
      }
      
      // Generate content
      const content = await generateDailyGoodNewsContent(today);
      
      // Generate PDF
      const pdfBuffer = await generateDailyGoodNewsPDF(content, today);
      
      // Upload to S3
      const dateStr = today.toISOString().split('T')[0];
      const fileKey = `daily-good-news/${dateStr}.pdf`;
      const { url: pdfUrl } = await storagePut(fileKey, pdfBuffer, 'application/pdf');
      
      // Save to database
      await db.createDailyGoodNewsEdition({
        editionDate: today,
        headline: content.headline,
        stories: JSON.stringify(content.stories),
        reminiscenceContent: content.reminiscenceContent,
        quote: content.quote,
        pdfUrl,
        pdfKey: fileKey,
        generatedBy: ctx.user.id,
      });
      
      const edition = await db.getDailyGoodNewsEditionByDate(today);
      return { success: true, edition, message: 'Today\'s edition generated successfully!' };
    }),
    
    // List all editions
    list: publicProcedure.query(async () => {
      return await db.getAllDailyGoodNewsEditions();
    }),
    
    // Get edition by date
    getByDate: publicProcedure
      .input(z.object({ date: z.date() }))
      .query(async ({ input }) => {
        return await db.getDailyGoodNewsEditionByDate(input.date);
      }),
    
    // Download edition (increment counter)
    download: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.incrementDailyGoodNewsDownloadCount(input.id);
        return { success: true };
      }),
    
    // Get example edition (public, no auth required)
    getExample: publicProcedure.query(async () => {
      return await db.getExampleDailyGoodNewsEdition();
    }),
  }),

  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
        source: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        // Check if email already exists
        const existing = await db.getNewsletterSubscriberByEmail(input.email);
        
        if (existing) {
          if (existing.status === 'unsubscribed') {
            // Resubscribe
            await db.createNewsletterSubscriber({
              ...input,
              status: 'active',
            });
            return { success: true, message: 'Successfully resubscribed!' };
          }
          return { success: false, message: 'You are already subscribed!' };
        }
        
        await db.createNewsletterSubscriber({
          ...input,
          status: 'active',
        });
        // Sync to HighLevel CRM (non-fatal)
        try {
          const nameParts = (input.name || "").trim().split(" ");
          await createHighLevelContact({
            email: input.email,
            firstName: nameParts[0] || undefined,
            lastName: nameParts.slice(1).join(" ") || undefined,
            source: input.source || "Website - Newsletter Signup",
            tags: ["newsletter-subscriber"],
          });
        } catch (hlErr) {
          console.warn("[Newsletter] HighLevel sync failed (non-fatal):", hlErr);
        }
        return { success: true, message: 'Successfully subscribed!' };
      }),

    unsubscribe: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await db.unsubscribeNewsletter(input.email);
        return { success: true };
      }),

    list: adminProcedure.query(async () => {
      return await db.getAllNewsletterSubscribers(true);
    }),

    listAll: adminProcedure.query(async () => {
      return await db.getAllNewsletterSubscribers(false);
    }),
  }),

  dotty: router({
    chat: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(1000),
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })).optional().default([]),
      }))
      .mutation(async ({ input }) => {
        const { invokeLLM } = await import("./_core/llm");
        const systemPrompt = `You are Dotty, a wonderfully cheeky, down-to-earth elderly English woman who lives in a care home. You have a magical gift: you can travel through time and watch history unfold, and you use what you've seen to suggest brilliant activities and ideas for people living with dementia.

Your personality:
- Warm, funny, and a little bit cheeky — like everyone's favourite nan
- Down-to-earth and practical, never preachy or clinical
- You speak in a natural, conversational English way (not overly formal)
- You love a good reminisce and often say things like "Ooh, I remember when..." or "You know what, love..."
- You're enthusiastic and encouraging — you genuinely care about the people in care homes
- Occasionally you drop in a cheeky comment or a little joke
- You sometimes reference things you've "seen" on your time travels to make suggestions more vivid

You can help with three things:
1. ACTIVITY IDEAS: Suggest creative, practical activities for people living with dementia. Tailor them to occasions (Pancake Day, Christmas, Easter, VE Day), interests (gardening, music, cooking, dancing), or specific groups (gentlemen, ladies, mixed groups, people with advanced dementia). Give 3-5 specific ideas with brief how-to notes.
2. QUIZ GENERATION: When asked for a quiz, generate 8-10 questions with answers on the given topic. Format them clearly as Q: and A: pairs. Make them accessible and fun — not too hard. Mix in a cheeky comment or two.
3. REMINISCENCE PROMPTS: Suggest conversation starters, memories to explore, or historical events from a given decade that would spark lovely reminiscence sessions.

Always be encouraging and practical. Keep responses friendly and not too long — care staff are busy people! End with a little Dotty-style sign-off.`;

        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
          { role: "system", content: systemPrompt },
          ...input.history.map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
          { role: "user", content: input.message },
        ];

        const response = await invokeLLM({ messages });
        const rawContent = response.choices?.[0]?.message?.content;
        const reply = typeof rawContent === "string" ? rawContent : "Ooh, sorry love, I've gone a bit fuzzy — try asking me again!";
        return { reply };
      }),
  }),

  enquiry: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        phone: z.string().optional().default(""),
        message: z.string().min(1).max(2000),
      }))
      .mutation(async ({ input }) => {
        const { notifyOwner } = await import("./_core/notification");
        await notifyOwner({
          title: `New Enquiry from ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone || "Not provided"}\n\nMessage:\n${input.message}\n\n---\nBook a call: https://calendar.app.google/r1FrZpnQRMx9q6N57`,
        });
        try {
          await createHighLevelContact({
            email: input.email,
            firstName: input.name.split(" ")[0] || input.name,
            lastName: input.name.split(" ").slice(1).join(" ") || "",
            phone: input.phone || "",
            tags: ["website-enquiry", "dotty-widget"],
          });
        } catch (_e) {
          // CRM failure is non-fatal
        }
        return { success: true };
      }),

    widgetChat: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(1000),
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })).optional().default([]),
      }))
      .mutation(async ({ input }) => {
        const { invokeLLM } = await import("./_core/llm");
        const systemPrompt = `You are Dotty, a wonderfully warm and cheeky elderly English woman who is the face of Outstanding Dementia Care — a resource centre for dementia carers run by Kerry, who has 10 years of experience in dementia care and is completing her Masters in Dementia (summer 2026).

Your job is to answer questions about the Outstanding Dementia Care website and services, and to collect contact details from people who want to get in touch.

ABOUT OUTSTANDING DEMENTIA CARE:
- Free resources: blogs, ebooks, support group links
- Ask Dotty / Chat with Dotty: AI chat for activity ideas, quizzes, and reminiscence prompts
- Voice Assistant: voice-powered version of Ask Dotty
- Products: The Listening Pod (records life stories), Care Documentation Audit (audits care plans), Care Home Surveys (family/resident/staff surveys dashboard)
- Training: The Dementia Experience - immersive training day for care teams
- Family Workshop: online workshop for families (£25)
- Consultancy: free 30-minute discovery call, then bespoke support for care homes
- Dream Home: gallery of an ideal dementia-friendly care home
- Daily Good News: positive newspaper for care homes to print and share
- Book a free call: https://calendar.app.google/r1FrZpnQRMx9q6N57
- Email: Kerry@outstandingdementiacare.com

YOUR BEHAVIOUR:
1. Answer questions about the site and services warmly and helpfully in 2-3 sentences max
2. If someone wants to get in touch or book, give them the booking link and email
3. If someone shares their name, email or phone number, acknowledge it warmly and tell them Kerry will be in touch soon
4. Be warm, cheeky, and encouraging — like everyone's favourite nan
5. Keep responses SHORT — 2-4 sentences only

Do NOT discuss anything unrelated to dementia care or this website.`;

        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
          { role: "system", content: systemPrompt },
          ...input.history.map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
          { role: "user", content: input.message },
        ];

        const response = await invokeLLM({ messages });
        const rawContent = response.choices?.[0]?.message?.content;
        const reply = typeof rawContent === "string" ? rawContent : "Ooh, sorry love — something went a bit wonky! Try again in a moment. 🌸";
        return { reply };
      }),
  }),

  payments: router({
    createCheckout: publicProcedure
      .input(z.object({
        productKey: z.enum(["familyWorkshop", "dementiaExperience", "excellenceProgramme"]),
        origin: z.string().url(),
      }))
      .mutation(async ({ input, ctx }) => {
        const product = PRODUCTS[input.productKey as ProductKey];
        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }
        const session = await createCheckoutSession({
          productKey: input.productKey,
          productName: product.name,
          amount: product.amount,
          currency: product.currency,
          customerEmail: ctx.user?.email ?? undefined,
          userId: ctx.user?.id?.toString(),
          origin: input.origin,
          successPath: input.productKey === "familyWorkshop" ? "/family-workshop?booked=true" : "/dementia-experience?booked=true",
          cancelPath: input.productKey === "familyWorkshop" ? "/family-workshop" : "/dementia-experience",
        });
        return session;
      }),
  }),
});
export type AppRouter = typeof appRouter;
