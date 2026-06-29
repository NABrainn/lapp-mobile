import { ReactNode } from "react";

type ForProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export default function For<T>({ items, renderItem }: ForProps<T>) {
  return items.map((item, index) => renderItem(item, index));
}
