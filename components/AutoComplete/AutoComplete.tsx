import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useState } from "react";

import { AutoCompleteProps } from "./AutoComplete.types";

import s from "./AutoComplete.module.scss";

export const AutoComplete: FC<AutoCompleteProps> = ({ suggestions }) => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState<AutoCompleteProps["suggestions"]>(
    []
  );

  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");

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

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(0);
      setIsShow(false);
      setInput(filtered[active]);
    } else if (e.keyCode === 38) {
      // up arrow
      return active === 0 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1);
    }
  };

  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className={s.autocomplete}>
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {renderAutocomplete()}
    </>
  );
};
