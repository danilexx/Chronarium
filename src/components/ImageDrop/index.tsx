import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import { Container, ImageDisplay } from "./styles";
import getImgDataUrl from "-/src/utils/getImgDataUrl";

interface Props {
  onChange?: (file: string) => void;
  name: string;
  control?: any;
  defaultValue?: string;
}

interface BaseProps {
  onChange?: (file: string) => void;
  defaultValue?: string;
}

const BaseImageDrop: React.FC<BaseProps> = ({
  onChange,
  defaultValue = "",
  ...props
}) => {
  const [imgUrl, setImgUrl] = useState(defaultValue);
  const onDrop = useCallback(acceptedFiles => {
    let data;
    (async () => {
      data = await getImgDataUrl(acceptedFiles[0]);
      setImgUrl(data);
      if (onChange) {
        onChange(data);
      }
    })();
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*"
  });
  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <ImageDisplay
        src={
          imgUrl !== ""
            ? imgUrl
            : isDragActive
            ? "/icons/download.svg"
            : "/icons/image.svg"
        }
      />
    </Container>
  );
};

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
