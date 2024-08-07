import { memo, useState } from "react";
import Spiral from "./spiral";
import TitleCase from "./titleCase";
import Info from "./info";
import { useLocalization } from "../common/localization";
import Skills from "./skills";
import Orbit from "./orbit";
import { Options } from "./options";
import Socials from "./socials";

export type ViewT = "info" | "skills";

function Landing() {
  const { translations } = useLocalization();
  const [viewState, setViewState] = useState<ViewT>("info");

  return (
    <div className="h-full font-mono flex gap-4 flex-grow relative overflow-hidden">
      <span
        style={{ zIndex: "-1" }}
        className=" dark:bg-POP_BLACK-300 bg-MANNA-300 absolute h-full w-full overflow-hidden"
      >
        {viewState === "info" && <Spiral />}
        {viewState === "skills" && <Orbit />}
      </span>{" "}
      <div className="flex w-2/3">
        {" "}
        {viewState === "info" && <Info />}
        {viewState === "skills" && <Skills />}
      </div>
      <div className="flex flex-col select-none w-1/3 justify-right h-full pt-1 flex-grow ">
        <div className="flex pr-6 flex-grow dark:text-PINK_PONG-300 pt-6 justify-end">
          {viewState === "info" && (
            <TitleCase>{translations.dragToSpin}</TitleCase>
          )}
          {viewState === "skills" && (
            <TitleCase>{translations.clickTrails}</TitleCase>
          )}
        </div>
        <div className="flex pr-6 justify-end align-middle flex-grow">
          <Socials />
        </div>
        <div className="flex self-end justify-end flex-grow-1 pb-5 pr-6">
          <Options setViewState={setViewState} viewState={viewState} />
        </div>
      </div>
    </div>
  );
}

export default memo(Landing);
