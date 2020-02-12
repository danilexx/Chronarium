import {
  Container,
  ItemRow,
  ItemImage,
  ItemName,
  Attribute,
  FixedInfo,
  SkillIcon,
  PlusButton
} from "./styles";

const ItemCard = ({ item }) => {
  const { skills } = item;
  return (
    <ItemRow>
      <ItemImage src={item.icon ? item.icon.url : "/images/item.svg"} />
      <ItemName>{item.name}</ItemName>
      <FixedInfo>
        {skills.length > 0 &&
          skills.map(skill => (
            <SkillIcon
              src={skill.icon ? skill.icon.url : "/images/skill.svg"}
            />
          ))}
        <Attribute instance={item.main_attribute} />
      </FixedInfo>
    </ItemRow>
  );
};

export default ItemCard;
