import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("GHL API Credentials", () => {
  it("should have GHL API credentials configured", () => {
    // Verify environment variables are set and not empty
    expect(ENV.ghlApiKey).toBeTruthy();
    expect(ENV.ghlApiKey).toContain("bot-");
    
    expect(ENV.ghlAgencyId).toBeTruthy();
    expect(ENV.ghlAgencyId.length).toBeGreaterThan(10);
    
    expect(ENV.ghlSnapshotId).toBeTruthy();
    expect(ENV.ghlSnapshotId.length).toBeGreaterThan(10);
    
    console.log("✓ GHL API Key is set (starts with 'bot-')");
    console.log("✓ GHL Agency ID is set");
    console.log("✓ GHL Snapshot ID is set");
  });
});
