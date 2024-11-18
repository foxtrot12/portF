import Link from "next/link";

import {
  useState,
  memo,
  PropsWithoutRef,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { appColors } from "../../../tailwind.config";
import { downloadFile } from "../common/jsUtils";
import { useLocalization } from "../common/localization";
import LinesBg from "./linesBg";
import { SkillsBtn } from "./skills";
import TitleCase from "./titleCase";
import { ViewT } from "./landing";
import useTheme from "../common/useTheme";
import { useSearchParams } from 'next/navigation';

export interface LandingPageParams {
  setViewState: Dispatch<SetStateAction<ViewT>>;
  viewState?: ViewT;
}

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
        "flex relative text-orange-100 bg-sky-700 dark:bg-popBlack-400 dark:bg-opacity-40 bg-opacity-50 self-end rounded-xl px-3 py-1 shadow-md border-solid border-1 border-manna-500",
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

function InfoBtnC({ setViewState }: LandingPageParams) {
  const { translations } = useLocalization();
  const theme = useTheme();

  const { parentProps, innerProps, linesColor } = useOptionsInteractive(
    theme === 'dark' ? appColors.neoPaccha[500] : appColors.poliPurple[700],
    theme === 'dark' ? appColors.orangeSunshine[500] : appColors.manna[600]
  );

  return (
    <button {...parentProps} onClick={() => setViewState("info")}>
      <span className="sm:flex hidden">
        <TitleCase>{`${translations.information}`}</TitleCase>
      </span>
      <span className="sm:hidden flex">
        <TitleCase>{`${translations.info}`}</TitleCase>
      </span>
      <div {...innerProps}>
        {" "}
        <LinesBg lineColor={linesColor} />
      </div>
    </button>
  );
}

const InfoBtn = memo(InfoBtnC);

function ResumeBtnC() {
  const { translations } = useLocalization();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const res = searchParams?.get('res') || '1';
  const downloadResume = useCallback(()=>{

    let resumeType : 'std' | 'angular' | 'react' = 'std';

    switch (res){
      case '1':
      default:
        resumeType = 'std'
        break;
        
      case '2':
        resumeType = 'angular'
        break;
      
      case '3':
        resumeType = 'react'
        break;
      
    }

    const resumeUrl = `https://raw.githubusercontent.com/foxtrot12/resume/main/${resumeType}/Chinmaya_Sharma_Resume.pdf`;
    const fileName = 'Chinmaya_Sharma.pdf'

    return downloadFile(resumeUrl,fileName)

  },[res])


  const { parentProps, innerProps, linesColor } = useOptionsInteractive(
    theme === 'dark' ? appColors.parkGreen[500] : appColors.yoyo[700],
    theme === 'dark' ? appColors.yoyo[600] : appColors.orangeSunshine[600]
  );

  return (
    <button
      {...parentProps}
      onClick={downloadResume}
    >
      <span className="sm:flex hidden">
        <TitleCase>{`${translations.download} ${translations.resume}`}</TitleCase>
      </span>
      <span className="sm:hidden flex">
        <TitleCase>{`${translations.resume}`}</TitleCase>
      </span>
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
  const theme = useTheme();

  const marioUrl = "https://foxtrot12.github.io/vitrol-enigma";

  const { parentProps, innerProps, linesColor } = useOptionsInteractive(
    theme === 'dark' ?  appColors.poliPurple[500] : appColors.parkGreen[700],
    theme === 'dark' ?  appColors.pinkPong[500] : appColors.pinkPong[600]
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

function OptionsC({ setViewState, viewState }: LandingPageParams) {
  return (
    <div className="flex flex-col gap-6 text-2xl ">
      <Suspense>      
        <ResumeBtn />
      </Suspense>
      {viewState === "info" && <SkillsBtn setViewState={setViewState} />}
      {viewState === "skills" && <InfoBtn setViewState={setViewState} />}
      <MarioLink />
      <div className="flex"></div>
    </div>
  );
}

export const Options = memo(OptionsC);
