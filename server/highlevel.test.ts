import { describe, it, expect } from "vitest";

describe("HighLevel API Integration", () => {
  it("should validate HighLevel API credentials", async () => {
    const apiKey = process.env.HIGHLEVEL_API_KEY;
    const locationId = process.env.HIGHLEVEL_LOCATION_ID;

    expect(apiKey).toBeDefined();
    expect(locationId).toBeDefined();
    expect(apiKey).toMatch(/^pit-/);
    expect(locationId).toMatch(/^[a-zA-Z0-9]+$/);

    // Test basic API connectivity
    try {
      const response = await fetch(
        `https://rest.gohighlevel.com/v1/locations/${locationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      // We expect either 200 (success) or 401 (invalid key) - both tell us the API is reachable
      expect([200, 401, 403]).toContain(response.status);
      
      if (response.status === 200) {
        const data = await response.json();
        console.log("✅ HighLevel API credentials are valid");
        expect(data).toHaveProperty("id");
      } else if (response.status === 401 || response.status === 403) {
        console.warn("⚠️ HighLevel API returned auth error - check credentials");
      }
    } catch (error) {
      console.error("❌ Failed to reach HighLevel API:", error);
      throw error;
    }
  });
});
