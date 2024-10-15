import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

export default function OfficeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <main className="md:ml-64 min-h-screen pt-20">{children}</main>
    </div>
  );
}
