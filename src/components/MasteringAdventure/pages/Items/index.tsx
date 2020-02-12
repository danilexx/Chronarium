import { useRouter } from "next/router";
import { useList } from "react-use";
import { Container, Row, PlusButton } from "./styles";
import { getPush } from "-/src/components/MasteringAdventure/utils";
import useAwait from "-/src/utils/hooks/useAwait";
import { getItems } from "-/src/services";
import ItemCard from "-/src/components/ItemCard";

const Items = () => {
  const router = useRouter();
  const { adventureId } = router.query;
  const [items, { set }] = useList([]);
  const [isLoading, fetch, { toggle }] = useAwait(getItems(adventureId));
  React.useEffect(() => {
    const getAsync = async () => {
      try {
        const response = await fetch();
        set(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAsync();
  }, []);
  const goToCreateItem = () => {
    getPush(router)("/create-item");
  };
  return (
    <Container>
      <Row onClick={goToCreateItem}>
        <PlusButton />
      </Row>
      {items.map(item => (
        <ItemCard item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Items;
