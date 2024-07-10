import { FC, memo, useState } from "react";
import { useLocalization } from "../common/localization";
import TitleCase from "./titleCase";
import { FaGithub, FaTwitter, FaYahoo } from "react-icons/fa6";
import Link from "next/link";

const SOCIALS: { link: string; icon: FC }[] = [
  { link: "https://github.com/foxtrot12", icon: FaGithub },
  { link: "mailto:s.chinmaya@myyahoo.com", icon: FaYahoo },
  { link: "https://x.com/ChinmayaSh", icon: FaTwitter },
];

function Socials() {
  const { translations } = useLocalization();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex">
      {" "}
      <span className="flex w-full items-center justify-around h-1/3">
        {SOCIALS.map((social, index) => (
          <Link href={social.link} target="_blank" className="flex" key={index}>
            <social.icon />
          </Link>
        ))}
      </span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 transition-transform transition-background duration-500 flex dark:text-MANNA-500 rounded-full h-1/3 items-center justify-center dark:bg-opacity-20 ${
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
