import dataURItoBlob from "-/src/utils/dataURItoBlob";

const getFileFormDataFromImageUri = (fileUri: string): FormData => {
  const blob: any = dataURItoBlob(fileUri);
  const formData = new FormData();
  formData.append("file", blob);
  return formData;
};

export default getFileFormDataFromImageUri;
