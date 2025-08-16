import React from "react";
import styles from "./icon.module.css";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  neon?: boolean;
}

export const CloseIcon: React.FC<IconProps> = ({ color, neon, className, ...props }) => (
  <svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 20 20"
    fill="none"
    stroke={color || "currentColor"}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={[
      className,
      neon ? styles["halo-icon-neon"] : undefined
    ].filter(Boolean).join(" ")}
    {...props}
  >
    <line x1="6" y1="6" x2="14" y2="14" />
    <line x1="14" y1="6" x2="6" y2="14" />
  </svg>
);

export default CloseIcon;
