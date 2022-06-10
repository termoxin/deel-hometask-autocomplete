import { MutableRefObject } from "react";

import { SuggestionBaseProps } from "@/types/index";

export interface AutoCompleteListProps<S> {
  suggestions: (S & SuggestionBaseProps)[];
  active: number;
  selected?: number;
  listRef: MutableRefObject<HTMLUListElement | null>;
  onClickItem?: (searchValue: string, index: number) => () => void;
  setActive: (index: number) => void;
  renderItem?: (props: S) => React.ReactElement;
  itemClassName?: string;
  listClassName?: string;
}
