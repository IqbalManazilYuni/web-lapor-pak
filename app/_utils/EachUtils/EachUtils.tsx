import { Children, ReactNode } from "react";

interface EachUtilsProps<T> {
  of: T[];
  render: (item: T, index: number) => ReactNode;
}

const EachUtils = <T,>({ of, render }: EachUtilsProps<T>): ReactNode => {
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default EachUtils;
