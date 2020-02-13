import { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import getImgDataUrl from "-/src/utils/getImgDataUrl";
import { Container, ImageDisplay } from "./styles";

export interface BaseProps {
  onChange?: (file: string) => void;
  defaultValue?: string;
}

const BaseImageDrop: React.FC<BaseProps> = ({
  onChange,
  defaultValue = "",
  ...props
}) => {
  const [imgUrl, setImgUrl] = useState("");
  React.useEffect(() => {
    if (defaultValue) {
      setImgUrl(defaultValue);
    }
  }, [defaultValue]);
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
  const image = useMemo(() => {
    if (imgUrl && imgUrl !== "") {
      return imgUrl;
    }
    if (isDragActive) {
      return "/icons/download.svg";
    }
    return "/icons/image.svg";
  }, [imgUrl, isDragActive]);
  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <ImageDisplay src={image} />
    </Container>
  );
};

export default BaseImageDrop;
