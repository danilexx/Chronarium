import React from "react";
import styled, { css } from "-/src/utils/StyledComponents";

export const SizeableContainerWrapper = styled.div<{ size: number }>`
  background-color: ${props => props.theme.bg2};
  width: fit-content;
  transition: height 0.5s ease-in-out 0.2s;
  will-change: height;
  height: ${props => props.size}px;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  box-shadow: 0 4px 0 ${props => props.theme.primary};
  margin-bottom: 4px;
  padding: 1rem 3rem;
  @media screen and (max-width: 700px) {
    margin: 0 auto;
  }
  position: relative;
  --form-width: 30rem;
  width: var(--form-width);
  overflow: hidden;
  @media screen and (max-width: 500px) {
    --form-width: calc(100vw - 15rem);
    padding: 3rem 4rem;
  }
  box-sizing: content-box;
`;

interface SizeableContainerProps {
  index: number;
  size: number;
  children: React.ReactNode;
  items: number;
}

export const Slider = styled.div<{ index: number }>`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  will-change: transform;
  transition: transform 0.2s ease-in-out;
`;

export const SizeableContainer: React.FC<SizeableContainerProps> = ({
  index,
  size,
  items,
  children
}) => {
  const ref = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.transform = `translateX(calc(calc(var(--form-width) * -${index}) - ${index}0rem))`;
    }
  }, [index, items]);
  return (
    <SizeableContainerWrapper size={size}>
      {/* @ts-ignore */}
      <Slider ref={ref as any} index={index}>
        {children}
      </Slider>
    </SizeableContainerWrapper>
  );
};

export const InnerForm = styled.form`
  flex: 1;
`;

export const FormHeader = styled.h1`
  font-family: "Trade Winds";
  color: ${props => props.theme.primary};
  font-size: 4rem;
  width: 100%;
  text-align: center;
  letter-spacing: 0.22rem;
  margin: 1rem 0;
  margin-bottom: 1rem;
  line-height: 100%;
  @media screen and (max-width: 600px) {
    font-size: 3.5rem;
  }
`;

export const MainForm = styled.div<{ index: number }>`
  width: var(--form-width);
  height: fit-content;
  padding: 0;
  transition: transform 0.2s ease-in-out;
  will-change: transform;
  margin-right: 10rem;
`;
