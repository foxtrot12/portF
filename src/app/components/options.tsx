import Link from "next/link";
import { useState, memo, PropsWithoutRef } from "react";
import { appColors } from "../../../tailwind.config";
import { downloadFile } from "../common/jsUtils";
import { useLocalization } from "../common/localization";
import { LandingPageParams } from "./landing";
import LinesBg from "./linesBg";
import { SkillsBtn } from "./skills";
import TitleCase from "./titleCase";

export function useOptionsInteractive(
  hoverColor: string,
  normalColor: string
): {
  parentProps: PropsWithoutRef<any>;
  innerProps: PropsWithoutRef<any>;
  linesColor: string;
} {
  const [linesColor, setLinesColor] = useState<string>(normalColor);

  return {
    parentProps: {
      className:
        "flex relative bg-POP_BLACK-400 bg-opacity-50 self-end rounded-xl px-3 py-1 shadow-md border-solid border-1 border-MANNA-500",
      onPointerEnter: () => setLinesColor(hoverColor),
      onPointerLeave: () => setLinesColor(normalColor),
    },
    innerProps: {
      className: "absolute w-full h-full px-3 ",
      style: { zIndex: "-1" },
    },
    linesColor,
  };
}

function ResumeBtnC() {
  const { translations } = useLocalization();

  const resumeUrl =
    "https://raw.githubusercontent.com/foxtrot12/resume/main/Chinmaya_Sharma_Resume.pdf";

  const { parentProps, innerProps, linesColor } = useOptionsInteractive(
    appColors.PARK_GREEN[500],
    appColors.YOYO[600]
  );

  return (
    <button
      {...parentProps}
      onClick={() => downloadFile(resumeUrl, "Chinmaya_Sharma_Resume.pdf")}
    >
      <TitleCase>{`${translations.download} ${translations.resume}`}</TitleCase>
      <div {...innerProps}>
        {" "}
        <LinesBg lineColor={linesColor} />
      </div>
    </button>
  );
}

const ResumeBtn = memo(ResumeBtnC);

function MarioLinkC() {
  const { translations } = useLocalization();

  const marioUrl = "https://foxtrot12.github.io/vitrol-enigma";

  const { parentProps, innerProps, linesColor } = useOptionsInteractive(
    appColors.POLI_PURPLE[500],
    appColors.PINK_PONG[500]
  );

  return (
    <Link {...parentProps} target="_blank" href={marioUrl}>
      <TitleCase>{`${translations.mario}`}</TitleCase>
      <div {...innerProps}>
        {" "}
        <LinesBg lineColor={linesColor} />
      </div>
    </Link>
  );
}

const MarioLink = memo(MarioLinkC);

function OptionsC({ setViewState }: LandingPageParams) {
  return (
    <div className="flex flex-col gap-6 text-2xl ">
      <ResumeBtn />
      <SkillsBtn setViewState={setViewState} />
      <MarioLink />
      <div className="flex"></div>
    </div>
  );
}

export const Options = memo(OptionsC);
