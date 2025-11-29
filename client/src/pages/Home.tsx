import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, CheckCircle, Zap, Shield, Clock } from "lucide-react";
import OnboardingForm from "@/components/OnboardingForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => setShowForm(false)}
            variant="ghost"
            className="mb-8"
          >
            ← Back to Home
          </Button>
          <OnboardingForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
              <Building2 className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to Artful Automation
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your complete HVAC business automation solution with AI-powered voice agents,
            24/7 call capture, and smart client management
          </p>
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700"
          >
            Start Your Onboarding
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 hover:border-blue-300 transition-colors">
            <CardHeader>
              <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Instant Setup</CardTitle>
              <CardDescription>
                Get your complete HVAC automation system deployed in minutes with our
                pre-configured Golden Snapshot template
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-300 transition-colors">
            <CardHeader>
              <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>24/7 AI Voice Agent</CardTitle>
              <CardDescription>
                Never miss a call with our intelligent AI voice agent that captures leads
                and schedules appointments around the clock
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-300 transition-colors">
            <CardHeader>
              <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Enterprise-grade security with dedicated sub-accounts, automated workflows,
                and complete data protection
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* What You Get Section */}
        <Card className="mb-16 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl text-center">What's Included in Your Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">AI Voice Agent</h4>
                  <p className="text-gray-600">24/7 intelligent call handling and lead capture</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Smart Calendars</h4>
                  <p className="text-gray-600">Automated scheduling and appointment management</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Custom Workflows</h4>
                  <p className="text-gray-600">Pre-built automation for follow-ups and reminders</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Lead Pipelines</h4>
                  <p className="text-gray-600">Track and convert leads with visual pipelines</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Client Forms</h4>
                  <p className="text-gray-600">Professional intake and service request forms</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Dedicated Sub-Account</h4>
                  <p className="text-gray-600">Your own isolated GHL environment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Fill Out the Form</h3>
              <p className="text-gray-600">
                Provide your business information through our simple onboarding form
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">We Review & Approve</h3>
              <p className="text-gray-600">
                Our team reviews your submission and prepares your custom setup
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">Start Automating</h3>
              <p className="text-gray-600">
                Receive your login credentials and start capturing leads immediately
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl mb-4">Ready to Transform Your HVAC Business?</CardTitle>
            <CardDescription className="text-blue-100 text-lg mb-6">
              Join hundreds of HVAC businesses already automating their operations with Artful Automation
            </CardDescription>
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6"
            >
              Complete Your Onboarding Form
            </Button>
          </CardHeader>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="mb-2">Questions about onboarding?</p>
          <p className="text-sm">
            Contact us at{" "}
            <a href="mailto:support@artfulautomation.com" className="text-blue-600 hover:underline">
              support@artfulautomation.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
