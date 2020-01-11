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
import { PopupContainer } from "./styles";

interface IOptions {
  toggle: (nextValue?: boolean) => void;
  isActive: boolean;
}
interface IProps {
  children: any;
  isActive: boolean;
  onChange: (nextValue: boolean) => void;
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
const Popup: React.FC<IProps> = ({ children, isActive, onChange }) => {
  const { width, height } = useWindowSize();
  const ref = useRef<any>();
  const close = () => {
    onChange(false);
  };
  useClickAway(ref, close);
  useKey("Escape", close);
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
    isActive
  };

  return [Popup, options];
};

export default usePopup;
