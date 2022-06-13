import cx from "classnames";
import { useCallback, useEffect, useLayoutEffect } from "react";

import {
  ARIA_AUTOCOMPLETE_MENU,
  ARIA_LABELLED_BY,
  AUTOCOMPLETE_LIST_TEST_ID,
} from "../AutoComplete/AutoComplete.constant";
import { AutoCompleteListProps } from "./AutoCompleteList.types";

import s from "./AutoCompleteList.module.scss";
import { scrollToItemIndex } from "@/utils/scroll";

export const AutoCompleteList = <S,>({
  suggestions,
  renderItem,
  setActive,
  active,
  input,
  selected,
  onClickItem,
  itemClassName,
  listClassName,
  listRef,
}: AutoCompleteListProps<S>) => {
  const scrollToActiveItem = useCallback(
    (index: number) => scrollToItemIndex(listRef.current, index),
    [listRef]
  );

  useEffect(() => {
    scrollToActiveItem(active);
  }, [active, scrollToActiveItem]);

  useEffect(() => {
    if (selected) {
      scrollToActiveItem(selected);
    }
  }, [selected, scrollToActiveItem]);

  const onMouseOverHandler = (index: number) => () => setActive(index);

  if (suggestions.length)
    return (
      <ul
        role="listbox"
        data-testid={AUTOCOMPLETE_LIST_TEST_ID}
        className={cx(s.list, listClassName)}
        aria-controls={ARIA_AUTOCOMPLETE_MENU}
        aria-labelledby={ARIA_LABELLED_BY}
        ref={listRef}
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.id}
            role="option"
            aria-selected={index === selected}
            onClick={onClickItem && onClickItem(suggestion.label, index)}
            onMouseOver={onMouseOverHandler(index)}
            className={cx(s.list_item, itemClassName, {
              [s.list_item__active]: index === active,
              [s.list_item__selected]: index === selected,
            })}
          >
            {renderItem &&
              renderItem(suggestion, selected === index ? "" : input)}
          </li>
        ))}
      </ul>
    );

  return <></>;
};
