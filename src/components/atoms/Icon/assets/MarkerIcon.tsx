import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const MarkerIcon = ({
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
      fill={fill}
      fillRule="evenodd"
      d="M6.264 9.863a.9.9 0 0 1 1.272 0L12 14.327l4.464-4.464a.9.9 0 0 1 1.272 1.273l-5.1 5.1a.9.9 0 0 1-1.272 0l-5.1-5.1a.9.9 0 0 1 0-1.273Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default memo(MarkerIcon);
