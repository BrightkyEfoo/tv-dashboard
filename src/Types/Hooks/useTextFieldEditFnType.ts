export type useTextFieldEditArgsType = {
  setValue: (v: string) => void;
  submit: (v: string) => Promise<void>;
  value: string;
};
