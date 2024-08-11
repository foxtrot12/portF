import { memo, useTransition } from "react";
import TitleCase from "./titleCase";
import { useLocalization } from "../common/localization";

interface TogglePropsT {}

function ToggleTheme(props: TogglePropsT) {
  const { translations } = useLocalization();

  return (
    <label
      aria-hidden={false}
      tabIndex={-1}
      className="inline-flex items-center gap-2 cursor-pointer"
    >
      <div><TitleCase>{translations.switchTheme}</TitleCase></div>
      <input
        aria-hidden={false}
        tabIndex={-1}
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={(ev) => {
          ev.target.checked
            ? document.body.classList.toggle("dark", true)
            : document.body.classList.toggle("dark", false);
        }}
      />
      <div
        aria-hidden={false}
        tabIndex={-1}
        className="relative w-11 h-6 bg-sky-300 peer-focus:ring-blue-300 
      rounded-full peer dark:bg-pinkPong-700 peer-checked:after:translate-x-full 
      rtl:peer-checked:after:-translate-x-full after:content-[''] 
      after:absolute after:top-[2px] after:start-[2px] after:bg-white 
      after:rounded-full after:h-5 after:w-5 after:transition-all"
      ></div>
    </label>
  );
}

export default memo(ToggleTheme);
