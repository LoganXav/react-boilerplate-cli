import { Modal } from "@mui/material";
import clsx from "clsx";
import LoadingIndicator from "./LoadingIndicator";
import "./LoadingModal.css";

/**
 *
 * @param {LoadingModalProps} props
 */
export function LoadingModal(props) {
  const { className, ...restProps } = props;

  return (
    <Modal className={clsx("LoadingModal", className)} {...restProps}>
      <LoadingIndicator />
    </Modal>
  );
}

export default LoadingModal;

/**
 * @typedef {{
 * } & import("@mui/material").ModalProps} LoadingModalProps
 */
