import React from "react";

export default function FlexContainer({
  classes,
  children,
}: {
  classes: string;
  children: Array<JSX.Element>;
}) {
  return <div className={classes}>{children}</div>;
}
