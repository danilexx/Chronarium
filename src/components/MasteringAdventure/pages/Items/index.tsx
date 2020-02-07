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

const Items = () => {
  return (
    <Container>
      <ItemRow>
        <PlusButton />
      </ItemRow>
      {[...Array(3)].map((e, index) => (
        <ItemRow>
          <ItemImage />
          <ItemName>Broad Sword</ItemName>
          <FixedInfo>
            <SkillIcon />
            <SkillIcon />
            <Attribute instance="strength" />
          </FixedInfo>
        </ItemRow>
      ))}
    </Container>
  );
};

export default Items;
