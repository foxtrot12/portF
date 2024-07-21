import { useState, useRef, useMemo, useEffect, memo } from "react";
import { asyncScheduler } from "rxjs";
import { getRandomNumberBetween } from "../common/jsUtils";
import { useLocalization } from "../common/localization";
import SentenceCase from "./sentenceCase";
import TitleCase from "./titleCase";
import { FaArrowRightArrowLeft, FaForward } from "react-icons/fa6";

function InfoTxt() {}

function Info() {
  const { translations } = useLocalization();
  const [currentTxt, setCurrentTxt] = useState<string>("");

  const textContainerRef = useRef<HTMLDivElement>(null);

  const INFO_TXT = useMemo(() => {
    return translations.aboutMe;
  }, [translations]);

  useEffect(() => {
    if (currentTxt === INFO_TXT) return;

    const delay = getRandomNumberBetween(30, 100);

    const scheduleSub = asyncScheduler.schedule(() => {
      const nextVal = currentTxt + INFO_TXT[currentTxt.length];

      setCurrentTxt(nextVal);
    }, delay);

    return () => {
      scheduleSub.unsubscribe();
    };
  }, [currentTxt, INFO_TXT]);

  useEffect(() => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop =
        textContainerRef.current.scrollHeight;
    }
  }, [currentTxt]);

  return (
    <div
      aria-label={INFO_TXT}
      className="flex gap-2 flex-col justify-center h-full lg:w-2/3 w-full lg-py-6 px-4 py-2 lg-px-12 bg-opacity-60 bg-POP_BLACK-300"
    >
      {(currentTxt !== INFO_TXT) && (
        <button
          aria-hidden={true}
          tabIndex={-1}
          className="flex justify-end items-center gap-2 dark:text-MANNA-500 font-extraLight"
          onClick={()=>{setCurrentTxt(INFO_TXT)}}
        >
          <TitleCase>{translations.forward}</TitleCase>
          <FaForward />
        </button>
      )}
      <div
        aria-hidden={true}
        ref={textContainerRef}
        className="font-bold  text-xl overflow-x-hidden dark:text-teal-400 text-YOYO-600 sm:overflow-y-hidden overflow-y-auto flex"
      >
        <SentenceCase>{currentTxt}</SentenceCase>
      </div>
    </div>
  );
}

export default memo(Info);
