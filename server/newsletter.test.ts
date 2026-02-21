import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import * as db from "./db";

describe("Newsletter Subscription", () => {
  const caller = appRouter.createCaller({
    user: null,
    req: {} as any,
    res: {} as any,
  });

  it("should subscribe a new email successfully", async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    
    const result = await caller.newsletter.subscribe({
      email: testEmail,
      name: "Test User",
      source: "test",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("subscribed");

    // Verify in database
    const subscriber = await db.getNewsletterSubscriberByEmail(testEmail);
    expect(subscriber).toBeDefined();
    expect(subscriber?.email).toBe(testEmail);
    expect(subscriber?.name).toBe("Test User");
    expect(subscriber?.status).toBe("active");
  });

  it("should prevent duplicate subscriptions", async () => {
    const testEmail = `duplicate-${Date.now()}@example.com`;
    
    // First subscription
    await caller.newsletter.subscribe({
      email: testEmail,
      source: "test",
    });

    // Try to subscribe again
    const result = await caller.newsletter.subscribe({
      email: testEmail,
      source: "test",
    });

    expect(result.success).toBe(false);
    expect(result.message).toContain("already subscribed");
  });

  it("should validate email format", async () => {
    await expect(
      caller.newsletter.subscribe({
        email: "invalid-email",
        source: "test",
      })
    ).rejects.toThrow();
  });

  it("should unsubscribe an email", async () => {
    const testEmail = `unsubscribe-${Date.now()}@example.com`;
    
    // Subscribe first
    await caller.newsletter.subscribe({
      email: testEmail,
      source: "test",
    });

    // Unsubscribe
    const result = await caller.newsletter.unsubscribe({
      email: testEmail,
    });

    expect(result.success).toBe(true);

    // Verify status changed
    const subscriber = await db.getNewsletterSubscriberByEmail(testEmail);
    expect(subscriber?.status).toBe("unsubscribed");
    expect(subscriber?.unsubscribedAt).toBeDefined();
  });
});
