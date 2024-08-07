import { FC, memo, useEffect, useRef, useState } from "react";
import { useLocalization } from "../common/localization";
import TitleCase from "./titleCase";
import { FaGithub, FaLinkedin, FaTwitter, FaYahoo } from "react-icons/fa6";
import Link from "next/link";

const SOCIALS: { link: string; icon: FC }[] = [
  { link: "https://github.com/foxtrot12", icon: FaGithub },
  { link: "mailto:s.chinmaya@myyahoo.com", icon: FaYahoo },
  { link: "https://x.com/ChinmayaSh", icon: FaTwitter },
  {link: "https://www.linkedin.com/in/chinmayas", icon: FaLinkedin}
];

function Socials() {
  const { translations } = useLocalization();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const linksRef = useRef<HTMLSpanElement>(null)

  useEffect(()=>{
    if(isOpen){
      linksRef?.current?.focus();
    }
  },[isOpen])

  return (
    <div className="flex items-center sm:flex-row flex-col sm:gap-0 gap-8">
      {" "}
      <span
        tabIndex={-1}
        ref={linksRef}
        className={`flex p-3 justify-around h-1/5 rounded-xl transition-width duration-500 text-PARK_GREEN-500 bg-POP_BLACK-400 bg-opacity-40 ${
          isOpen ? "w-full" : "w-0 opacity-0"
        }`}
      >
        {SOCIALS.map((social, index) => (
          <Link
          aria-hidden={!isOpen}
          tabIndex={isOpen ? 0 : -1}
            href={social.link}
            target="_blank"
            className="flex w-full h-full items-center justify-center"
            key={index}
          >
            <social.icon />
          </Link>
        ))}
      </span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 transition-all duration-500 flex dark:text-MANNA-500 rounded-2xl sm:h-12 h-10 sm:w-44 w-28 items-center justify-center dark:bg-opacity-20 ${
          isOpen
            ? " dark:bg-POLI_PURPLE-500 rotate-90"
            : "dark:bg-ORANGE_SUNSHINE-500"
        }`}
      >
        {" "}
        <TitleCase>{translations.findMe}</TitleCase>
      </button>
    </div>
  );
}

export default memo(Socials);
