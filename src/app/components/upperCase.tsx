import { useState, useEffect, memo } from "react";

interface UpperCaseProps {
  children: string;
}

function UpperCase(props: UpperCaseProps) {
  const [title, setTitle] = useState<string>(props.children.toUpperCase());

  useEffect(() => {
    setTitle(props.children.toUpperCase());
  }, [props.children]);

  return <>{title}</>;
}

export default memo(UpperCase);
