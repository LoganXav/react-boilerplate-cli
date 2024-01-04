import { Tooltip, Icon } from "@mui/material";
import clsx from "clsx";

/**
 *
 * @param {HelpTooltipLabelProps} props
 * @returns
 */
function HelpTooltipLabel(props) {
  const { children, label, className } = props;
  return (
    <span className="inline-flex items-center">
      {children || label}
      <Tooltip
        {...props}
        className={clsx("ml-1 pointer-events-auto", className)}
      >
        <Icon style={{ fontSize: 14 }} className="text-primary-main">
          help
        </Icon>
      </Tooltip>
    </span>
  );
}

export default HelpTooltipLabel;

/**
 * @typedef {{
 * label?: string;
 * children?: any;
 * } & Omit<import("@mui/material").TooltipProps, "children" } HelpTooltipLabelProps
 */
