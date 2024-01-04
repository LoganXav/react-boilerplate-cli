import InputAdornment from "libs/mui/InputAdornment";
import TextField from "libs/mui/TextField";
import { forwardRef } from "react";
import { Iconly } from "react-iconly";

const SearchTextField = forwardRef(
  /**
   *
   * @param {import("@mui/material").TextFieldProps} props
   * @param {any} ref
   */
  function SearchTextField(props, ref) {
    const { InputProps, ...rest } = props;

    return (
      <TextField
        ref={ref}
        label="Search"
        InputProps={{
          ...InputProps,
          ...(!InputProps?.startAdornment && {
            startAdornment: (
              <InputAdornment position="start">
                <Iconly name="Search" set="two-tone" />
              </InputAdornment>
            ),
          }),
        }}
        {...rest}
      />
    );
  }
);

SearchTextField.defaultProps = {};

export default SearchTextField;
