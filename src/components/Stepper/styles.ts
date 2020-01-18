import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5rem 5rem;
`;

export const Step = styled.img<{ active?: boolean }>`
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  background-color: ${props =>
    props.active ? props.theme.primary : props.theme.bg1};
  height: 8rem;
  width: 8rem;
  margin: 0.5rem 0;
  padding: 2rem;
  cursor: pointer;
  &:active,
  &:hover {
    opacity: 0.8;
  }
`;
