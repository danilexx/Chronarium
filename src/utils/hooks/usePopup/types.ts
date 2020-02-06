export interface Options {
  toggle: (nextValue?: boolean) => void;
  isOn: boolean;
  show: (nextMessage: string) => void;
  message: string;
}
export interface Props {
  children?: React.ReactNode;
  isOn: boolean;
  toggle: (nextValue?: boolean) => void;
  important?: boolean;
  error?: boolean;
}

export interface InfoProps {
  message: string;
  title: string;
  callback?: () => void;
}
export interface ErrorProps {
  message: string;
  title: string;
  callback?: () => void;
}

export interface FieldProps {
  message: string;
  title: string;
  callback?: (field: string) => void;
  fieldName: string;
  buttonText: string;
  isLoading: boolean;
  errorMessage: string;
}
export type PopupTypes = "info" | "base" | "error" | "addFriend" | "field";
