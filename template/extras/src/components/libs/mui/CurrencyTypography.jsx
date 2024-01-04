import { forwardRef } from "react";
import { CurrencyEnum } from "constants/NumberConstants";
import currencyjs from "currency.js";
import Typography from "./Typography";

export const CurrencyTypography = forwardRef(
  /**
   *
   * @param {CurrencyTypographyProps} props
   */
  function CurrencyTypography(props, ref) {
    const { children, currency, ...rest } = props;
    const _currency = CurrencyEnum[currency || "NGN"] || CurrencyEnum.NGN;

    return (
      <Typography ref={ref} {...rest}>
        {currencyjs(children || 0, { symbol: _currency.symbol }).format()}
      </Typography>
    );
  }
);

CurrencyTypography.defaultProps = {
  currency: "NGN",
};

export default CurrencyTypography;

/**
 * @typedef {{currency: keyof typeof CurrencyEnum} & import("@mui/material").TypographyProps} CurrencyTypographyProps
 */
