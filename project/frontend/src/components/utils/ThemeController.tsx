import { useEffect, useState } from "react";
import { deviceAppearanceMode, setFavListener } from "../../utils/appearances";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
setFavListener("#e2e8f0", "#0f172a");

export default function ThemeController({ className }: { className?: string }) {
  const deviceMode = deviceAppearanceMode();
  const [mode, setMode] = useState(deviceMode);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      mode ? "light" : "dark"
    );
  }, [mode]);

  const handleMode = () => {
    setMode(!mode);
  };
  return (
    <label className={"swap swap-rotate " + className}>
      <input type="checkbox" checked={mode} onChange={handleMode} />

      <SunIcon className="text-primary swap-on  h-10 w-10 fill-current"></SunIcon>
      <MoonIcon className="text-primary swap-off  h-10 w-10 fill-current"></MoonIcon>
    </label>
  );
}
