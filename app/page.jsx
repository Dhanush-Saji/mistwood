import DisableMobileWrapper from "@/components/DisableMobileWrapper";
import Header from "@/components/Header";
import ScrollAnimations from "@/components/ScrollAnimations";
import Section1 from "@/components/Sections/Section1/Section1";
import Section2 from "@/components/Sections/Section2/Section2";
import Section3 from "@/components/Sections/Section3/Section3";
import Section4 from "@/components/Sections/Section4/Section4";
import Section5 from "@/components/Sections/Section5/Section5";
import Section6 from "@/components/Sections/Section6/Section6";
import Chair3d from "@/components/chair-3d/Chair3d";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <>
    <Header />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <DisableMobileWrapper><Section5 /></DisableMobileWrapper>
      <ScrollAnimations />
      {/* <Chair3d /> */}
      <Section6 />
    </>
  );
}
