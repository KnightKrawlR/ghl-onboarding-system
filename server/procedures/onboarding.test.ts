import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "../routers";
import { getDb } from "../db";
import { onboardingSubmissions } from "../../drizzle/schema";

describe("Onboarding Procedures", () => {
  beforeAll(async () => {
    // Ensure database is connected
    const db = await getDb();
    expect(db).toBeDefined();
  });

  it("should submit onboarding form successfully", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.onboarding.submit({
      companyName: "Test HVAC Company",
      companyPhone: "(555) 123-4567",
      companyEmail: "test@hvac.com",
      companyWebsite: "https://testhvac.com",
      companyAddress: "123 Test Street",
      city: "Test City",
      state: "NY",
      postalCode: "10001",
      country: "US",
      ownerFirstName: "John",
      ownerLastName: "Doe",
      ownerEmail: "john@hvac.com",
      ownerPhone: "(555) 987-6543",
      businessHours: "Mon-Fri 9-5",
    });

    expect(result.success).toBe(true);
    expect(result.submissionId).toBeGreaterThan(0);
  });

  it("should validate required fields", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    await expect(
      caller.onboarding.submit({
        companyName: "",
        companyPhone: "",
        companyEmail: "invalid",
        companyWebsite: "",
        companyAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "US",
        ownerFirstName: "",
        ownerLastName: "",
        ownerEmail: "",
        ownerPhone: "",
      })
    ).rejects.toThrow();
  });

  it("should list submissions for authenticated users", async () => {
    const caller = appRouter.createCaller({
      user: { id: 1, openId: "test", role: "admin" },
      req: {} as any,
      res: {} as any,
    });

    const submissions = await caller.onboarding.list();
    expect(Array.isArray(submissions)).toBe(true);
  });

  it("should reject list for unauthenticated users", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    await expect(caller.onboarding.list()).rejects.toThrow();
  });
});
