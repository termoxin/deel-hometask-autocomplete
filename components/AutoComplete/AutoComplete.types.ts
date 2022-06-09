export type BaseProps = {
  id: string;
  label: string;
};

export interface AutoCompleteProps<S = BaseProps> {
  suggestions: (S & BaseProps)[];
  inputPlaceholder?: string;
  throttleTime?: number;
  renderItem: (props: S) => React.ReactElement;
  onChange?: (value: string) => void;
  onEnter?: (value: S) => void;
  onClick?: (value: S) => void;
  className?: string;
  inputClass?: string;
  listClassName?: string;
  itemClassName?: string;
}
