import { SuggestionBaseProps, RenderItemFunction } from "@/types/index";

export interface AutoCompleteProps<S = SuggestionBaseProps> {
  suggestions: (S & SuggestionBaseProps)[];
  inputPlaceholder?: string;
  throttleTime?: number;
  className?: string;
  inputClass?: string;
  listClassName?: string;
  itemClassName?: string;
  renderItem?: RenderItemFunction<S>;
  onChange?: (value: string) => void;
  onEnter?: (value: S) => void;
  onClick?: (value: S) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
