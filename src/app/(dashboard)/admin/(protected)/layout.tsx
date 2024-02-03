import AdminPanelHeader from "@/app/components/AdminPanel/admin-panel-header";
import AuthWrapper from "./AuthWrapper";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <header>
        <AdminPanelHeader />
      </header>
      <main className="w-full px-6 lg:max-w-4xl lg:mx-auto">{children}</main>
    </AuthWrapper>
  );
}
