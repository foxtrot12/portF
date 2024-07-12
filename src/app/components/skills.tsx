import { useState, memo, FC, PropsWithoutRef, useMemo } from "react";
import { appColors } from "../../../tailwind.config";
import { useLocalization } from "../common/localization";
import LinesBg from "./linesBg";
import TitleCase from "./titleCase";
import { LandingPageParams, useOptionsInteractive } from "./options";
import SentenceCase from "./sentenceCase";
import { FaArrowLeft } from "react-icons/fa6";
import UpperCase from "./upperCase";

type ImageComponentT = FC<{ imageProps?: PropsWithoutRef<any> }>;

const SKILLS: {
  head: string;
  body: string;
  image: ImageComponentT;
}[] = [
  {
    head: "typescript",
    body: "typescriptDesc",
    image: memo((props) => (
      <svg
        {...props.imageProps}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M23.827,8.243A4.424,4.424,0,0,1,26.05,9.524a5.853,5.853,0,0,1,.852,1.143c.011.045-1.534,1.083-2.471,1.662-.034.023-.169-.124-.322-.35a2.014,2.014,0,0,0-1.67-1c-1.077-.074-1.771.49-1.766,1.433a1.3,1.3,0,0,0,.153.666c.237.49.677.784,2.059,1.383,2.544,1.095,3.636,1.817,4.31,2.843a5.158,5.158,0,0,1,.416,4.333,4.764,4.764,0,0,1-3.932,2.815,10.9,10.9,0,0,1-2.708-.028,6.531,6.531,0,0,1-3.616-1.884,6.278,6.278,0,0,1-.926-1.371,2.655,2.655,0,0,1,.327-.208c.158-.09.756-.434,1.32-.761L19.1,19.6l.214.312a4.771,4.771,0,0,0,1.35,1.292,3.3,3.3,0,0,0,3.458-.175,1.545,1.545,0,0,0,.2-1.974c-.276-.395-.84-.727-2.443-1.422a8.8,8.8,0,0,1-3.349-2.055,4.687,4.687,0,0,1-.976-1.777,7.116,7.116,0,0,1-.062-2.268,4.332,4.332,0,0,1,3.644-3.374A9,9,0,0,1,23.827,8.243ZM15.484,9.726l.011,1.454h-4.63V24.328H7.6V11.183H2.97V9.755A13.986,13.986,0,0,1,3.01,8.289c.017-.023,2.832-.034,6.245-.028l6.211.017Z"
            style={{ fill: "#007acc" }}
          ></path>
        </g>
      </svg>
    )),
  },
  {
    head: "react",
    body: "reactDesc",
    image: memo((props) => (
      <svg
        {...props.imageProps}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z"
            fill="#53C1DE"
          ></path>{" "}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z"
            fill="#53C1DE"
          ></path>{" "}
        </g>
      </svg>
    )),
  },
  {
    head: "angular",
    body: "angularDesc",
    image: memo((props) => (
      <svg
        {...props.imageProps}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <polygon
            points="16 2 16 2 16 2 2.966 6.648 4.954 23.882 16 30 16 30 16 30 27.046 23.882 29.034 6.648 16 2"
            style={{ fill: "#dd0031" }}
          ></polygon>
          <polygon
            points="16 2 16 5.108 16 5.094 16 19.276 16 19.276 16 30 16 30 27.046 23.882 29.034 6.648 16 2"
            style={{ fill: "#c3002f" }}
          ></polygon>
          <path
            d="M16,5.094,7.852,23.364H10.89l1.638-4.088h6.916l1.638,4.088H24.12L16,5.094Zm2.38,11.662H13.62L16,11.03Z"
            style={{ fill: "#fff" }}
          ></path>
        </g>
      </svg>
    )),
  },
  {
    head: "canvas",
    body: "canvasDesc",
    image: memo((props) => (
      <svg
        {...props.imageProps}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-20 15 250 250"
        fill="none"
      >
        <path
          d="M28.5386 229.98L12.4254 49.1211H189.574L173.461 229.883L100.853 250"
          fill={appColors.ORANGE_SUNSHINE[500]}
        />
        <path
          d="M101 234.619V63.9648H173.412L159.594 218.262"
          fill={appColors.ORANGE_SUNSHINE[400]}
        />
        <path
          d="M55.5 198.5L45 86H101V108H69L76 182L101 188.5V212L55.5 198.5Z"
          fill="#ECEFF4"
        />
        <path d="M156.5 86H101V108H132L130 131H152L156.5 86Z" fill="white" />
        <path
          d="M101 212L144 200L148 166H127.5L126 181L101 188.5V212Z"
          fill="white"
        />
      </svg>
    )),
  },
  {
    head: "accessibility",
    body: "accessibilityDesc",
    image: memo((props) => (
      <svg
        {...props.imageProps}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.25 7C9.25 5.48122 10.4812 4.25 12 4.25C13.5188 4.25 14.75 5.48122 14.75 7C14.75 8.51878 13.5188 9.75 12 9.75C10.4812 9.75 9.25 8.51878 9.25 7ZM12 5.75C11.3096 5.75 10.75 6.30964 10.75 7C10.75 7.69036 11.3096 8.25 12 8.25C12.6904 8.25 13.25 7.69036 13.25 7C13.25 6.30964 12.6904 5.75 12 5.75Z"
            fill={appColors.POLI_PURPLE[600]}
          ></path>{" "}
          <path
            d="M5.30952 9.70721C5.47121 9.32592 5.91134 9.14786 6.29265 9.30946L6.29401 9.31004L6.30026 9.31267L6.32747 9.324C6.35201 9.33417 6.38913 9.34943 6.43772 9.36906C6.53493 9.40833 6.67786 9.46501 6.85757 9.53329C7.21744 9.67003 7.72245 9.85242 8.30152 10.0346C9.47972 10.4052 10.8888 10.75 12 10.75C13.1112 10.75 14.5203 10.4052 15.6985 10.0346C16.2775 9.85242 16.7826 9.67003 17.1424 9.53329C17.3221 9.46501 17.4651 9.40833 17.5623 9.36906C17.6109 9.34943 17.648 9.33417 17.6725 9.324L17.6997 9.31267L17.706 9.31004L17.7072 9.30953C18.0885 9.14791 18.5288 9.32591 18.6905 9.70721C18.8522 10.0886 18.6739 10.5289 18.2926 10.6906L18.2889 10.6922L18.2798 10.696L18.2468 10.7097C18.2183 10.7215 18.1771 10.7385 18.1241 10.7599C18.0183 10.8026 17.8656 10.8631 17.6752 10.9355C17.2949 11.08 16.7617 11.2726 16.1486 11.4655C15.1597 11.7765 13.9122 12.1049 12.75 12.2131V13.4522C12.75 13.8837 12.874 14.306 13.1073 14.6689L15.6309 18.5944C15.8549 18.9429 15.754 19.4069 15.4056 19.6309C15.0571 19.8549 14.5931 19.754 14.3691 19.4056L12 15.7203L9.63088 19.4056C9.40689 19.754 8.94286 19.8549 8.59443 19.6309C8.246 19.4069 8.14513 18.9429 8.36912 18.5944L10.8927 14.6689C11.126 14.306 11.25 13.8837 11.25 13.4522V12.2131C10.0878 12.1049 8.84029 11.7765 7.85143 11.4655C7.23834 11.2726 6.70512 11.08 6.32479 10.9355C6.1344 10.8631 5.98174 10.8026 5.87588 10.7599C5.82294 10.7385 5.78166 10.7215 5.75318 10.7097L5.72018 10.696L5.71114 10.6922L5.70741 10.6906C5.32606 10.5289 5.14781 10.0886 5.30952 9.70721Z"
            fill={appColors.POLI_PURPLE[600]}
          ></path>{" "}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
            fill={appColors.POLI_PURPLE[600]}
          ></path>{" "}
        </g>
      </svg>
    )),
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
    <div className={`content-center h-full w-3/5 flex pt-6`}>
      <div className={`flex flex-col sm:flex-row `}>
        {SKILLS.map(
          (skill, index) =>
            isNaN(openIndex) && (
              <button onClick={() => toggleOpen(index)}>
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
