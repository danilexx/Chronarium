import styled from "-/src/utils/StyledComponents";

export const Label = styled.label`
  font-family: Roboto, Arial;
  font-size: 1.8rem;
  color: ${props => props.theme.gray2};
  text-indent: 0.8rem;
  margin-bottom: 0.7rem;
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  user-select: none;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;
export const StyledInput = styled.input`
  max-width: var(--form-width);
  font-size: 2.2rem;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.theme.gray1};
  padding-top: 1.8rem;
  &:focus,
  &:valid {
    & + ${Label} {
      color: ${props => props.theme.primary};
      top: 1.2rem;
      font-size: 1.2rem;
      transform: translateY(-50%);
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-bottom: 0.8rem;
  position: relative;
`;
