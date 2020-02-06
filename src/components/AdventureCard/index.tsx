import { useRouter } from "next/router";
import {
  Container,
  AdventureImageContainer,
  AdventureImage,
  PlayButton,
  AdventureInfo,
  Description,
  Title,
  AdventureExtraInfoContainer,
  IconSection,
  Icon,
  IconInfo,
  CreateAdventureContainer,
  Plus
} from "./styles";
import { AdventureModel } from "-/src/services/types";
import getSafeAdventureImage from "-/src/utils/getSafeAdventureImage";
import Link from "../Link";

interface Props {
  adventure?: AdventureModel;
}
const AdventureCard: React.FC<Props> = ({ adventure }) => {
  if (!adventure) {
    return (
      <Container>
        <AdventureImageContainer>
          <AdventureImage src="/images/adventure.jpg" />
          <PlayButton src="/icons/play.svg" />
        </AdventureImageContainer>
        <AdventureInfo>
          <Title>Medieval Madness, Chtullu Returns</Title>
          <Description>
            Ipsum lorem morbi sed viverra porttitor sodales. Facilisis ut quam
            in turpis a aliquet lorem sed egestas. Id pulvinar quam id eget
            faucibus. At sed ipsum elit.
          </Description>
        </AdventureInfo>
        <AdventureExtraInfoContainer>
          <IconSection>
            <Icon src="/icons/group.svg" />
            <IconInfo>17/20</IconInfo>
          </IconSection>
          <Icon src="/icons/key.svg" />
          <IconSection>
            <IconInfo>Chronos</IconInfo>
            <Icon src="/icons/box.svg" />
          </IconSection>
        </AdventureExtraInfoContainer>
      </Container>
    );
  }
  const image = getSafeAdventureImage(adventure);
  return (
    <Container>
      <AdventureImageContainer>
        <AdventureImage src={image} />
        <Link href={`/mastering/${adventure.id}/home`}>
          <PlayButton src="/icons/play.svg" />
        </Link>
      </AdventureImageContainer>
      <AdventureInfo>
        <Title>{adventure.name}</Title>
        <Description>{adventure.description}</Description>
      </AdventureInfo>
      <AdventureExtraInfoContainer>
        <IconSection>
          <Icon src="/icons/group.svg" />
          <IconInfo>0/{adventure.lobby?.maxPlayers}</IconInfo>
        </IconSection>
        {adventure.hasPassword && <Icon src="/icons/key.svg" />}
        <IconSection>
          <IconInfo>Chronos</IconInfo>
          <Icon src="/icons/box.svg" />
        </IconSection>
      </AdventureExtraInfoContainer>
    </Container>
  );
};

export default AdventureCard;
export const CreateAdventureCard = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/mastering/new");
  };
  return (
    <CreateAdventureContainer>
      <Plus onClick={handleClick} />
    </CreateAdventureContainer>
  );
};
export { Adventures } from "./styles";
