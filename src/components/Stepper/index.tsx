import { Container, Step } from "./styles";

interface Step {
  iconUrl: string;
  name: string;
  index: number;
}

interface Props {
  steps: Step[];
  activeIndex: number;
  action: (newIndex: number) => void;
}

const Stepper: React.FC<Props> = ({ steps, activeIndex, action }) => {
  const handleAction = (index: any) => action(index);
  return (
    <Container>
      {steps.map(({ iconUrl, name, index }) => (
        <Step
          key={index}
          src={iconUrl}
          onClick={() => {
            handleAction(index);
          }}
          active={index <= activeIndex}
        />
      ))}
    </Container>
  );
};

export default Stepper;
