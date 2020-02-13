export interface Options {
  toggle: (nextValue?: boolean) => void;
  isOn: boolean;
  show: (nextMessage: string) => void;
  message: string;
}
export interface Props {
  children?: React.ReactNode;
  isOn: boolean;
  toggle: (nextValue?: boolean) => void;
  important?: boolean;
  error?: boolean;
  closeOnPopupClick?: boolean;
}

export interface InfoProps {
  message: string;
  title: string;
  callback?: () => void;
}
export interface ErrorProps {
  message: string;
  title: string;
  callback?: () => void;
}

export interface FieldProps {
  message: string;
  title: string;
  callback?: (field: string) => void;
  fieldName: string;
  buttonText: string;
  isLoading: boolean;
  errorMessage: string;
}

interface Skill {
  name: string;
  description: string;
  icon: null | {
    url: string;
  };
  mana_cost: number;
  value: number;
  type: string;
}

export interface SelectSkillProps {
  callback?: (skill: Skill) => void;
  adventureId: number;
  selectedSkills?: number[];
}
export type PopupTypes =
  | "info"
  | "base"
  | "error"
  | "addFriend"
  | "field"
  | "selectSkill";
