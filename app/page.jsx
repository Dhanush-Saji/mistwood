import Header from "@/components/Header";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import useWebgi from "@/components/Webgi/useWebgi";

export default function Home() {
  let app = useWebgi();
  return (
    <>
      <Header />
      <Section1 />
      <Section2 />
      {/* {app} */}
    </>
  );
}
