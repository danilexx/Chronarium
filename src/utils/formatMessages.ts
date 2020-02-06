const getUsername = user => {
  return user.username;
};

const getIOwner = (user, currentUser) => {
  if (user.id === currentUser.id) {
    return true;
  }
  return false;
};

const getNextMessageIsMine = (array, index) => {
  if (!array[index + 1]) return false;
  const nextElement = array[index + 1];
  const currentElement = array[index];
  if (nextElement.user.id === currentElement.user.id) {
    return true;
  }
  return false;
};

const getFirstMessage = (array, index) => {
  if (!array[index - 1]) return true;
  const nextElement = array[index - 1];
  const currentElement = array[index];
  if (nextElement.user.id !== currentElement.user.id) {
    return true;
  }
  return false;
};

interface Props {
  adventureId: number;
}

const formatMessages = userOwner => (
  { message, master, character, user },
  index,
  array
) => {
  if (index === 0) {
    // console.log(array);
  }
  const currentUser = user;
  const username = getUsername(user);
  const iOwner = getIOwner(userOwner, currentUser);
  const firstMessage = getFirstMessage(array, index);
  const nextMessageIsMine = getNextMessageIsMine(array, index);
  const element = {
    currentUser,
    username,
    iOwner,
    firstMessage,
    nextMessageIsMine,
    message
  };
  return element;
};

export default formatMessages;
