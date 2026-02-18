import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("voice.chat", () => {
  it("should respond to general dementia care questions", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.voice.chat({
      message: "What is dementia?",
    });

    expect(result.success).toBe(true);
    expect(result.response).toBeTruthy();
    expect(typeof result.response).toBe("string");
    expect(result.response.length).toBeGreaterThan(0);
  }, 10000);

  it("should provide website navigation help", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.voice.chat({
      message: "What resources are available on this website?",
    });

    expect(result.success).toBe(true);
    expect(result.response).toBeTruthy();
    // Should mention blog, ebooks, or support groups
    const response = result.response.toLowerCase();
    const hasWebsiteInfo = 
      response.includes("blog") || 
      response.includes("ebook") || 
      response.includes("support");
    expect(hasWebsiteInfo).toBe(true);
  }, 10000);

  it("should provide emergency contact information when asked", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.voice.chat({
      message: "What should I do in an emergency?",
    });

    expect(result.success).toBe(true);
    expect(result.response).toBeTruthy();
    // Should mention 999 or NHS 111
    const response = result.response.toLowerCase();
    const hasEmergencyInfo = 
      response.includes("999") || 
      response.includes("111") || 
      response.includes("emergency");
    expect(hasEmergencyInfo).toBe(true);
  }, 10000);

  it("should maintain conversation context", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.voice.chat({
      message: "Tell me about The Listening Pod",
      conversationHistory: [
        { role: "user", content: "What products do you offer?" },
        { role: "assistant", content: "We offer several innovative products including The Listening Pod, Care Documentation Audit, Care Home Surveys, and Dementia Pocket Expert app." },
      ],
    });

    expect(result.success).toBe(true);
    expect(result.response).toBeTruthy();
    const response = result.response.toLowerCase();
    const mentionsListeningPod = 
      response.includes("listening pod") || 
      response.includes("recording") || 
      response.includes("life stor");
    expect(mentionsListeningPod).toBe(true);
  }, 10000);

  it("should respond with empathy and compassion", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.voice.chat({
      message: "I'm struggling to cope with caring for my mother with dementia",
    });

    expect(result.success).toBe(true);
    expect(result.response).toBeTruthy();
    expect(result.response.length).toBeGreaterThan(50);
    // Response should be supportive and understanding
  }, 10000);
});
