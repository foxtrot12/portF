import { Dispatch, SetStateAction, memo, useState } from "react";
import Spiral from "./spiral";
import TitleCase from "./titleCase";
import Info from "./info";
import { useLocalization } from "../common/localization";
import Skills, { SkillsBtn } from "./skills";
import Orbit from "./orbit";
import { Options } from "./options";

type ViewT = "info" | "skills";
export interface LandingPageParams {
  setViewState: Dispatch<SetStateAction<ViewT>>;
}


function Landing() {
  const { translations } = useLocalization();
  const [viewState, setViewState] = useState<ViewT>("info");

  return (
    <div className="max-h-full flex gap-4 flex-grow overflow-hidden">
      <span
        style={{ zIndex: "-1" }}
        className=" dark:bg-POP_BLACK-300 bg-MANNA-300 absolute h-full w-full overflow-hidden"
      >
        {viewState === "info" && <Spiral />}
        {viewState === "skills" && <Orbit />}
      </span>{" "}
      {viewState === "info" && <Info />}
      {viewState === "skills" && <Skills />}
      <div className="flex flex-col select-none font-mono justify-right pt-1 flex-grow ">
        <div className="flex self-end pr-6 flex-grow dark:text-PINK_PONG-300">
          {(viewState === 'info')&&<TitleCase>{translations.dragToSpin}</TitleCase>}
          {(viewState === 'skills')&&<TitleCase>{translations.clickTrails}</TitleCase>}
        </div>
        <div className="flex self-end justify-end flex-grow-1 pb-20 pr-6">
          <Options setViewState={setViewState} />
        </div>
      </div>
    </div>
  );
}

export default memo(Landing);
