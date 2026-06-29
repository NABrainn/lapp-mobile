import { ReactNode } from "react";

type ShowProps<T> = {
  when: T | undefined;
  fallback?: ReactNode;
  children: ReactNode;
};

export default function Show<T>({ when, fallback, children }: ShowProps<T>) {
  if (!when) {
    return fallback ?? undefined;
  }
  return children;
}
