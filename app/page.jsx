import Header from "@/components/Header";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import useWebgi from "@/components/Webgi/useWebgi";
import Three from "@/components/old_3d/Three";

export default function Home() {
  let app = useWebgi();
  return (
    <>
      <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      {/* {app} */}
      <Three />
    </>
  );
}
