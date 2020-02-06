const isFalsy = (value): boolean => {
  if (value === null || value === undefined || value === false) {
    return true;
  }
  return false;
};

export default isFalsy;
