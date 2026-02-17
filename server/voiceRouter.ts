import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { transcribeAudio } from "./_core/voiceTranscription";

const DEMENTIA_EXPERT_SYSTEM_PROMPT = `You are the Dementia Pocket Expert, a compassionate and knowledgeable AI assistant specializing in dementia care. 

Your role is to provide:
- Evidence-based information about dementia care
- Practical advice for carers and family members
- Emotional support and understanding
- Guidance on communication strategies with people living with dementia
- Information about managing challenging behaviors
- Tips for creating dementia-friendly environments
- Resources for carer wellbeing

Always respond with:
- Empathy and compassion
- Clear, simple language suitable for non-technical users
- Practical, actionable advice
- Encouragement for carers
- Recognition of the challenges they face

If asked about medical advice, remind users to consult healthcare professionals for specific medical guidance.`;

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
