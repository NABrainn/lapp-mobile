import { ReactNode } from "react";

type MatchProps<T> = {
  when: boolean | T;
  children: ReactNode | ((item: T) => ReactNode);
};

export default function Match<T>(props: MatchProps<T>): ReactNode {
  return <>{props.when && props.children}</>;
}
