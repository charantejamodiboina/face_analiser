import Image from "next/image";
import StepperForm from "@/Components/StepperForm";
import FaceAnalyser from "@/Components/SkinAnalysing";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans ">
      <main className="w-full m-20">
        {/* <StepperForm/> */}
        <FaceAnalyser/>
      </main>
    </div>
  );
}
