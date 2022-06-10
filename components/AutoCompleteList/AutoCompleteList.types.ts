import { MutableRefObject } from "react";

import { SuggestionBaseProps, RenderItemFunction } from "@/types/index";

export interface AutoCompleteListProps<S> {
  suggestions: (S & SuggestionBaseProps)[];
  active: number;
  input: string;
  selected?: number;
  listRef: MutableRefObject<HTMLUListElement | null>;
  onClickItem?: (searchValue: string, index: number) => () => void;
  setActive: (index: number) => void;
  renderItem?: RenderItemFunction<S>;
  itemClassName?: string;
  listClassName?: string;
}
