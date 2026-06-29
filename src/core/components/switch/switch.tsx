import { Children, isValidElement, ReactNode, ReactElement } from "react";

type SwitchProps = {
  fallback?: ReactNode;
  children: ReactNode;
};

type MatchElementProps = {
  when: any;
};

export default function Switch(props: SwitchProps): ReactNode {
  const childrenArray = Children.toArray(props.children);

  const match = childrenArray.find((child) => {
    return (
      isValidElement(child) &&
      (child as ReactElement<MatchElementProps>).props.when
    );
  });

  return match || props.fallback || undefined;
}
