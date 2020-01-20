import React, { useContext } from "react";
import { ClipLoader } from "react-spinners";
import { ThemeContext } from "styled-components";
import { Container, Task, Loader } from "./styles";

interface Task {
  label: string;
}

interface Props {
  tasks: Task[];
  activeTask: number;
}

const Tasker: React.FC<Props> = ({ tasks, activeTask }) => {
  // const [activeTask, setActiveTask] = React.useState(0);
  const { primary } = useContext(ThemeContext);
  return (
    <Container>
      {tasks.map((task, index) => (
        <Task
          key={index}
          completed={index < activeTask}
          active={index === activeTask}
        >
          {task.label}{" "}
          <Loader loading={index === activeTask}>
            <ClipLoader size={20} color={primary} loading />
          </Loader>
        </Task>
      ))}
    </Container>
  );
};

export default Tasker;
