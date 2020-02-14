import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.bg1};
  border-radius: 5px;
  margin: 1rem auto;
  display: flex;
  border: 0.5rem solid ${props => props.theme.primary};
  /* max-width: 30rem; */
  position: relative;
`;

export const ImageDisplay = styled.img`
  width: 50%;
  margin: 1rem auto;
  max-width: 30rem;
`;

export const ResetImageIcon = styled.img.attrs({
  src: "/icons/deny.svg"
})`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${props => props.theme.error};
  width: 4rem;
  height: 4rem;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem;
  cursor: pointer;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 30rem;
  height: fit-content;
  position: relative;
  margin: 0 auto;
`;
