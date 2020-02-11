export const getPush = router => {
  const route = "/mastering/[adventureId]/[step]";
  const { adventureId } = router.query;
  return to => {
    const as = `/mastering/${adventureId}${to}`;
    return router.push(route, as || route, { shallow: true });
  };
};
