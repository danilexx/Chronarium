import { Name, Description } from "./styles";

const ItemTooltip = ({ item }) => {
  if (!item) return null;
  const { name, description } = item;
  return (
    <>
      <Name>{name}</Name>
      <Description>{description}</Description>
    </>
  );
};
export default ItemTooltip;
