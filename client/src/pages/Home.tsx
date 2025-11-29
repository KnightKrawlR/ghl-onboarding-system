import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    companyPhone: "",
    companyEmail: "",
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
    businessHours: "",
  });

  const submitMutation = trpc.onboarding.submit.useMutation({
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Success! Your submission has been received and is being reviewed.");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription className="text-base">
              Your onboarding submission has been received. We'll review your information and get your account set up shortly.
              You'll receive an email confirmation once everything is ready.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Artful Automation
          </h1>
          <p className="text-lg text-gray-600">
            Complete this form to get started with your HVAC business automation
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Business Onboarding</CardTitle>
            <CardDescription>
              Please provide your business information below. We'll review and set up your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="ABC Heating & Cooling"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyPhone">Company Phone *</Label>
                    <Input
                      id="companyPhone"
                      name="companyPhone"
                      type="tel"
                      value={formData.companyPhone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyEmail">Company Email *</Label>
                    <Input
                      id="companyEmail"
                      name="companyEmail"
                      type="email"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      placeholder="info@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="url"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://www.yourcompany.com"
                  />
                </div>
              </div>

              {/* Company Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Business Address</h3>
                
                <div>
                  <Label htmlFor="companyAddress">Street Address *</Label>
                  <Input
                    id="companyAddress"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="NY"
                      maxLength={2}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="10001"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Owner Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerFirstName">First Name *</Label>
                    <Input
                      id="ownerFirstName"
                      name="ownerFirstName"
                      value={formData.ownerFirstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="ownerLastName">Last Name *</Label>
                    <Input
                      id="ownerLastName"
                      name="ownerLastName"
                      value={formData.ownerLastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerEmail">Owner Email *</Label>
                    <Input
                      id="ownerEmail"
                      name="ownerEmail"
                      type="email"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="ownerPhone">Owner Phone *</Label>
                    <Input
                      id="ownerPhone"
                      name="ownerPhone"
                      type="tel"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      placeholder="(555) 987-6543"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                
                <div>
                  <Label htmlFor="businessHours">Business Hours</Label>
                  <Textarea
                    id="businessHours"
                    name="businessHours"
                    value={formData.businessHours}
                    onChange={handleChange}
                    placeholder="Monday-Friday: 8 AM - 6 PM, Saturday: 9 AM - 2 PM, Sunday: Closed"
                    rows={3}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
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

        <p className="text-center text-sm text-gray-500 mt-6">
          Questions? Contact us at support@artfulautomation.com
        </p>
      </div>
    </div>
  );
}
