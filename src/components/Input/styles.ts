import BaseSelect from "react-select";
import styled, { css } from "-/src/utils/StyledComponents";

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
  z-index: 5;
`;

interface StyledInputProps {
  hasValue?: boolean;
  isWrong: boolean;
  rows?: number;
}
const activated = css<StyledInputProps>`
  border: 1px solid
    ${props => (props.isWrong ? props.theme.error : props.theme.primary)};
  outline-color: none;
  & + label {
    color: ${props =>
      props.isWrong ? props.theme.error : props.theme.primary};
    top: 1.2rem;
    font-size: 1.2rem;
    transform: translateY(-50%);
  }
`;
const textareaActivated = css<StyledInputProps>`
  border: 1px solid
    ${props => (props.isWrong ? props.theme.error : props.theme.primary)};
  outline-color: none;
  & + label {
    color: ${props =>
      props.isWrong ? props.theme.error : props.theme.primary};
    top: 1.2rem;
    transform: translateY(-50%);
  }
`;

const baseStyle = css`
  max-width: var(--form-width);
  font-size: 2.2rem;
  border-radius: 5px;
  padding: 0.8rem 1rem;
  border: 1px solid ${props => props.theme.gray1};
  background-color: ${props => props.theme.txtBg2};
  padding-top: 1.8rem;
  transition: color 0.2s ease-in-out;
  will-change: color;

  &:focus,
  &:valid {
    ${activated}
  }
`;

export const StyledInput = styled.input<StyledInputProps>`
  ${baseStyle}
`;

export const Container = styled.div<{ isFull?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-bottom: 0.8rem;
  position: relative;
  ${props =>
    props.isFull &&
    css`
      flex: 1;
    `}
`;

export const ErrorContainer = styled.p`
  font-size: 1.3rem;
  font-family: Roboto, Arial;
  color: ${props => props.theme.error};
  margin: 0 0.8rem;
  margin-bottom: 0.8rem;
`;

export const StyledTextArea = styled(StyledInput).attrs({
  as: "textarea"
})`
  resize: none;
  height: ${props => 2.2 * (props.rows as number)}rem;
  padding-top: 2rem;
  & + label {
    background-color: ${props => props.theme.txtBg2};
    padding: 0.4rem;
    border-radius: 5px;
    top: 3rem;
  }
  &:focus,
  &:valid {
    ${textareaActivated};
  }
`;

export const StyledSelect = styled(BaseSelect)`
  /* ${baseStyle} */
  font-family: Roboto, Arial;
  .react-select__control{
    ${baseStyle}
  }

`;

export const SelectLabel = styled.label`
  font-family: Roboto, Arial;
  font-size: 1.8rem;
  color: ${props => props.theme.gray2};
  text-indent: 0.8rem;
  margin-bottom: 0.7rem;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5rem;
  user-select: none;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
  z-index: 5;
  color: ${props => props.theme.primary};
  font-size: 1.2rem;
`;
