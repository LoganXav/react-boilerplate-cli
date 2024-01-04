import React from "react";

import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { FormControl, FormHelperText } from "@mui/material";
import Button from "libs/mui/Button";
import IconButton from "libs/mui/IconButton";
import Icon from "libs/mui/Icon";
import Typography from "libs/mui/Typography";
import { Delete } from "react-iconly";
import { resolvedTailwindConfig } from "constants/Global";

/**
 *
 * @param {FileUploadInputProps} props
 */
export function FileUploadInput(props) {
  const {
    className,
    error,
    label,
    onDropAccepted,
    onDropRejected,
    helperText,
    disabled,
    ...rest
  } = props;

  const { enqueueSnackbar } = useSnackbar();

  const dropzone = useDropzone({
    ...rest,
    disabled,
    onDropAccepted(fileAccepted) {
      onDropAccepted(fileAccepted);
    },
    onDropRejected(fileRejections) {
      if (onDropRejected) {
        onDropRejected(...arguments);
      }
      fileRejections.forEach((rejection) => {
        onDropAccepted([], {});
        enqueueSnackbar(
          `"${rejection.file.name}" - ${rejection.errors[0].message}`,
          { variant: "error" }
        );
      });
    },
  });

  return (
    <FormControl className={clsx(className)} error={error} fullWidth>
      <div className="relative">
        <div className="flex flex-row justify-between items-center rounded-2xl  bg-[#f0f0f0] p-3">
          <Typography className="whitespace-nowrap text-black overflow-hidden select-none">
            {label}
          </Typography>

          <div className="flex items-center gap-2">
            <IconButton size="small" color="info" variant="soft">
              <Icon size={18}>visibility</Icon>
            </IconButton>
            <IconButton size="small" color="error" variant="soft">
              <Delete
                size={18}
                primaryColor={
                  resolvedTailwindConfig.theme.backgroundColor.error.main
                }
                secondaryColor={
                  resolvedTailwindConfig.theme.backgroundColor.error.lighter
                }
              />
            </IconButton>
            <div {...dropzone.getRootProps()}>
              <input {...dropzone.getInputProps()} />
              <Button
                className="rounded-4"
                variant="soft"
                color="info"
                disabled={disabled}
                size="small"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
        <FormHelperText className="absolute bottom-0" error={error}>
          {helperText}
        </FormHelperText>
      </div>
    </FormControl>
  );
}

export default FileUploadInput;

FileUploadInput.defaultProps = {
  multiple: true,
  maxFiles: 1,
  minSize: 50,
  label: "Upload File",
  maxSize: 1024 * 5000,
};

/**
 * @typedef {{
 * label: string;
 * error: string;
 * helperText: string;
 * className: string;
 * endIcon: import("react").ReactElement | string;
 * } & import('react-dropzone').DropzoneOptions} FileUploadInputProps
 */
