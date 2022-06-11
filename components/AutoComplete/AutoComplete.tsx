import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cx from "classnames";

import { AutoCompleteProps } from "./AutoComplete.types";
import { throttle } from "@/utils/throttle";

import {
  ariaAccessbilityAttrs,
  ARIA_LABELLED_BY,
  AUTOCOMPLETE_INPUT_TEST_ID,
  AUTOCOMPLETE_LABEL_ID,
  AUTOCOMPLETE_SELECT_ID,
  inputAccessbilityAttrs,
} from "./AutoComplete.constant";

import s from "./AutoComplete.module.scss";
import { SuggestionBaseProps } from "@/types/index";
import { AutoCompleteList } from "../AutoCompleteList/AutoCompleteList";
import { DEFAULT_THROTTLE_TIME } from "@/constant";

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
  const [active, setActive] = useState<number>(0);
  const [selected, setSelected] = useState<number | undefined>(undefined);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledOnChange = useCallback(
    throttle((value: string) => onChange && onChange(value), throttleTime),
    []
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setActive(0);
      setIsShow(true);
      setInput(e.currentTarget.value);

      if (onChange) {
        throttledOnChange(e.currentTarget.value);
      }
    },
    [setActive, setIsShow, setInput, onChange, throttledOnChange]
  );

  const onClickHandler = useCallback(
    (searchValue: string, index: number) => () => {
      const selectedText = window?.getSelection()?.toString();

      if (selectedText?.trim()) {
        return;
      }

      setActive(0);
      setIsShow(false);
      setSelected(index);
      setInput(searchValue);

      if (onClick) {
        onClick(suggestions[index]);
      }
    },
    [setActive, setIsShow, setInput, onClick, suggestions]
  );

  const onFocusHandler = useCallback(() => {
    setIsShow(true);

    if (onFocus) {
      onFocus();
    }
  }, [setIsShow, onFocus]);

  const onEnterHandler = useCallback(() => {
    if (suggestions[active] && input && isShow) {
      setActive(0);
      setIsShow(false);
      setSelected(active);
      setInput(suggestions[active].label);
    }

    if (onEnter && suggestions[active] && input && isShow) {
      onEnter(suggestions[active]);
    }
  }, [suggestions, active, input, isShow, onEnter]);

  const onArrowUpHandler = useCallback(() => {
    if (active === 0) {
      setSelected(active);
      setActive(suggestions.length - 1);
    } else {
      setActive(active - 1);
    }
  }, [suggestions, active, setActive]);

  const onArrowDownHandler = useCallback(() => {
    if (active === suggestions.length - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  }, [suggestions, active, setActive]);

  const onKeyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        onEnterHandler();
      } else if (e.code === "ArrowUp") {
        onArrowUpHandler();
      } else if (e.code === "ArrowDown") {
        onArrowDownHandler();
      }
    },
    [onEnterHandler, onArrowUpHandler, onArrowDownHandler]
  );

  const isSelectedOption = useCallback(
    (suggestion: S & SuggestionBaseProps) =>
      typeof selected !== "undefined" &&
      suggestions.find((s) => s?.id === suggestions?.[selected]?.id)?.id ===
        suggestion.id,
    [selected, suggestions]
  );

  const inputActiveDescendant = useMemo(
    () => (isShow ? suggestions?.[active]?.label : undefined),
    [active, isShow, suggestions]
  );

  return (
    <div
      className={cx(s.autocomplete, className)}
      ref={autoCompleteRef}
      {...ariaAccessbilityAttrs}
      aria-expanded={isShow}
    >
      <label
        className={s.autocomplete_label}
        htmlFor={AUTOCOMPLETE_SELECT_ID}
        id={AUTOCOMPLETE_LABEL_ID}
      >
        {inputPlaceholder}
      </label>
      <select
        defaultValue=""
        className={s.autocomplete_select}
        aria-hidden="true"
        tabIndex={-1}
        name={AUTOCOMPLETE_SELECT_ID}
        id={ARIA_LABELLED_BY}
      >
        {suggestions.map((suggestion) => {
          const selectedOption = isSelectedOption(suggestion);

          return (
            <option
              selected={selectedOption}
              aria-selected={selectedOption}
              key={suggestion.id}
              value={suggestion.label}
            >
              {suggestion.label}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        // since accessbility attributes dictionary used eslint error occurs
        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="combobox"
        tabIndex={0}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        {...inputAccessbilityAttrs}
        aria-expanded={isShow}
        aria-activedescendant={inputActiveDescendant}
        data-testid={AUTOCOMPLETE_INPUT_TEST_ID}
        className={cx(s.autocomplete_input, inputClass)}
        value={input}
        placeholder={inputPlaceholder}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onFocus={onFocusHandler}
        onBlur={onBlur}
      />
      {isShow && input && (
        <AutoCompleteList
          suggestions={suggestions}
          active={active}
          input={input}
          setActive={setActive}
          selected={selected}
          renderItem={renderItem}
          onClickItem={onClickHandler}
          listRef={autoCompleteListRef}
          listClassName={listClassName}
          itemClassName={itemClassName}
        />
      )}
    </div>
  );
};

AutoComplete.defaultProps = {
  inputPlaceholder: "",
  suggestions: [],
  throttleTime: DEFAULT_THROTTLE_TIME,
  renderItem: (suggestion: SuggestionBaseProps) => <>{suggestion.label}</>,
};
