import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const onboardingSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  companyPhone: z.string().min(10, "Valid phone number is required"),
  companyEmail: z.string().email("Valid email is required"),
  companyWebsite: z.string().optional(),
  companyAddress: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().length(2, "State code must be 2 letters"),
  postalCode: z.string().min(5, "ZIP code is required"),
  country: z.string().default("US"),
  ownerFirstName: z.string().min(2, "First name is required"),
  ownerLastName: z.string().min(2, "Last name is required"),
  ownerEmail: z.string().email("Valid email is required"),
  ownerPhone: z.string().min(10, "Valid phone number is required"),
  businessHours: z.string().optional(),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function OnboardingForm() {
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      country: "US",
    },
  });

  const submitMutation = trpc.onboarding.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Onboarding form submitted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to submit: ${error.message}`);
    },
  });

  const onSubmit = (data: OnboardingFormData) => {
    submitMutation.mutate(data);
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-3xl">Thank You!</CardTitle>
          <CardDescription className="text-lg">
            Your onboarding form has been submitted successfully. Our team will review your
            information and set up your HVAC automation system within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 mb-4">
            You'll receive an email with your login credentials once your account is ready.
          </p>
          <Button onClick={() => window.location.href = "/"} variant="outline">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">HVAC Client Onboarding Form</CardTitle>
        <CardDescription className="text-lg">
          Please fill out this form to get started with your HVAC business automation package.
          We'll set up your AI voice agent, calendars, and complete CRM system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Company Information</h3>
            
            <div>
              <Label htmlFor="companyName">Business Name *</Label>
              <Input
                id="companyName"
                {...register("companyName")}
                placeholder="ABC Heating & Cooling"
              />
              {errors.companyName && (
                <p className="text-sm text-red-500 mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyEmail">Company Email *</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  {...register("companyEmail")}
                  placeholder="info@abchvac.com"
                />
                {errors.companyEmail && (
                  <p className="text-sm text-red-500 mt-1">{errors.companyEmail.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="companyPhone">Company Phone *</Label>
                <Input
                  id="companyPhone"
                  {...register("companyPhone")}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.companyPhone && (
                  <p className="text-sm text-red-500 mt-1">{errors.companyPhone.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input
                id="companyWebsite"
                {...register("companyWebsite")}
                placeholder="https://www.abchvac.com"
              />
            </div>
          </div>

          {/* Company Address */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Company Address</h3>
            
            <div>
              <Label htmlFor="companyAddress">Street Address *</Label>
              <Input
                id="companyAddress"
                {...register("companyAddress")}
                placeholder="123 Main Street"
              />
              {errors.companyAddress && (
                <p className="text-sm text-red-500 mt-1">{errors.companyAddress.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register("city")}
                  placeholder="Springfield"
                />
                {errors.city && (
                  <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  {...register("state")}
                  placeholder="IL"
                  maxLength={2}
                />
                {errors.state && (
                  <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="postalCode">ZIP Code *</Label>
                <Input
                  id="postalCode"
                  {...register("postalCode")}
                  placeholder="62701"
                />
                {errors.postalCode && (
                  <p className="text-sm text-red-500 mt-1">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="country">Country *</Label>
              <Select
                value={watch("country")}
                onValueChange={(value) => setValue("country", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Owner Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Owner/Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerFirstName">First Name *</Label>
                <Input
                  id="ownerFirstName"
                  {...register("ownerFirstName")}
                  placeholder="John"
                />
                {errors.ownerFirstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.ownerFirstName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ownerLastName">Last Name *</Label>
                <Input
                  id="ownerLastName"
                  {...register("ownerLastName")}
                  placeholder="Smith"
                />
                {errors.ownerLastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.ownerLastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerEmail">Email *</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  {...register("ownerEmail")}
                  placeholder="john@abchvac.com"
                />
                {errors.ownerEmail && (
                  <p className="text-sm text-red-500 mt-1">{errors.ownerEmail.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="ownerPhone">Phone *</Label>
                <Input
                  id="ownerPhone"
                  {...register("ownerPhone")}
                  placeholder="+1 (555) 987-6543"
                />
                {errors.ownerPhone && (
                  <p className="text-sm text-red-500 mt-1">{errors.ownerPhone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Additional Information</h3>
            
            <div>
              <Label htmlFor="businessHours">Business Hours (Optional)</Label>
              <Input
                id="businessHours"
                {...register("businessHours")}
                placeholder="Mon-Fri 8AM-6PM, Sat 9AM-3PM"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Onboarding Form"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
