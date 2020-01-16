import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Container, ImageDisplay } from "./styles";

interface Props {
  onChange?: (file: any) => void;
}

const ImageDrop: React.FC<Props> = ({ onChange }) => {
  const [imgUrl, setImgUrl] = useState("");
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const fileReader = new FileReader();
    // const blob = new Blob(acceptedFiles[0]);
    fileReader.onloadend = () => {
      // preview.src = reader.result;
      setImgUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      <ImageDisplay src={imgUrl !== "" ? imgUrl : "/icons/image.svg"} />
    </Container>
  );
};

export default ImageDrop;
