import JwtDecode from "jwt-decode";

const isJwtExpiry = (token: string): boolean => {
  const { iat }: { iat: number } = JwtDecode(token);
  if (Date.now() >= iat * 1000) {
    return false;
  }
  return true;
};

export default isJwtExpiry;
