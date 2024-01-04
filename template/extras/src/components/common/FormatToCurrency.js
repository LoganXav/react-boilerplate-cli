import React from "react";
import { NumericFormat } from "react-number-format";

const FormatToCurrency = React.forwardRef(function FormatToCurrency(
  props,
  ref
) {
  const { onChange, ...rest } = props;

  return (
    <NumericFormat
      {...rest}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="$"
    />
  );
});

export default FormatToCurrency;
