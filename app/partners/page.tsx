import { PartnersUI } from "@/components/sections/Partners";
import Image from "next/image";
export default function Partners() {
  return (
    <div className="w-52 px-1 pt-1 pb-4 bg-white rounded-lg inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
      <div className="self-stretch h-24 bg-blue-200 rounded flex flex-col justify-center items-center gap-2.5 overflow-hidden">
        <Image
          src="/aws_logo.svg"
          alt="logo"
          width={130}
          height={60}
          className="w-32 h-auto"
        />
      </div>
      <div className="self-stretch text-center justify-start text-TT-Brand-colors-text-body text-sm font-normal font-['Inter'] leading-4 tracking-tight">
        Advanced financial intelligence and data-driven asset management that
        helped AIG enhance efficiency, accuracy, and global financial
        governance.
      </div>
    </div>
  );
}
