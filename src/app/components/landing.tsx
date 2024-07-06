import { memo, useState } from "react";
import Spiral from "./spiral";
import TitleCase from "./titleCase";
import Info from "./info";
import { useLocalization } from "../common/localization";
import Link from "next/link";
import { downloadFile } from "../common/jsUtils";
import { appColors } from "../../../tailwind.config";
import LinesBg from "./linesBg";

function ResumeBtnC() {
  const { translations } = useLocalization();

  const resumeUrl =
    "https://raw.githubusercontent.com/foxtrot12/resume/main/Chinmaya_Sharma_Resume.pdf";

  const [linesColor, setLinesColor] = useState<string>(
    `${appColors.PARK_GREEN[500]}`
  );
  return (
    <button
      onClick={() => downloadFile(resumeUrl, "Chinmaya_Sharma_Resume.pdf")}
      className="flex relative self-end rounded-xl px-3 py-1 shadow-md border-solid border-1 border-MANNA-500"
      onPointerEnter={() => setLinesColor(`${appColors.YOYO[600]}`)}
      onPointerLeave={() => setLinesColor(`${appColors.PARK_GREEN[500]}`)}
    >
      <TitleCase>{`${translations.download} ${translations.resume}`}</TitleCase>
      <div
        className="absolute w-full h-full bg-POP_BLACK-400 bg-opacity-50"
        style={{ zIndex: "-1" }}
      >
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

  const [linesColor, setLinesColor] = useState<string>(
    `${appColors.POLI_PURPLE[500]}`
  );
  return (
    <Link
      target="_blank"
      href={marioUrl}
      className="flex relative self-end rounded-xl px-3 py-1 shadow-md border-solid border-1 border-MANNA-500"
      onPointerEnter={() => setLinesColor(`${appColors.MANNA[500]}`)}
      onPointerLeave={() => setLinesColor(`${appColors.POLI_PURPLE[500]}`)}
    >
      <TitleCase>{`${translations.mario}`}</TitleCase>
      <div
        className="absolute w-full h-full bg-POP_BLACK-400 bg-opacity-50"
        style={{ zIndex: "-1" }}
      >
        {" "}
        <LinesBg lineColor={linesColor} />
      </div>
    </Link>
  );
}

const MarioLink = memo(MarioLinkC);

function SkillsBtnC() {
  const { translations } = useLocalization();

  const [linesColor, setLinesColor] = useState<string>(
    `${appColors.NEO_PACCHA[500]}`
  );
  return <button
    className="flex relative self-end rounded-xl px-3 py-1 shadow-md border-solid border-1 border-MANNA-500"
    onPointerEnter={() => setLinesColor(`${appColors.ORANGE_SUNSHINE[500]}`)}
    onPointerLeave={() => setLinesColor(`${appColors.NEO_PACCHA[500]}`)}
  >
    <TitleCase>{`${translations.skills}`}</TitleCase>
    <div
      className="absolute w-full h-full bg-POP_BLACK-400 bg-opacity-50"
      style={{ zIndex: "-1" }}
    >
      {" "}
      <LinesBg lineColor={linesColor} />
    </div>
  </button>
}

const SkillsBtn = memo(SkillsBtnC)

function OptionsC() {
  return (
    <div className="flex flex-col gap-6 text-2xl ">
      <ResumeBtn />
      <SkillsBtn/>
      <MarioLink />
      <div className="flex"></div>
    </div>
  );
}

const Options = memo(OptionsC);

function Landing() {
  const { translations } = useLocalization();

  return (
    <div className="max-h-full flex gap-4 flex-grow overflow-hidden">
      <span
        style={{ zIndex: "-1" }}
        className=" dark:bg-POP_BLACK-300 bg-MANNA-300 absolute h-full w-full overflow-hidden"
      >
        <Spiral />
      </span>{" "}
      <Info />
      <div className="flex flex-col select-none font-mono justify-right pt-1 flex-grow ">
        <div className="flex self-end pr-6 flex-grow dark:text-PINK_PONG-300">
          <TitleCase>{translations.dragToSpin}</TitleCase>
        </div>
        <div className="flex self-end justify-end flex-grow-1 pb-20 pr-6">
          <Options />
        </div>
      </div>
    </div>
  );
}

export default memo(Landing);
