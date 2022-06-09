import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import cx from "classnames";

import { AutoCompleteProps, SuggestionBaseProps } from "./AutoComplete.types";
import {
  AUTOCOMPLETE_INPUT_TEST_ID,
  AUTOCOMPLETE_LIST_TEST_ID,
} from "./AutoComplete.constant";

import { throttle } from "@/utils/throttle";

import s from "./AutoComplete.module.scss";

export const AutoComplete = <S,>({
  suggestions,
  inputPlaceholder,
  renderItem,
  onChange,
  onEnter,
  onClick,
  onFocus,
  onBlur,
  throttleTime,
  className,
  inputClass,
  listClassName,
  itemClassName,
}: AutoCompleteProps<S>) => {
  const [active, setActive] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");

  const autoCompleteListRef = useRef<HTMLUListElement | null>(null);
  const autoCompleteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickOutside = (e: Event) => {
      if (autoCompleteRef && autoCompleteRef.current) {
        const ref = autoCompleteRef.current;
        const target = e.target;

        if (target && !ref.contains(target as Node)) {
          setIsShow(false);
        }
      }
    };

    document.addEventListener("click", clickOutside);

    return () => document.removeEventListener("click", clickOutside);
  }, []);

  const throttledOnChange = useCallback(
    throttle((value: string) => onChange && onChange(value), throttleTime),
    []
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setActive(0);
    setIsShow(true);
    setInput(e.currentTarget.value);

    if (onChange) {
      throttledOnChange(e.currentTarget.value);
    }
  };

  const onClickHandler = (searchValue: string, index: number) => () => {
    setActive(0);
    setIsShow(false);
    setInput(searchValue);

    if (onClick) {
      onClick(suggestions[index]);
    }
  };

  const onFocusHandler = () => {
    setIsShow(true);

    if (onFocus) {
      onFocus();
    }
  };

  const scrollToActiveItem = (index: number) => {
    const currentAutoComplete = autoCompleteListRef.current;

    if (currentAutoComplete) {
      const item = currentAutoComplete.children.item(index);

      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      // enter key
      if (suggestions[active]) {
        setInput(suggestions[active].label);
        setActive(0);
        setIsShow(false);
      }

      if (onEnter && suggestions[active]) {
        onEnter(suggestions[active]);
      }
    } else if (e.code === "ArrowUp") {
      // up arrow

      if (active === 0) {
        scrollToActiveItem(suggestions.length - 1);
        setActive(suggestions.length - 1);
      } else {
        setActive(active - 1);
        scrollToActiveItem(active - 1);
      }
    } else if (e.code === "ArrowDown") {
      // down arrow
      if (active === suggestions.length - 1) {
        scrollToActiveItem(0);
        setActive(0);
      } else {
        setActive(active + 1);
        scrollToActiveItem(active + 1);
      }
    }
  };

  const renderAutocomplete = () => {
    if (isShow && input) {
      if (suggestions.length) {
        return (
          <ul
            data-testid={AUTOCOMPLETE_LIST_TEST_ID}
            ref={autoCompleteListRef}
            className={cx(s.autocomplete_list, listClassName)}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                role="listitem"
                aria-current={index === active}
                onClick={onClickHandler(suggestion.label, index)}
                className={cx(s.autocomplete_list_item, itemClassName, {
                  [s.autocomplete_list_item__active]: index === active,
                })}
              >
                {renderItem && renderItem(suggestion)}
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <div className={s.autocomplete_no_autocomplete}>
            <p>Nothing was found</p>
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <div className={cx(s.autocomplete, className)} ref={autoCompleteRef}>
      <input
        data-testid={AUTOCOMPLETE_INPUT_TEST_ID}
        className={cx(s.autocomplete_input, inputClass)}
        type="text"
        value={input}
        placeholder={inputPlaceholder}
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
        onFocus={onFocusHandler}
        onBlur={onBlur}
      />
      {renderAutocomplete()}
    </div>
  );
};

AutoComplete.defaultProps = {
  inputPlaceholder: "",
  suggestions: [],
  throttleTime: 500,
  renderItem: (suggestion: SuggestionBaseProps) => <>{suggestion.label}</>,
};
