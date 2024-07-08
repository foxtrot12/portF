import { useState, memo } from "react";
import { appColors } from "../../../tailwind.config";
import { useLocalization } from "../common/localization";
import { LandingPageParams } from "./landing";
import LinesBg from "./linesBg";
import TitleCase from "./titleCase";
import { useOptionsInteractive } from "./options";

function SkillsBtnC({ setViewState }: LandingPageParams) {
  const { translations } = useLocalization();

  const { parentProps, innerProps, linesColor } = useOptionsInteractive(
    appColors.NEO_PACCHA[500],
    appColors.ORANGE_SUNSHINE[500]
  );
  return (
    <button {...parentProps} onClick={() => setViewState("skills")}>
      <TitleCase>{`${translations.skills}`}</TitleCase>
      <div {...innerProps}>
        {" "}
        <LinesBg lineColor={linesColor} />
      </div>
    </button>
  );
}

export const SkillsBtn = memo(SkillsBtnC);

function Skills() {
  return <></>;
}

export default memo(Skills);
