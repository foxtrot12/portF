import { ReactNode } from "react";

interface CardParams {
  addClasses?: string;
  children?: ReactNode;
}

function Card(props: CardParams) {
  return <div className={`flex ${props.addClasses}`}>{props.children}</div>;
}

export default Card;
