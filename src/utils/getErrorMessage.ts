const getErrorMessage = (error: any): string => {
  let message;
  if (error.response) {
    const [type, newMessage] = error.response.data.error.message.split(":");
    message = newMessage;
  } else {
    message = error.message;
  }
  return message;
};

export default getErrorMessage;
