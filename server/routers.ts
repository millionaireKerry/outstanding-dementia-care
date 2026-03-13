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
