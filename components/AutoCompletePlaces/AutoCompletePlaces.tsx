import { FC, useCallback } from "react";

import { Place } from "@/types/index";
import { AutoCompletePlaceItem } from "../AutoCompletePlaceItem";
import { AutoCompletePlacesProps } from "./AutoCompletePlaces.types";
import { AutoComplete } from "../AutoComplete/AutoComplete";

export const AutoCompletePlaces: FC<AutoCompletePlacesProps> = (props) => {
  const renderPlaceItem = useCallback(
    (place: Place, search?: string) => (
      <AutoCompletePlaceItem place={place} search={search} />
    ),
    []
  );

  return <AutoComplete {...props} renderItem={renderPlaceItem} />;
};
