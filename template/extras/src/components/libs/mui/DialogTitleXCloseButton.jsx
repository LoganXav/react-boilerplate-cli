import DialogTitle from "./DialogTitle";
import IconButton from "./IconButton";
import Icon from "./Icon";
import { styled } from "@mui/material";

const DialogTitleXCloseButton = styled(
  /**
   *
   * @param {DialogTitleXCloseButtonProps} props
   */
  function DialogTitleXCloseButton(props) {
    const { children, onClose, ...restProps } = props;
    return (
      <DialogTitle {...restProps}>
        {children}
        {onClose ? (
          <IconButton
            variant="soft"
            color="primary"
            rounded="default"
            aria-label="close"
            onClick={onClose}
          >
            <Icon>close</Icon>
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
)(() => ({
  "& .MuiIconButton-root": {
    position: "absolute",
    top: "12px",
    right: "12px",
  },
}));

export default DialogTitleXCloseButton;

/**
 * @typedef {{onClose: Function} & import("@mui/material").DialogTitleProps} DialogTitleXCloseButtonProps
 */
