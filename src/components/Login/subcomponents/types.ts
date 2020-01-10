export interface FormProps {
  formRef: React.RefObject<HTMLDivElement>;
  onChange: (index: number) => void;
  index: number;
  iChanged: () => void;
}
