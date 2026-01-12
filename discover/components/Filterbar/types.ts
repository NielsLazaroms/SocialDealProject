export interface FilterbarSubmitProps {
  text: string;
}

export interface FilterbarBaseProps {
  submitButton?: FilterbarSubmitProps;
}

export interface FilterbarEmits {
  (e: 'submit'): void;
}
