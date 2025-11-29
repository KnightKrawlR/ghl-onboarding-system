import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";

export default function Admin() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const { data: submissions, isLoading, refetch } = trpc.onboarding.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const approveMutation = trpc.onboarding.approve.useMutation({
    onSuccess: (data) => {
      toast.success(`Sub-account created! Location ID: ${data.locationId}`);
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to approve: ${error.message}`);
    },
  });

  const rejectMutation = trpc.onboarding.reject.useMutation({
    onSuccess: () => {
      toast.success("Submission rejected");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to reject: ${error.message}`);
    },
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to be logged in to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/api/auth/login")} className="w-full">
              Log In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingSubmissions = submissions?.filter(s => s.status === "pending") || [];
  const approvedSubmissions = submissions?.filter(s => s.status === "approved") || [];
  const rejectedSubmissions = submissions?.filter(s => s.status === "rejected") || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Onboarding Dashboard</h1>
              <p className="text-gray-600 mt-1">Review and approve client submissions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Logged in as</p>
                <p className="font-medium">{user?.name || user?.email}</p>
              </div>
              <Button variant="outline" onClick={() => setLocation("/api/auth/logout")}>
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSubmissions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedSubmissions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedSubmissions.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : submissions && submissions.length > 0 ? (
          <div className="space-y-6">
            {/* Pending Submissions */}
            {pendingSubmissions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Pending Review</h2>
                <div className="space-y-4">
                  {pendingSubmissions.map((submission) => (
                    <Card key={submission.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{submission.companyName}</CardTitle>
                            <CardDescription>
                              Submitted {new Date(submission.createdAt).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-sm text-gray-600 mb-2">Company Info</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Email:</span> {submission.companyEmail}</p>
                              <p><span className="font-medium">Phone:</span> {submission.companyPhone}</p>
                              {submission.companyWebsite && (
                                <p>
                                  <span className="font-medium">Website:</span>{" "}
                                  <a
                                    href={submission.companyWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline inline-flex items-center"
                                  >
                                    {submission.companyWebsite}
                                    <ExternalLink className="h-3 w-3 ml-1" />
                                  </a>
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm text-gray-600 mb-2">Address</h4>
                            <div className="text-sm">
                              <p>{submission.companyAddress}</p>
                              <p>{submission.city}, {submission.state} {submission.postalCode}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm text-gray-600 mb-2">Owner</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium">Name:</span> {submission.ownerFirstName} {submission.ownerLastName}</p>
                              <p><span className="font-medium">Email:</span> {submission.ownerEmail}</p>
                              <p><span className="font-medium">Phone:</span> {submission.ownerPhone}</p>
                            </div>
                          </div>

                          {submission.businessHours && (
                            <div>
                              <h4 className="font-semibold text-sm text-gray-600 mb-2">Business Hours</h4>
                              <p className="text-sm whitespace-pre-wrap">{submission.businessHours}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => approveMutation.mutate({ submissionId: submission.id })}
                            disabled={approveMutation.isPending}
                            className="flex-1"
                          >
                            {approveMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating Sub-Account...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve & Create Sub-Account
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={() => rejectMutation.mutate({ submissionId: submission.id })}
                            disabled={rejectMutation.isPending}
                            variant="destructive"
                            className="flex-1"
                          >
                            {rejectMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Rejecting...
                              </>
                            ) : (
                              <>
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Submissions */}
            {approvedSubmissions.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Approved</h2>
                <div className="space-y-4">
                  {approvedSubmissions.map((submission) => (
                    <Card key={submission.id} className="border-green-200 bg-green-50">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{submission.companyName}</CardTitle>
                            <CardDescription>
                              Approved {submission.reviewedAt && new Date(submission.reviewedAt).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Badge className="bg-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {submission.ghlLocationId && (
                          <p className="text-sm">
                            <span className="font-medium">GHL Location ID:</span>{" "}
                            <code className="bg-white px-2 py-1 rounded">{submission.ghlLocationId}</code>
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No submissions yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
