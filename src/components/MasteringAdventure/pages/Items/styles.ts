import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  margin: 2rem 0;
  border-radius: 5px;

  padding: 1rem 4rem;
`;
export const Row = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
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

export const PlusButton = styled.img.attrs({
  src: "/icons/plus.svg"
})`
  margin: 0 1rem;
  border-radius: 5px;
  background-color: ${props => props.theme.primary};
  padding: 0.5rem;
  width: 6rem;
  height: 6rem;
  margin: auto;
  border-radius: 50%;
`;
