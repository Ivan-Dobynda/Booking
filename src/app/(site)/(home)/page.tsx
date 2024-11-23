import About from "@/Component/Sections/About";
import Blog from "@/Component/Sections/Blog";
import Faqs from "@/Component/Sections/Faqs";
import Hero from "@/Component/Sections/Hero";
import RecentBookedPlaces from "@/Component/Sections/RecentBookedPlaces";
import Services from "@/Component/Sections/Services";
import TopDestinations from "@/Component/Sections/TopDestinations";
import Cookies from "@/components/Cookies/Cookies";
import UpdateProfileModal from "./UpdateProfileModal";

export default function Home() {
  return (
    <main>
      <UpdateProfileModal />
      <Hero />
      <About />
      <TopDestinations />
      <Services />
      <RecentBookedPlaces />
      <Blog />
      <Faqs />
      <Cookies />
    </main>
  );
}
