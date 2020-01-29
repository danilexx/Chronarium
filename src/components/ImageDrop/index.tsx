import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { BaseProps } from "./BaseImageDrop";

const BaseImageDrop = dynamic(() => import("./BaseImageDrop"), { ssr: false });
interface Props {
  onChange?: (file: string) => void;
  name: string;
  control?: any;
  defaultValue?: string;
}

const ImageDrop: React.FC<Props & BaseProps> = ({
  control,
  name,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      as={<BaseImageDrop defaultValue={defaultValue} />}
      name={name}
      control={control}
      {...props}
    />
  );
};

export default ImageDrop;
