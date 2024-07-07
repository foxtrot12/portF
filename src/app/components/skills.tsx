import { useState, memo } from "react";
import { appColors } from "../../../tailwind.config";
import { useLocalization } from "../common/localization";
import { LandingPageParams } from "./landing";
import LinesBg from "./linesBg";
import TitleCase from "./titleCase";

function SkillsBtnC({ setViewState }: LandingPageParams) {
    const { translations } = useLocalization();

    const [linesColor, setLinesColor] = useState<string>(
        `${appColors.NEO_PACCHA[500]}`
    );
    return <button
        className="flex relative bg-POP_BLACK-400 bg-opacity-50 self-end rounded-xl px-3 py-1 shadow-md border-solid border-1 border-MANNA-500"
        onPointerEnter={() => setLinesColor(`${appColors.ORANGE_SUNSHINE[500]}`)}
        onPointerLeave={() => setLinesColor(`${appColors.NEO_PACCHA[500]}`)}
    >
        <TitleCase>{`${translations.skills}`}</TitleCase>
        <div
            className="absolute w-full h-full px-3 "
            style={{ zIndex: "-1" }}
        >
            {" "}
            <LinesBg lineColor={linesColor} />
        </div>
    </button>
}

export const SkillsBtn = memo(SkillsBtnC)

function Skills() {

    return <></>
}

export default memo(Skills)