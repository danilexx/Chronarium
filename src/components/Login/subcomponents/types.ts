export interface FormProps {
  onChange: (index: number) => void;
  index: number;
  onResize: (_: any, height: number) => void;
}
