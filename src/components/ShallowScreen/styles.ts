import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const ShallowScreenContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  will-change: opacity;
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => (props.isActive ? 1 : 0)};
  transform: translateX(
    ${({ isActive, index }) =>
      isActive ? `-${parseInt(index, 10) * 100}%` : "0px"}
  );
  height: ${props => (props.isActive ? "fit-content" : "0")};
`;
