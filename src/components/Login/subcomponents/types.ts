export interface FormProps {
  formRef: React.RefObject<HTMLDivElement>;
  setIndex: (index: number) => void;
  index: number;
}
