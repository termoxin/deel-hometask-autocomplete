import cx from "classnames";
import { useCallback, useEffect, useLayoutEffect } from "react";

import { AUTOCOMPLETE_LIST_TEST_ID } from "../AutoComplete/AutoComplete.constant";
import { AutoCompleteListProps } from "./AutoCompleteList.types";

import s from "./AutoCompleteList.module.scss";
import { scrollToItemIndex } from "@/utils/scroll";

export const AutoCompleteList = <S,>({
  suggestions,
  renderItem,
  setActive,
  active,
  selected,
  onClickItem,
  itemClassName,
  listClassName,
  listRef,
}: AutoCompleteListProps<S>) => {
  useEffect(() => {
    scrollToActiveItem(active);
  }, [active]);

  useEffect(() => {
    if (selected) {
      scrollToActiveItem(selected);
    }
  }, [selected]);

  const scrollToActiveItem = useCallback(
    (index: number) => scrollToItemIndex(listRef.current, index),
    [selected, listRef]
  );

  const onMouseOverHandler = (index: number) => () => setActive(index);

  if (suggestions.length)
    return (
      <ul
        data-testid={AUTOCOMPLETE_LIST_TEST_ID}
        className={cx(s.list, listClassName)}
        ref={listRef}
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.id}
            role="listitem"
            aria-current={index === active}
            onClick={onClickItem && onClickItem(suggestion.label, index)}
            onMouseOver={onMouseOverHandler(index)}
            className={cx(s.list_item, itemClassName, {
              [s.list_item__active]: index === active,
              [s.list_item__selected]: index === selected,
            })}
          >
            {renderItem && renderItem(suggestion)}
          </li>
        ))}
      </ul>
    );

  return <></>;
};
