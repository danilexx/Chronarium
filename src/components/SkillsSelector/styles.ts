import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  /* padding: 1rem 0; */
`;
export const PlusContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 0.5rem dashed ${props => props.theme.bg1};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0;
  margin-bottom: 0.5rem;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
export const Plus = styled.img.attrs({
  src: "/icons/plus.svg"
})`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  background-color: ${props => props.theme.primary};
  padding: 1rem;
`;
export const Title = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.primary};
  font-family: Roboto, Arial;
  margin: 1rem 0;
  /* margin-top: -1rem; */
  padding: 0;
  text-indent: 0.5rem;
  width: 100%;
  text-align: center;
`;

export const Skills = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0;
`;

export const ErrorContainer = styled.p`
  font-size: 1.3rem;
  font-family: Roboto, Arial;
  color: ${props => props.theme.error};
  margin: 0 0.8rem;
  margin-bottom: 0.8rem;
`;

export const RemoveButton = styled.img.attrs({
  src: "/icons/deny.svg"
})`
  background-color: ${props => props.theme.error};
  padding: 1rem;
  width: 4rem;
  height: 4rem;
  margin: 0 1rem;
  border-radius: 5px;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
