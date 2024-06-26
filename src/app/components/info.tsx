import { FC, memo, useState } from "react";
import UpperCase from "./upperCase";
import { useLocalization } from "../common/localization";

function NameC() {
  const { translations } = useLocalization();

  return (
    <div
      className={`flex font-mono text-5xl flex-1 select-none items-center dark:text-MANNA-400 text-YOYO-600`}
    >
      <UpperCase>{translations.chinmaya}</UpperCase>
    </div>
  );
}

const Name = memo(NameC);

function AboutMeC() {
  const { translations } = useLocalization();

  return (
    <div
      className={`flex font-mono lg:text-xl text-base md:text-md flex-1 select-none items-center dark:text-MANNA-400 text-YOYO-600`}
    >
      {translations.aboutMe}
    </div>
  );
}

const AboutMe = memo(AboutMeC);

const VIEW_STATES: Array<FC> = [Name, AboutMe];

const Info: FC = () => {
  const [viewIndex, setViewIndex] = useState<number>(0);

  return (
    <div className={`pl-12 flex flex-col h-full lg:w-4/12 w-3/4`}>
      {VIEW_STATES.map((Component, index) =>
        index === viewIndex ? <Component key={index} /> : null
      )}

      <div
        className={`pb-4 font-mono text-4xl font-extrabold flex justify-between`}
      >
        <button
          onClick={() => setViewIndex(viewIndex - 1)}
          className={`${viewIndex === 0 ? "invisible" : ""}`}
        >
          {"<"}
        </button>
        <button
          onClick={() => setViewIndex(viewIndex + 1)}
          className={`${
            viewIndex === VIEW_STATES.length - 1 ? "invisible" : ""
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default memo(Info);
