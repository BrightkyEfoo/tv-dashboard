export type Props = {
  preText: string;
  value: string;
  setValue: (v: string) => void;
  submit: (v: string) => Promise<void>;
};
