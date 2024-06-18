import { memo } from "react";
import { translations } from "../common/translations";
import Card from "../components/card";
import Spiral from "../components/spiral";
import UpperCase from "../components/upperCase";
import TitleCase from "../components/titleCase";

function Landing() {
  return (
    <>
      <span
        style={{ zIndex: "-1" }}
        className=" dark:bg-POP_BLACK-300 bg-MANNA-300 absolute h-full w-full"
      >
        <Spiral />
      </span>{" "}
      <Card
        addClasses={`font-mono text-5xl flex-grow pl-12 select-none justify-left items-center dark:text-MANNA-400 text-YOYO-600`}
      >
        <UpperCase>{translations.chinmaya}</UpperCase>
      </Card>
      <Card addClasses="select-none font-mono justify-right pr-20 pt-10 dark:text-PINK_PONG-300">
        <TitleCase>{translations.dragToSpin}</TitleCase>
      </Card>
    </>
  );
}

export default memo(Landing);
