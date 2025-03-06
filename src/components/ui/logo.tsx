import { greatVibes } from "@/app/fonts/font";
import useAssets from "@/customHooks/useAssets";

const Logo = () => {
  const { svgs } = useAssets();
  return (
    <div className="flex items-center gap-2">
      <img src={svgs.siteLogo.src} alt="Site Logo" className="h-10 w-10" />
      <h1 className={`${greatVibes.className} text-white font-black text-xl`}>
        Elevate Access
      </h1>
    </div>
  );
};

export default Logo;
