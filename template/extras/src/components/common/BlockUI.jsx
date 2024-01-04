import clsx from "clsx";
import "./BlockUI.css";
import { forwardRef } from "react";

const BlockUI = forwardRef(
  /**
   *
   * @param {BlockUIProps} props
   * @returns
   */
  function BlockUI(props, ref) {
    const {
      blocking,
      blockingUI,
      fullHeight,
      className,
      children,
      Component,
      Overlay,
      OverlayProps,
      renderOverlay,
      mountOverlay,
      ...restProps
    } = props;

    return (
      <Component
        ref={ref}
        className={clsx(
          "BlockUI",
          className,
          fullHeight && "BlockUI--fullHeight"
        )}
        {...restProps}
      >
        {children}
        {blocking || mountOverlay ? renderOverlay(blockingUI, props) : null}
      </Component>
    );
  }
);

BlockUI.defaultProps = {
  Component: "div",
  Overlay: "div",
  renderOverlay,
};

export default BlockUI;

/**
 *
 * @param {BlockUIProps} props
 */
function renderOverlay(blockingUI, props) {
  const Overlay = props.Overlay;
  return (
    <Overlay
      {...props.OverlayProps}
      className={clsx(
        "BlockUI-overlay",
        props.OverlayProps?.className,
        props.fullHeight && "BlockUI-overlay--fullHeight",
        props.mountOverlay && !props.blocking && "hidden"
      )}
    >
      {blockingUI}
    </Overlay>
  );
}

/**
 * @typedef {{
 * mountOverlay: boolean;
 * blocking: boolean;
 * fullHeight: boolean;
 * blockingUI: boolean;
 * Overlay: any;
 * OverlayProps: any;
 * renderOverlay: (blockingUI: any, props: BlockUIProps) => import("react").ReactNode
 * } & import("react").ComponentPropsWithoutRef<'div'>} BlockUIProps
 */
