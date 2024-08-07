import { memo, useEffect, useState } from "react";
import { getTitleCase } from "../common/jsUtils";
interface TitleCaseProps {
  children: string;
}

function TitleCase(props: TitleCaseProps) {
  const [title, setTitle] = useState<string>(getTitleCase(props.children));

  useEffect(() => {
    setTitle(getTitleCase(props.children));
  }, [props.children]);

  return <>{title}</>;
}

export default memo(TitleCase);
