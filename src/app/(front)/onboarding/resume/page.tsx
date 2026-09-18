import TrackingForm from "@/components/onboarding/tracking-form";

export default function ResumePage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-16 pb-8">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <TrackingForm />
      </div>
    </div>
  );
}
