export type SuggestionBaseProps = {
  id: string;
  label: string;
};

export interface AutoCompleteProps<S = SuggestionBaseProps> {
  suggestions: (S & SuggestionBaseProps)[];
  inputPlaceholder?: string;
  throttleTime?: number;
  renderItem?: (props: S) => React.ReactElement;
  onChange?: (value: string) => void;
  onEnter?: (value: S) => void;
  onClick?: (value: S) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  inputClass?: string;
  listClassName?: string;
  itemClassName?: string;
}
