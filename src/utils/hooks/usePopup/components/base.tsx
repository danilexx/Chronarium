import { useWindowSize, useClickAway, useKey } from "react-use";
import { useRef } from "react";
import { Transition } from "react-transition-group";
import { Portal } from "react-portal";
import { PopupContainer, PopupBackground } from "../styles";
import { Props } from "../types";
import { defaultStyles, transitionStyles, duration } from "../animations";

const Popup: React.FC<Props> = ({
  children,
  isOn,
  toggle,
  important = false,
  error = false
}) => {
  const { width, height } = useWindowSize();
  const ref = useRef<any>();
  const close = () => {
    // popup wont close on esc or click away
    if (important) return;
    toggle(false);
  };
  useClickAway(ref, close);
  useKey("Escape", close);
  const pop = (state: any) => (
    <PopupContainer
      error={error}
      ref={ref}
      style={{
        top: Math.round(height / 2),
        left: Math.round(width / 2),
        ...defaultStyles,
        ...transitionStyles[state]
      }}
    >
      {children}
    </PopupContainer>
  );
  return (
    <Transition
      in={isOn}
      onEnter={node => node.offsetHeight}
      mountOnEnter
      unmountOnExit
      timeout={duration}
    >
      {(state: any) => (
        <Portal>
          {important ? (
            <PopupBackground>{pop(state)}</PopupBackground>
          ) : (
            pop(state)
          )}
        </Portal>
      )}
    </Transition>
  );
};

export default Popup;
