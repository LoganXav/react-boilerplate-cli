import { MenuItem, TextField } from "@mui/material";

/**
 *
 * @param {SearchCustomersByTextFieldProps} props
 * @param {SearchStaffByTextFieldProps} props
 * @returns
 */
function SearchCustomersByTextField(props) {
  return (
    <TextField select {...props}>
      {Object.values(SearchClientByEnum).map((field, i) => (
        <MenuItem key={i} value={field} className="capitalize">
          {field}
        </MenuItem>
      ))}
    </TextField>
  );
}


export default SearchCustomersByTextField;

export const SearchClientByEnum = {
  DISPLAY_NAME: "displayName",
  EXTERNAL_ID: "externalId",
  MOBILE_NO: "mobile",
  STAFF_ID: "staffId",
  BVN: "bvn",
  ACCOUNT_NUMBER: "accountNo",
  EMAIL: "email",
};


/**
 * @typedef {import("@mui/material").TextFieldProps} SearchCustomersByTextFieldProps
 */
