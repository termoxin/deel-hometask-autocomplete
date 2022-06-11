import { AriaAttributes } from "react";

export const AUTOCOMPLETE_INPUT_TEST_ID = "autocomplete-input";
export const AUTOCOMPLETE_LIST_TEST_ID = "autocomplete-list";

export const AUTOCOMPLETE_LABEL_ID = "autocomplete-label";
export const AUTOCOMPLETE_SELECT_ID = "autocomplete";
export const ARIA_AUTOCOMPLETE_MENU = "autocomplete-list";

export const ARIA_OWNS = "autocomplete_options";
export const ARIA_LABELLED_BY = "autocomplete_hidden";

export const autoCompleteAccessbilityAttrs: AriaAttributes = {
  "aria-owns": ARIA_OWNS,
  "aria-autocomplete": "both",
  "aria-labelledby": ARIA_LABELLED_BY,
  "aria-haspopup": "true",
  "aria-readonly": "false",
};

export const inputAccessbilityAttrs: AriaAttributes = {
  "aria-controls": "autocomplete-menu",
  "aria-owns": "atcelement_options",
  "aria-autocomplete": "list",
  "aria-labelledby": "autocomplete-label",
  "aria-haspopup": "true",
  "aria-readonly": "false",
  "aria-disabled": "false",
};
