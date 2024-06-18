import { memo, useEffect, useState } from "react";

export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

interface TitleCaseProps {
  children: string;
}

function TitleCase(props: TitleCaseProps) {
  const [title, setTitle] = useState<string>(toTitleCase(props.children));

  useEffect(() => {
    setTitle(toTitleCase(props.children));
  }, [props.children]);

  return <>{title}</>;
}

export default memo(TitleCase);
