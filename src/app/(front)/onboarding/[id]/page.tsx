import { redirect } from "next/navigation";
import { getUserById } from "@/actions/users";
import OnboardingSteps from "@/components/onboarding/onboarding-steps";

export default async function OnboardingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; saved?: string }>;
}) {
  const { id } = await params;
  const { page = "biodata", saved } = await searchParams;
  const user = await getUserById(id);

  if (user?.role !== "DOCTOR") {
    redirect("/login");
  }

  const onboardingData = user.onboardingPage
    ? JSON.parse(user.onboardingPage)
    : {};

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pt-16 pb-8">
      <OnboardingSteps
        id={id}
        onboardingData={onboardingData}
        page={page}
        saved={saved}
        user={{ email: user.email, name: user.name, phone: user.phone }}
      />
    </div>
  );
}
