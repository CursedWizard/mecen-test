import { ColorPalette } from "@/constants/theme";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface SendIconProps extends SvgProps {
  size?: number;
  color?: string;
}

const SendIcon = (props: SendIconProps) => (
  <Svg
    width={props.size || 30}
    height={props.size || 30}
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <Path
      fill={props.color || ColorPalette.PrimaryButtonBackgroundMain}
      d="M7.452 6.643c-1.274-.553-2.53.817-1.87 2.04l2.537 4.713c.161.304.461.505.802.55l6.445.805c.125.014.22.12.22.245s-.095.23-.22.245l-6.445.806c-.34.044-.64.25-.802.55l-2.538 4.72c-.66 1.223.597 2.593 1.871 2.04l16.183-7.013c1.176-.51 1.176-2.18 0-2.688L7.452 6.643Z"
    />
  </Svg>
)
export { SendIcon };
