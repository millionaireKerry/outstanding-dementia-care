import { router, publicProcedure } from "./_core/trpc";
import { z } from "zod";
import { storagePut } from "./storage";

export const uploadRouter = router({
  uploadFile: publicProcedure
    .input(z.object({
      fileData: z.string(), // base64 encoded file data
      fileName: z.string(),
      contentType: z.string(),
    }))
    .mutation(async ({ input }) => {
      try {
        // Decode base64 to buffer
        const buffer = Buffer.from(input.fileData, 'base64');
        
        // Upload to S3
        const result = await storagePut(
          input.fileName,
          buffer,
          input.contentType
        );

        return {
          success: true,
          key: result.key,
          url: result.url,
        };
      } catch (error) {
        console.error("Upload error:", error);
        throw new Error("Failed to upload file");
      }
    }),
});
