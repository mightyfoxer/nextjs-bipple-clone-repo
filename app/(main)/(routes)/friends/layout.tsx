import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/top-header-wallet-icons"),
  { ssr: false }
);

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="flex w-full h-full mx-auto z-30 bg-[#111214] gap-5">
        <section className="flex flex-col flex-1 w-full gap-5">
          <DynamicComponentWithNoSSR />

          <div className="bg-white/5 border rounded-[25px] flex h-fit w-full z-30 flex-col ">
            <NavigationSidebar />
          </div>

          <main className={`h-full`}>{children}</main>
        </section>
      </div>
  );
};

export default MainLayout;
