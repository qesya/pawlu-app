import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";
import { IIconProps } from "../iconTypes";

const ShoppingBagSolidIcon = ({
  fill = "#FFCA4E",
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
      fill={fill}
      fillRule="evenodd"
      d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.864 1.679l-1.264 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.866-2.071l-1.264-12a1.875 1.875 0 0 0-1.864-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default memo(ShoppingBagSolidIcon);
