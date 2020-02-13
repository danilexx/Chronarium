import { useRouter } from "next/router";
import { useList } from "react-use";
import { Container, Row, PlusButton, ItemMenuItem, ItemMenu } from "./styles";
import { getPush } from "-/src/components/MasteringAdventure/utils";
import useAwait from "-/src/utils/hooks/useAwait";
import { getItems, deleteItem } from "-/src/services";
import ItemCard from "-/src/components/ItemCard";
import UpdateItemPopup from "-/src/components/MasteringAdventure/pages/Items/UpdateItemPopup";
import usePopup from "-/src/utils/hooks/usePopup";

const Items = () => {
  const [, methods] = usePopup("base");
  const router = useRouter();
  const { adventureId: advId } = router.query;
  const adventureId = Number(advId);
  const [items, { set, updateAt, removeAt }] = useList<any>([]);
  const [isLoading, fetch, { toggle }] = useAwait(getItems(adventureId));
  const toggleMenu = currentIndex => {
    const currentSkill = items[currentIndex];
    const currentCondition = currentSkill.isMenuShowed;
    set(data => data.map(e => ({ ...e, isMenuShowed: false })));
    updateAt(currentIndex, {
      ...currentSkill,
      isMenuShowed: !currentCondition
    });
  };
  React.useEffect(() => {
    const getAsync = async () => {
      try {
        const response = await fetch();
        set(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAsync();
  }, []);
  const goToCreateItem = () => {
    getPush(router)("/create-item");
  };
  const handleDelete = async (id: number, index: number) => {
    removeAt(index);
    await deleteItem(adventureId, id)();
  };
  const [toUpdateItem, setToUpdateItem] = React.useState({});
  const handleUpdate = item => {
    setToUpdateItem(item);
    methods.toggle(true);
  };
  const updateItem = item => {
    const currentItemIndex = items.findIndex(e => e.id === item.id);
    updateAt(currentItemIndex, item);
  };
  return (
    <>
      <Container>
        <Row onClick={goToCreateItem}>
          <PlusButton />
        </Row>
        {items.map((item, index) => (
          <>
            <ItemCard
              onClick={() => {
                toggleMenu(index);
              }}
              item={item}
              key={item.id}
            />
            {item.isMenuShowed && (
              <ItemMenu>
                <ItemMenuItem onClick={() => handleUpdate(item)}>
                  Update
                </ItemMenuItem>
                <ItemMenuItem
                  delete
                  onClick={() => handleDelete(item.id, index)}
                >
                  Delete
                </ItemMenuItem>
              </ItemMenu>
            )}
          </>
        ))}
      </Container>
      <UpdateItemPopup methods={methods} item={toUpdateItem} cb={updateItem} />
    </>
  );
};

export default Items;
