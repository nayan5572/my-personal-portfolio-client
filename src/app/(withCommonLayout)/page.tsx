import Profile from "@/components/Profile";
import SkillSection from "@/components/SkillSection";
import ProjectsPage from "./projects/page";
import ContactPage from "./contact/page";

export default function Home() {
  return (
    <div>
      <Profile />
      <SkillSection />
      <ProjectsPage />
      <ContactPage />
    </div>
  );
}
