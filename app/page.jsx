import DisableMobileWrapper from "@/components/DisableMobileWrapper";
import Header from "@/components/Header";
import ScrollAnimations from "@/components/ScrollAnimations";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import Three from "@/components/old_3d/Three";

export default function Home() {
  return (
    <>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <DisableMobileWrapper><Section5 /></DisableMobileWrapper>
      <ScrollAnimations />
      <Three />
      
    </>
  );
}
