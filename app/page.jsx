import Header from "@/components/Header";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import useWebgi from "@/components/Webgi/useWebgi";
import Three from "@/components/old_3d/Three";
import Sofa3d from "@/components/sofa-3d/Sofa3d";

export default function Home() {
  let app = useWebgi();
  return (
    <>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      {/* {app} */}
      <Three />
      
    </>
  );
}
