import styled from "-/src/utils/StyledComponents";

export const Container = styled.div`
  --width: 30rem;
  width: var(--width);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bg2};
  border-radius: 5px;
  box-shadow: 0 4px 0 ${props => props.theme.primary};
  transition: transform 0.2s ease-in-out;
  will-change: transform;
  height: fit-content;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const Adventures = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;
export const AdventureImageContainer = styled.div`
  flex: 1;
  position: relative;
  --padding: 1rem;
  padding: var(--padding);
`;
export const AdventureImage = styled.img`
  display: block;
  --totalPadding: calc(var(--padding) * 2);
  /* 1:1 image */
  --totalSpace: calc(var(--width) - var(--totalPadding));
  width: var(--totalSpace);
  height: calc(var(--totalSpace) / 1.3);
  flex: 1;
  border-radius: 5px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const PlayButton = styled.img`
  background-color: ${props => props.theme.primary};
  padding: 1.25rem;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  will-change: opacity;
  &:hover {
    opacity: 0.8;
  }
`;
export const AdventureInfo = styled.div`
  padding: 0rem 2rem;
  border-radius: 5px;
  width: 100%;
`;
export const Title = styled.h3`
  font-size: 2.5rem;
  margin: 0.5rem 0;
  color: ${props => props.theme.gray2};
  font-family: Roboto, Arial;
  width: 100%;
  line-break: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 3rem;
  padding: 0;
`;
export const Description = styled.p`
  display: -webkit-box;
  color: ${props => props.theme.gray1};
  font-family: Roboto, Arial;
  width: 100%;
  font-size: 1.5rem;
  text-align: justify;
  letter-spacing: 0.08rem;
  word-break: break-all;
  -webkit-line-clamp: 4;
  overflow: hidden;
  -webkit-box-orient: vertical;
`;

export const AdventureExtraInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 0.8rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const Icon = styled.img``;

export const IconSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const IconInfo = styled.p`
  color: ${props => props.theme.txtBg2};
  font-size: 1.2rem;
  margin: 0 0.8rem;
  font-family: Roboto, Arial;
`;

export const CreateAdventureContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
  height: auto;
  padding: 2rem;
`;
export const Plus = styled.img.attrs({ src: "/icons/plus.svg" })`
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  will-change: opacity;
  &:hover {
    opacity: 0.8;
  }
`;

export const EmptyMessage = styled.h1`
  font-size: 3rem;
  font-family: Roboto, Arial;
  color: ${props => props.theme.txtBg2};
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  text-align: center;
  button {
    width: auto;
    flex: 0;
  }
`;
