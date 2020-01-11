import {
  useToggle,
  useTimeoutFn,
  useWindowSize,
  useClickAway,
  useKey
} from "react-use";
import React, { useRef, useCallback } from "react";
import { Portal } from "react-portal";
import { Transition } from "react-transition-group";
import { PopupContainer, PopupBackground } from "./styles";

interface IOptions {
  toggle: (nextValue?: boolean) => void;
  isActive: boolean;
  onChange: (nextValue?: boolean) => void;
  test: any;
}
interface IProps {
  children: any;
  isActive: boolean;
  onChange: (nextValue?: boolean) => void;
  important?: boolean;
}
interface IPopup {
  (props: IProps): null | React.ReactNode;
}

const defaultStyles = {
  transition: `400ms ease-in-out`,
  transitionProperty: "opacity, transform",
  opacity: 0,
  transform: "translate(-50%, -20%)"
};

const transitionStyles: any = {
  entering: { opacity: 1, transform: "translate(-50%, -50%)" },
  entered: { opacity: 1, transform: "translate(-50%, -50%)" }
};
const Popup: React.FC<IProps> = ({
  children,
  isActive,
  onChange,
  important = false
}) => {
  const { width, height } = useWindowSize();
  const ref = useRef<any>();
  const close = () => {
    // popup wont close on esc or click away
    if (important) return;
    onChange(false);
  };
  useClickAway(ref, close);
  useKey("Escape", close);
  const pop = (state: any) => (
    <PopupContainer
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
      in={isActive}
      onEnter={node => node.offsetHeight}
      mountOnEnter
      unmountOnExit
      timeout={400}
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

const usePopup = (): [React.FC<IProps>, IOptions] => {
  const [isActive, toggle] = useToggle(false);
  // React.useEffect(() => {
  //   clearTimeout(timeout.current);
  //   if (isActive) {
  //     console.log("entrando");
  //     toggleIsVisible(true);
  //   } else {
  //     console.log("saindo");
  //     timeout.current = setTimeout(() => {
  //       toggleIsVisible(false);
  //       console.log("sai");
  //     }, 500);
  //   }
  // }, [isActive]);
  const options: IOptions = {
    toggle,
    isActive,
    onChange: toggle,
    test: () => {
      if (!isActive) {
        toggle();
      }
    }
  };

  return [Popup, options];
};

export default usePopup;
