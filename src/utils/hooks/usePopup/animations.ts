export const duration = 400;

export const defaultStyles = {
  transition: `${duration}ms ease-in-out`,
  transitionProperty: "opacity, transform",
  opacity: 0,
  transform: "translate(-50%, -20%)"
};

export const transitionStyles: any = {
  entering: { opacity: 1, transform: "translate(-50%, -50%)" },
  entered: { opacity: 1, transform: "translate(-50%, -50%)" }
};
