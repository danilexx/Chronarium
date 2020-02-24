import { useRouter } from "next/router";
import React from "react";

export default function() {
  const router = useRouter();
  React.useEffect(() => {
    router.push(`/adventures/${router.query.adventureId}/home`);
  }, []);
  return null;
}
