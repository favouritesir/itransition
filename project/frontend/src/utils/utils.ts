/* eslint-disable @typescript-eslint/no-explicit-any */
export const getThemeColor = (color?: string) => {
  if (!color) return false;
  return getComputedStyle(document.documentElement).getPropertyValue(color);
};

export const setFav = (color?: string) => {
  const favicon: any = document.querySelector("link[rel='icon']");
  if (favicon) {
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
        getThemeColor(color) || color || "#22d3ee"
      }" class="size-6">
  <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
</svg>
    `;
    const svgBlob = new Blob([svgIcon], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);
    favicon.href = url;
  }
};

export const setFavListener = (light?: string, dark?: string): void => {
  matchMedia().addEventListener("change", (e) => {
    if (e.matches) {
      setFav(light); // use light for dark mode
    } else {
      setFav(dark); // use dark for light mode
    }
    console.log("favmode changed");
  });
};

export const deviceAppearanceMode = () => {
  return matchMedia().matches ? false : true;
  // false=dark & true=light
};

export const matchMedia = (): MediaQueryList => {
  return window.matchMedia("(prefers-color-scheme: dark)");
};
