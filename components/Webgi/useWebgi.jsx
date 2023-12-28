import dynamic from "next/dynamic";

const DynamicHeader = dynamic(() => import("./Webgi"), {
  ssr: false,
});

export default function useWebgi() {
    return (
      <>
        <DynamicHeader />;
      </>
    );
  }