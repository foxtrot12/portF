import { memo, useState } from "react";
import Spiral from "./spiral";
import TitleCase from "./titleCase";
import Info from "./info";
import { useLocalization } from "../common/localization";
import Link from "next/link";
import { downloadFile } from "../common/jsUtils";
import LinesBg from "../common/linesBg";
import { appColors } from "../../../tailwind.config";

const ResumeBtn = memo(() => {
  const { translations } = useLocalization();

  const resumeUrl =
    "https://raw.githubusercontent.com/foxtrot12/resume/main/Chinmaya_Sharma_Resume.pdf";

  const [linesColor, setLinesColor] = useState<string>(
    `${appColors.YOYO[600]}`
  );
  return (
    <button
      onClick={() => downloadFile(resumeUrl, "Chinmaya_Sharma_Resume.pdf")}
      className="flex relative self-end rounded-xl px-3 py-1 shadow-md border-solid border-1 border-MANNA-500"
      onPointerEnter={() => setLinesColor(`${appColors.PARK_GREEN[500]}`)}
      onPointerLeave={() => setLinesColor(`${appColors.YOYO[600]}`)}
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
});

const MarioLink = memo(() => {
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
});

const Options = memo(() => {
  return (
    <div className="flex flex-col gap-6 text-2xl ">
      <ResumeBtn />
      <MarioLink />
      <div className="flex"></div>
    </div>
  );
});

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
