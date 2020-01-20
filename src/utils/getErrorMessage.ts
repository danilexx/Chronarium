const getErrorMessage = (error: any): string => {
  let message;
  if (error.response) {
    console.log(error.response);
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
