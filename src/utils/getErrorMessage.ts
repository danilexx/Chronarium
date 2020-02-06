const getErrorMessage = (error: any): string => {
  let message;
  if (error.response) {
    if (Array.isArray(error.response.data)) {
      const errorArray = error.response.data;
      return errorArray
        .map((e: { message: string }) => e.message)
        .reduce(
          (total: string, current: string) => `${total} \n ${current}`,
          ""
        );
    }
    const [type, newMessage] = error.response.data.error
      ? error.response.data.error.message.split(":")
      : error.response.data.split(":");
    message = newMessage;
  } else {
    message = error.message;
  }
  return message;
};

export default getErrorMessage;
