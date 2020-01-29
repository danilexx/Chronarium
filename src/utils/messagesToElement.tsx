const messagesToElement = (format, messages, jsx) => {
  const { OtherPeopleMessage, MessageOwner, MyMessage } = jsx;
  return messages
    .map(format)
    .map(
      (
        { username, firstMessage, nextMessageIsMine, iOwner, message },
        index,
        array
      ) => {
        if (!iOwner) {
          return (
            <OtherPeopleMessage key={index} chatPin={!nextMessageIsMine}>
              {firstMessage && <MessageOwner>{username}</MessageOwner>}
              {message}
            </OtherPeopleMessage>
          );
        }

        return (
          <MyMessage key={index} chatPin={!nextMessageIsMine}>
            {message}
          </MyMessage>
        );
      }
    );
};

export default messagesToElement;
