import styled, { css } from "-/src/utils/StyledComponents";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  justify-content: center;
  align-items: center;
`;

const activeStyles = css`
  opacity: 1;
  transform: scale(1.3);
`;
const nonActiveStyles = css`
  opacity: 0.6;
  transform: scale(1);
`;

export const Task = styled.div<{ active: boolean; completed: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 2rem;
  font-family: Roboto, Arial;
  color: ${props => props.theme.txtBg1};
  transition: all 0.5s ease-in-out;
  text-align: center;
  text-decoration: ${props => (props.completed ? "line-through" : "none")};
  margin: 1rem 0;
  ${props => (props.active ? activeStyles : nonActiveStyles)}
`;

export const Loader = styled.div<{ loading: boolean }>`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.loading ? 1 : 0)};
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(120%, -50%);
  z-index: 10;
`;
