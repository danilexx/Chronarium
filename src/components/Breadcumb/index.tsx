import { Container, Part, Arrow } from "./styles";
import Link from "../Link";

interface PartModel {
  label: string;
  path: string;
}

interface Props {
  parts: PartModel[];
}

const Breadcumb: React.FC<Props> = ({ parts }) => {
  return (
    <Container>
      {parts.map(({ path, label }, index) => (
        <>
          <Link href={path} key={index}>
            <Part>{label}</Part>
          </Link>
          {index !== parts.length - 1 && <Arrow>-&gt;</Arrow>}
        </>
      ))}
    </Container>
  );
};

export default Breadcumb;
