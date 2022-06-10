import { FC } from "react";

import { removeAccents } from "@/utils/removeAccents";
import { HighlighterProps } from "./Highlighter.types";

export const Highlighter: FC<HighlighterProps> = ({
  highlightClassName,
  highlight,
  value,
}) => {
  const startIndex = removeAccents(value.toLowerCase()).indexOf(
    highlight.toLowerCase()
  );

  if (startIndex > -1) {
    const endIndex = highlight.length + startIndex;

    return (
      <>
        {value.substring(0, startIndex)}
        <span className={highlightClassName}>
          {value.substring(startIndex, endIndex)}
        </span>
        {value.substring(endIndex)}
      </>
    );
  }

  return <>{value}</>;
};
