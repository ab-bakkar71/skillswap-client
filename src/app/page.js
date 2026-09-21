import Categories from "@/components/Categories";
import CommunityHighlights from "@/components/CommunityHighlights";
import FeaturedTasks from "@/components/FeaturedTasks";
import Hero from "@/components/Hero";
import HowItWork from "@/components/HowItWork";
import TopFreelancers from "@/components/TopFreelancers";

export default function Home() {
  return (
    <>
    <Hero/>
    <Categories/>
    <FeaturedTasks/>
    <TopFreelancers/>
    <HowItWork/>
    <CommunityHighlights/>
    </>
  );
}
