import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  margin: 2rem 0;
  border-radius: 5px;

  padding: 1rem 4rem;
`;
export const ItemRow = styled.div`
  background-color: ${props => props.theme.bg1};
  width: 100%;
  margin: 1.5rem 0;
  border-radius: 5px;
  box-shadow: -5px 0px 0px ${props => props.theme.primary};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  border: 2px solid rgba(0, 0, 0, 0);
  transition: border-color 0.1s ease-in-out;
  border-left: none;
  cursor: pointer;
  &:hover {
    border-color: ${props => props.theme.primary};
  }
`;
export const ItemImage = styled.img.attrs({
  src: "/images/item.svg"
})`
  margin: 0 1rem;
  border-radius: 5px;
  background-color: ${props => props.theme.primary};
  padding: 0.5rem;
  width: 6rem;
  height: 6rem;
`;

export const PlusButton = styled(ItemImage).attrs({
  src: "/icons/plus.svg"
})`
  margin: auto;
  border-radius: 50%;
`;
export const ItemName = styled.p`
  color: ${props => props.theme.txtBg2};
  font-family: Roboto, Arial;
  font-size: 2rem;
  margin-left: 2rem;
`;
export const Attribute = styled.img.attrs<{ instance: "strength" | "agility" }>(
  props => ({
    src: `/attributes/${props.instance}.svg`
  })
)<{ instance: "strength" | "agility" }>`
  width: 4rem;
  height: 4rem;
  padding: 0.75rem;
  margin: 0 0.5rem;
  border-radius: 50%;
  background-color: ${props =>
    props.theme.attributes[props.instance] || props.theme.primary};
`;

export const FixedInfo = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
`;

export const SkillIcon = styled.img.attrs({
  src: "/images/skill.svg"
})`
  width: 5rem;
  height: 5rem;
  padding: 0.75rem;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  margin: 0 0.5rem;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: rotate(-20deg);
  }
`;
