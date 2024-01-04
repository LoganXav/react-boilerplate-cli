import { CircularProgress } from "@mui/material";
import { forwardRef } from "react";
import clsx from "clsx";
import "./LoadingIndicator.css";

const LoadingIndicator = forwardRef(
  /**
   *
   * @param {import("@mui/material").CircularProgressProps} props
   */
  function LoadingIndicator(props, ref) {
    return (
      <div
        ref={ref}
        {...props}
        className={clsx("LoadingIndicator", props.className)}
      >
        <CircularProgress thickness={1} size={60} />
      </div>
    );
  }
);

export default LoadingIndicator;
