import { FC, memo } from "react";

import { AutoCompletePlaceItemProps } from "./AutoCompletePlaceItem.types";

import s from "./AutoCompletePlaceItem.module.scss";
import { Highlighter } from "../Hightlighter";

const AutoCompletePlaceItemComponent: FC<AutoCompletePlaceItemProps> = ({
  place,
  search,
}) => {
  const { placeName, properties } = place;

  return (
    <p className={s.placeItem}>
      {properties?.category && (
        <>
          <span className={s.placeItem_category}>
            📌 <b>{properties?.category}</b>
          </span>
          <br />
        </>
      )}
      <span>
        <Highlighter
          highlightClassName={s.highlighted}
          highlight={search || ""}
          value={placeName}
        />
      </span>
    </p>
  );
};

export const AutoCompletePlaceItem = memo(AutoCompletePlaceItemComponent);
