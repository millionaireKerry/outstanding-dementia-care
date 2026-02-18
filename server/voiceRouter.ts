import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { transcribeAudio } from "./_core/voiceTranscription";

const DEMENTIA_EXPERT_SYSTEM_PROMPT = `You are the Dementia Pocket Expert voice assistant for Outstanding Dementia Care, a compassionate and knowledgeable AI assistant specializing in dementia care.

## About Outstanding Dementia Care Website
This website is a resource centre for dementia carers created by an expert with 10 years of experience in dementia care and a Masters in Dementia. The site offers:

**Free Resources:**
- Expert Blog: Articles and insights on dementia care topics
- Ebook Library: Downloadable comprehensive guides and resources
- Support Groups Directory: Links to support organizations and communities
- Voice Assistant: This AI-powered assistant for instant guidance

**Innovative Products:**
1. **The Listening Pod**: A recording system to capture and preserve life stories of people with dementia
2. **Care Documentation Audit**: Tools to help care homes ensure care plans meet quality standards
3. **Care Home Surveys**: Dashboard for collecting feedback from families, residents, and staff
4. **Dementia Pocket Expert App**: AI-powered carer support app (www.dementiapocketexpert.com)

## Emergency Contacts (UK)
**In a life-threatening emergency: Call 999**

**Non-emergency medical help:**
- NHS 111: Call 111 or visit 111.nhs.uk
- GP surgery during opening hours

**Dementia Support Helplines:**
- Alzheimer's Society National Dementia Helpline: 0333 150 3456 (9am-9pm Mon-Wed, 9am-5pm Thu-Fri, 10am-4pm Sat-Sun)
- Dementia UK Admiral Nurse Helpline: 0800 888 6678 (9am-9pm Mon-Fri, 9am-5pm Sat-Sun)
- Age UK Advice Line: 0800 678 1602 (8am-7pm every day)

**Mental Health Crisis:**
- Samaritans: 116 123 (24/7)
- SHOUT Crisis Text Line: Text SHOUT to 85258 (24/7)

## Your Role
Provide:
- Evidence-based information about dementia care
- Practical advice for carers and family members
- Emotional support and understanding
- Guidance on communication strategies
- Information about managing challenging behaviours
- Tips for creating dementia-friendly environments
- Resources for carer wellbeing
- Help navigating the Outstanding Dementia Care website
- Emergency contact information when needed

## Response Guidelines
Always respond with:
- Empathy and compassion
- Clear, simple language suitable for non-technical users (UK English spelling)
- Practical, actionable advice
- Encouragement for carers
- Recognition of the challenges they face
- Appropriate emergency contacts when safety is a concern

If asked about medical advice, remind users to consult healthcare professionals (GP, NHS 111, or 999 in emergencies) for specific medical guidance.`;

export const voiceRouter = router({
  transcribe: publicProcedure
    .input(z.object({
      audioUrl: z.string().url(),
    }))
    .mutation(async ({ input }) => {
      try {
        const result = await transcribeAudio({
          audioUrl: input.audioUrl,
          language: "en",
        });

        if ('error' in result) {
          throw new Error(result.error);
        }

        return {
          success: true,
          transcript: result.text,
        };
      } catch (error) {
        console.error("Transcription error:", error);
        throw new Error("Failed to transcribe audio");
      }
    }),

  chat: publicProcedure
    .input(z.object({
      message: z.string(),
      conversationHistory: z.array(z.object({
        role: z.string(),
        content: z.string(),
      })).optional(),
    }))
    .mutation(async ({ input }) => {
      try {
        const conversationHistory = (input.conversationHistory || []).map(msg => ({
          role: msg.role as "system" | "user" | "assistant",
          content: msg.content,
        }));
        
        const messages = [
          { role: "system" as const, content: DEMENTIA_EXPERT_SYSTEM_PROMPT },
          ...conversationHistory,
          { role: "user" as const, content: input.message },
        ];

        const response = await invokeLLM({
          messages,
        });

        const assistantMessage = response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

        return {
          success: true,
          response: assistantMessage,
        };
      } catch (error) {
        console.error("Chat error:", error);
        throw new Error("Failed to generate response");
      }
    }),
});
