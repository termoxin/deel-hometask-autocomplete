import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useRef,
  useState,
} from "react";
import cx from "classnames";

import { AutoCompleteProps } from "./AutoComplete.types";
import s from "./AutoComplete.module.scss";

export const AutoComplete: FC<AutoCompleteProps> = ({ suggestions }) => {
  const [active, setActive] = useState(0);

  const [filtered, setFiltered] = useState<AutoCompleteProps["suggestions"]>(
    []
  );

  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");

  const autoCompleteRef = useRef<HTMLUListElement | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );

    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value);
  };

  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
  };

  const currentAutoComplete = autoCompleteRef.current;

  const scrollToActiveItem = (index: number) => {
    if (currentAutoComplete) {
      const item = currentAutoComplete.children.item(index);

      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(0);
      setIsShow(false);
      setInput(filtered[active]);
    } else if (e.keyCode === 38) {
      // up arrow
      scrollToActiveItem(active - 1);
      return active === 0 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      scrollToActiveItem(active + 1);
      return filtered.length - 1 === active ? null : setActive(active + 1);
    }
  };

  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul ref={autoCompleteRef} className={s.autocomplete}>
            {filtered.map((suggestion, index) => (
              <li
                className={cx(s.autocomplete_item, {
                  [s.autocomplete_item__active]: index === active,
                })}
                key={suggestion}
                onClick={onClick}
              >
                <>{suggestion}</>
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
    <>
      <input
        className={s.autocomplete_input}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {renderAutocomplete()}
    </>
  );
};
