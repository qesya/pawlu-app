import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const SearchIcon = ({
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
    testID={testID}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
    />
  </Svg>
);

export default memo(SearchIcon);
