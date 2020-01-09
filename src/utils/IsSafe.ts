const getIsSafe = (loading: boolean, error: object) => {
  if (!loading && !error) {
    return true;
  }
  return false;
};

export default getIsSafe;
