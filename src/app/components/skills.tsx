import { useState, memo, FC, PropsWithoutRef, useMemo } from "react";
import { appColors } from "../../../tailwind.config";
import { useLocalization } from "../common/localization";
import LinesBg from "./linesBg";
import TitleCase from "./titleCase";
import { LandingPageParams, useOptionsInteractive } from "./options";
import SentenceCase from "./sentenceCase";
import { FaArrowLeft } from "react-icons/fa6";
import UpperCase from "./upperCase";
import { AccessibilityImg, AngularImg, CanvasImg, ReactImg, TSImage } from "../common/svgs";

type ImageComponentT = FC<{ imageProps?: PropsWithoutRef<any> }>;

const SKILLS: {
  head: string;
  body: string;
  image: ImageComponentT;
}[] = [
  {
    head: "typescript",
    body: "typescriptDesc",
    image: TSImage,
  },
  {
    head: "react",
    body: "reactDesc",
    image:ReactImg,
  },
  {
    head: "angular",
    body: "angularDesc",
    image: AngularImg,
  },
  {
    head: "canvas",
    body: "canvasDesc",
    image: CanvasImg,
  },
  {
    head: "accessibility",
    body: "accessibilityDesc",
    image: AccessibilityImg,
  },
];

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
  const { translations } = useLocalization();
  const [openIndex, setOpenIndex] = useState<number>(NaN);
  const { selectedHead, selectedBody, SelectedImg } = useMemo(() => {
    return {
      selectedHead: SKILLS[openIndex]?.head,
      selectedBody: SKILLS[openIndex]?.body,
      SelectedImg: SKILLS[openIndex]?.image,
    };
  }, [openIndex]);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? NaN : index);
  };

  return (
    <div className={`content-center h-full flex pt-6`}>
      <div className={`flex flex-col sm:flex-row ${isNaN(openIndex) ? 'sm:w-full w-1/3' :''}`}>
        {SKILLS.map(
          (skill, index) =>
            isNaN(openIndex) && (
              <button key={index} onClick={() => toggleOpen(index)}>
                <skill.image imageProps={{ className: "h-full w-full" }} />
              </button>
            )
        )}
      </div>
      <div
        className={`transition-width duration-500 select-none flex items-center flex-col sm:px-8 px-2 gap-6 ${
          isNaN(openIndex) ? "w-0" : "w-full"
        }`}
      >
        {SelectedImg && (
          <div className="flex gap-4 flex-col">
            <button
              className="flex justify-center text-3xl"
              onClick={() => toggleOpen(NaN)}
            >
              <FaArrowLeft  />
            </button>
            <button
              className="flex justify-center items-center"
              onClick={() => toggleOpen(openIndex)}
            >
              <SelectedImg imageProps={{ className: "h-2/3 w-2/3" }} />
            </button>
          </div>
        )}
        <h1 className="text-3xl font-extrabold text-ORANGE_SUNSHINE-600 dark:bg-POP_BLACK-400 dark:bg-opacity-50 rounded-xl">
          {selectedHead && <UpperCase>{translations[selectedHead]}</UpperCase>}
        </h1>
        <p className={`font-bold overflow-auto text-PARK_GREEN-600 dark:bg-POP_BLACK-400 dark:bg-opacity-50 rounded-2xl text-justify`}>
          {SKILLS[openIndex] && (
            <SentenceCase>{translations[selectedBody]}</SentenceCase>
          )}
        </p>
      </div>
    </div>
  );
}

export default memo(Skills);
