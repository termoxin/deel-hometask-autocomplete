import { AutoCompleteProps } from "../AutoComplete";

import { Place } from "@/types/index";

export type AutoCompletePlacesProps = Omit<
  AutoCompleteProps<Place>,
  "renderItem"
>;
