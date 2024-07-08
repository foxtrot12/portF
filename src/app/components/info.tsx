import { useState, useRef, useMemo, useEffect, memo } from "react";
import { asyncScheduler } from "rxjs";
import { getRandomNumberBetween } from "../common/jsUtils";
import { useLocalization } from "../common/localization";

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
      className="flex dark:text-teal-400 font-bold font-mono items-center text-YOYO-600 h-full lg:w-4/12 w-2/3 text-xl lg-py-6 px-4 py-2 lg-px-12 opacity-60 bg-POP_BLACK-300"
    >
      <div
        aria-hidden={true}
        ref={textContainerRef}
        className="h-full w-full overflow-y-auto scrollbar content-center scrollbar-custom items-center"
      >
        {currentTxt}
      </div>
    </div>
  );
}

export default memo(Info);
