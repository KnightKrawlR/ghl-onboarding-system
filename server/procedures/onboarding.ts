import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { onboardingSubmissions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { ghlService } from "../services/ghl";

const onboardingFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyPhone: z.string().min(1, "Phone is required"),
  companyEmail: z.string().email("Valid email is required"),
  companyAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().default("US"),
  companyWebsite: z.string().optional(),
  ownerFirstName: z.string().min(1, "First name is required"),
  ownerLastName: z.string().min(1, "Last name is required"),
  ownerEmail: z.string().email("Valid email is required"),
  ownerPhone: z.string().min(1, "Phone is required"),
  businessHours: z.string().optional(),
});

export const onboardingRouter = router({
  // Public endpoint - submit onboarding form
  submit: publicProcedure
    .input(onboardingFormSchema)
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      const result = await db
        .insert(onboardingSubmissions)
        .values({
          companyName: input.companyName,
          companyPhone: input.companyPhone,
          companyEmail: input.companyEmail,
          companyAddress: input.companyAddress,
          city: input.city,
          state: input.state,
          postalCode: input.postalCode,
          country: input.country,
          companyWebsite: input.companyWebsite,
          ownerFirstName: input.ownerFirstName,
          ownerLastName: input.ownerLastName,
          ownerEmail: input.ownerEmail,
          ownerPhone: input.ownerPhone,
          businessHours: input.businessHours,
          status: "pending",
        });

      // MySQL returns the insert ID in the result
      const submissionId = Number((result as any).insertId || result[0]?.insertId);
      return { success: true, submissionId };
    }),

  // Protected endpoint - list all submissions
  list: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    
    const submissions = await db
      .select()
      .from(onboardingSubmissions)
      .orderBy(onboardingSubmissions.createdAt);

    return submissions;
  }),

  // Protected endpoint - approve submission and create GHL sub-account
  approve: protectedProcedure
    .input(z.object({ submissionId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      // Get the submission
      const [submission] = await db
        .select()
        .from(onboardingSubmissions)
        .where(eq(onboardingSubmissions.id, input.submissionId));

      if (!submission) {
        throw new Error("Submission not found");
      }

      if (submission.status === "approved") {
        throw new Error("Submission already approved");
      }

      // Create GHL location with snapshot
      const location = await ghlService.createLocationWithSnapshot({
        name: submission.companyName,
        email: submission.companyEmail,
        phone: submission.companyPhone,
        address: submission.companyAddress,
        city: submission.city,
        state: submission.state,
        postalCode: submission.postalCode,
        country: submission.country,
        website: submission.companyWebsite || undefined,
        timezone: "America/New_York",
      });

      // Update submission status
      await db
        .update(onboardingSubmissions)
        .set({
          status: "approved",
          ghlLocationId: location.id,
        })
        .where(eq(onboardingSubmissions.id, input.submissionId));

      return { success: true, locationId: location.id };
    }),

  // Protected endpoint - reject submission
  reject: protectedProcedure
    .input(z.object({ submissionId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");
      
      await db
        .update(onboardingSubmissions)
        .set({ status: "rejected" })
        .where(eq(onboardingSubmissions.id, input.submissionId));

      return { success: true };
    }),
});
