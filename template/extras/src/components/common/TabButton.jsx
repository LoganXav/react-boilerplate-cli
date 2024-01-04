import clsx from "clsx";
import ButtonBase from "libs/mui/ButtonBase";
import Typography from "libs/mui/Typography";

/**
 *
 * @param {TabButtonProps} props
 * @returns
 */
function TabButton(props) {
  const { active, label, value, className, ...restProps } = props;

  return (
    <ButtonBase
      {...restProps}
      className={clsx(
        "p-3 rounded-lg",
        active
          ? "bg-primary-main text-primary-contrastText"
          : "outline outline-1 outline-gray-200",
        className
      )}
    >
      <Typography variant="body2">
        {label}
        <span
          className={clsx(
            "ml-2",
            active ? "text-white text-opacity-50" : "text-text-secondary"
          )}
        >
          {value}
        </span>
      </Typography>
    </ButtonBase>
  );
}

export default TabButton;

/**
 * @typedef {{active: boolean, label: string, value: number} & import("@mui/material").ButtonBaseProps} TabButtonProps
 */
