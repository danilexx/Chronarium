const formatValidationErrorMessage = (errorMessageArray: any): string =>
  errorMessageArray.reduce((entireString: string, currentObj: any) => {
    if (entireString === "") {
      return currentObj.message;
    }
    return `${entireString}\n${currentObj.message}`;
  }, "");
export default formatValidationErrorMessage;
