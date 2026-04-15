import { ColorPalette } from "@/constants/theme";
import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface LikeFilledIconProps extends SvgProps {
  size?: number;
  color?: string;
}
/** SVG path for the filled heart (used by `LikeFilledIcon` and animated like control). */
export const LIKE_FILLED_PATH_D =
  'm12 19.5-1.185-1.079c-4.21-3.817-6.99-6.343-6.99-9.425C3.826 6.47 5.805 4.5 8.322 4.5c1.423 0 2.788.662 3.679 1.7a4.916 4.916 0 0 1 3.678-1.7c2.518 0 4.496 1.97 4.496 4.496 0 3.082-2.779 5.607-6.989 9.425L12 19.5Z';

const LikeFilledIcon = (props: LikeFilledIconProps) => (
  <Svg
    width={props.size || 24}
    height={props.size || 24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || ColorPalette.ActionActiveTextMain}
      d={LIKE_FILLED_PATH_D}
    />
  </Svg>
)
export { LikeFilledIcon };
