import { SuggestionBaseProps, RenderItemFunction } from "@/types/index";

export interface AutoCompleteProps<S = SuggestionBaseProps> {
  /**
   * Suggestions to display in autocomplete list
   */
  suggestions: (S & SuggestionBaseProps)[];

  /**
   * Autocomplete input placeholder
   */
  inputPlaceholder?: string;

  /**
   * Input throttle time
   */
  throttleTime?: number;

  /**
   * Autocomplete container className
   */
  className?: string;

  /**
   * Autocomplete input className
   */
  inputClass?: string;

  /**
   * Autocomplete list className
   */
  listClassName?: string;

  /**
   * Autocomplete item className
   */
  itemClassName?: string;

  /**
   * Indicates loading data
   */
  loading?: boolean;

  /**
   * Indicates that error happened and shows the text of an error when it happens
   */
  error?: string;

  /**
   * Takes renderer function that takes place data structure and returns React.Element
   */
  renderItem?: RenderItemFunction<S>;

  /**
   * Invokes when input value is changed
   */
  onChange?: (value: string) => void;

  /**
   * Invokes when an item is active and Enter button is pressed
   */
  onEnter?: (value: S) => void;

  /**
   * Invokes when an autocomplete item is clicked
   */
  onClick?: (value: S) => void;

  /**
   * Invokes when input is focused
   */
  onFocus?: () => void;

  /**
   * Invokes when input is unfocused
   */
  onBlur?: () => void;
}
