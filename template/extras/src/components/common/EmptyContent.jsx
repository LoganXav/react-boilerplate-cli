import { Typography, Icon } from "@mui/material";
import clsx from "clsx";
import "./EmptyContent.css";

export function EmptyContent(props) {
  const { title, className, ...rest } = props;
  return (
    <div className={clsx("EmptyContent", className)} {...rest}>
      <Icon className={clsx("EmptyContent__icon")}>insert_drive_file</Icon>
      <Typography variant="h6" className={clsx("EmptyContent__text")}>
        No data
      </Typography>
    </div>
  );
}

export default EmptyContent;
