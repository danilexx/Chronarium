const getAdventurePush = router => to => {
  const route = "/adventures/[adventureId]/[step]";
  const as = `/adventures/${router.query.adventureId}/${to}`;
  router.push(route, as || route, { shallow: true });
};

export default getAdventurePush;
