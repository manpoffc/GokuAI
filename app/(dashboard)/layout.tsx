import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative bg-slate-800">
      <div className="hidden p-2 h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-slate-200">
        <SideBar />
      </div>
      <main className="md:pl-72">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
