import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
