import { getServerSession } from "next-auth";
import { getStats } from "@/actions/stats";
import AdminDashboard from "@/components/dashboard/dashboard";
import DoctorDashboard from "@/components/dashboard/doctor-dashboard";
import PatientDashboard from "@/components/dashboard/patient-dashboard";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role === "DOCTOR") return <DoctorDashboard />;
  if (role === "USER") return <PatientDashboard />;

  const stats = await getStats();
  return <AdminDashboard stats={stats} />;
}
