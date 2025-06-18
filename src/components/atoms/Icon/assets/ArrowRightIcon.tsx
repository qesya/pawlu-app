import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const ArrowRightIcon = ({
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
      strokeWidth={2}
      d="M4 12h16m0 0-6-6m6 6-6 6"
    />
  </Svg>
);

export default memo(ArrowRightIcon);
