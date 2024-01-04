import { MenuItem, TextField } from "@mui/material";

/**
 *
 * @param {findCustomersByTextField} props
 * @param {SearchStaffByTextFieldProps} props
 * @returns
 */
function FindCustomersByTextField(props) {
  return (
    <TextField select {...props}>
      {Object.values(FindClientByEnum).map((field, i) => (
        <MenuItem key={i} value={field} className="capitalize">
          {field}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default FindCustomersByTextField;

export const FindClientByEnum = {
  MOBILE_NO: "mobile_no",
  BVN: "bvn",
  EMAIL: "email_address",
};

/**
 * @typedef {import("@mui/material").TextFieldProps} findCustomersByTextField
 */
