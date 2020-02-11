import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  margin: 2rem 0;
  border-radius: 5px;

  padding: 1rem 4rem;
`;
export const SkillRow = styled.div`
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
export const SkillImage = styled.img.attrs({
  src: "/images/skill.svg"
})`
  margin: 0 1rem;
  border-radius: 5px;
  background-color: ${props => props.theme.primary};
  padding: 0.5rem;
  width: 6rem;
  height: 6rem;
`;

export const PlusButton = styled(SkillImage).attrs({
  src: "/icons/plus.svg"
})`
  margin: auto;
  border-radius: 50%;
`;
export const SkillName = styled.p`
  color: ${props => props.theme.txtBg2};
  font-family: Roboto, Arial;
  font-size: 2rem;
  margin-left: 2rem;
`;

export const FixedInfo = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
`;

const iconSize = "2rem";

export const DamageIcon = styled.img.attrs({
  src: "/icons/damage.svg"
})`
  height: ${iconSize};
  width: ${iconSize};
  margin: 0 0.5rem;
`;
export const ManaIcon = styled.div`
  height: ${iconSize};
  width: ${iconSize};
  background-color: #54adff;
  margin: 0 0.5rem;
  border-radius: 50%;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.74rem;
  font-family: Roboto, Arial;
  color: ${props => props.theme.txtBg2};
  margin: 0 0.7rem;
  text-transform: capitalize;
`;

export const DamageTypeIcon = styled(DamageIcon).attrs({
  src: "/icons/dmgtype.svg"
})``;
