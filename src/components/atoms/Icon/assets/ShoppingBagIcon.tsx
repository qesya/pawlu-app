import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const ShoppingBagIcon = ({
  fill = "#000000",
  width = 24,
  height = 24,
  testID,
  ...props
}: IIconProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    testID={testID}
    {...props}
  >
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.357-1.993 1.263 12c.07.665-.451 1.243-1.12 1.243H4.25a1.125 1.125 0 0 1-1.119-1.243l1.263-12A1.125 1.125 0 0 1 5.514 7.5h12.974c.575 0 1.058.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
    />
  </Svg>
);

export default memo(ShoppingBagIcon);
