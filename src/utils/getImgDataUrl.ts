const getImgDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve: any, reject: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export default getImgDataUrl;
