import { FC } from "react";

import { AutoCompletePlaceItemProps } from "./AutoCompletePlaceItem.types";

import s from "./AutoCompletePlaceItem.module.scss";

export const AutoCompletePlaceItem: FC<AutoCompletePlaceItemProps> = ({
  place,
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
      <span>{placeName}</span>
    </p>
  );
};
