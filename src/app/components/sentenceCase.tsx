import { memo, useEffect, useState } from "react";
import { getSentenceCase } from "../common/jsUtils";
interface SentenceCaseProps {
  children: string;
}

function SentenceCase(props: SentenceCaseProps) {
  const [sentence, setSentence] = useState<string>(
    getSentenceCase(props.children)
  );

  useEffect(() => {
    setSentence(getSentenceCase(props.children));
  }, [props.children]);

  return <>{sentence}</>;
}

export default memo(SentenceCase);
