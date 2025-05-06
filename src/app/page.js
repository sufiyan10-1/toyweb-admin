import Image from "next/image";
import NavBar from "@/app/components/Navbar/NavBar";
import SideBar from "@/app/components/SideBar/SideBar";
import ContentSection from "@/app/components/ContentSection/ContentSection";
import Products from "@/app/components/Products/page"
export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex">
      <SideBar />
      <div className="w-full">
        <NavBar />
        <ContentSection/>
        <Products/>
      </div>
    </div>
  );
}
