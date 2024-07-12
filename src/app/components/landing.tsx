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
    <div className="max-h-full font-mono flex gap-4 flex-grow overflow-hidden">
      <span
        style={{ zIndex: "-1" }}
        className=" dark:bg-POP_BLACK-300 bg-MANNA-300 absolute h-full w-full overflow-hidden"
      >
        {viewState === "info" && <Spiral />}
        {viewState === "skills" && <Orbit />}
      </span>{" "}
      {viewState === "info" && <Info />}
      {viewState === "skills" && <Skills />}
      <div className="flex flex-col select-none justify-right pt-1 flex-grow ">
        <div className="flex self-end text-right pr-6 flex-grow dark:text-PINK_PONG-300 pt-6">
          {viewState === "info" && (
            <TitleCase>{translations.dragToSpin}</TitleCase>
          )}
          {viewState === "skills" && (
            <TitleCase>{translations.clickTrails}</TitleCase>
          )}
        </div>
        <div className="flex pr-6 justify-end align-middle flex-grow"><Socials/></div>
        <div className="flex self-end justify-end flex-grow-1 pb-5 pr-6">
          <Options setViewState={setViewState} viewState={viewState} />
        </div>
      </div>
    </div>
  );
}

export default memo(Landing);
