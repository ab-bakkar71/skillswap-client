import CommunityHighlights from "@/components/CommunityHighlights";
import FeaturedTasks from "@/components/FeaturedTasks";
import Hero from "@/components/Hero";
import HowItWork from "@/components/HowItWork";

export default function Home() {
  return (
    <>
    <Hero/>
    <FeaturedTasks/>
    <HowItWork/>
    <CommunityHighlights/>
    </>
  );
}
