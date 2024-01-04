import React, { useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import { Dialog, FormControl, FormHelperText, Tooltip } from "@mui/material";
import IconButton from "libs/mui/IconButton";
import Icon from "libs/mui/Icon";
import Typography from "libs/mui/Typography";
import DialogContent from "libs/mui/DialogContent";
import FilePreviewCard from "./FilePreviewCard";
import useToggle from "hooks/useToggle";
import LoadingButton from "libs/mui/LoadingButton";
import CoreDocumentApi from "apis/CoreDocumentApi";
import LoadingContent from "./LoadingContent";
import CameraContent from "./CameraContent";
import DialogTitleXCloseButton from "libs/mui/DialogTitleXCloseButton";
import Button from "libs/mui/Button";
import { getBase64FileType } from "utils/FileUtils";

/**
 *
 * @param {FileUploadInputProps} props
 */
export function FileUpload(props) {
  const {
    className,
    error,
    label,
    onDropAccepted,
    helperText,
    defaultValue,
    variant,
    disabled,
    clientIdentifierId,
    attachmentId,
    onPhotoTaken,
    takePhoto,
    ...rest
  } = props;
  const [file, setFile] = useState();
  const [isPreview, togglePreview] = useToggle();
  const [isTakePhoto, setIsTakePhoto] = useState(false);

  const getClientDocumentIdentifierQuery =
    CoreDocumentApi.useGetClientDocumentIdentifierQuery(
      { clientIdentifierId, attachmentId },
      { skip: !attachmentId && !clientIdentifierId }
    );

  const { enqueueSnackbar } = useSnackbar();

  const dropzone = useDropzone({
    ...rest,
    disabled,
    onDropAccepted(fileAccepted) {
      const acceptedFile = fileAccepted.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      onDropAccepted(acceptedFile?.[0]);
      setFile(acceptedFile?.[0]);
    },
    onDropRejected(fileRejections) {
      fileRejections.forEach((rejection) => {
        enqueueSnackbar(
          `"${rejection.file.name}" - ${rejection.errors[0].message}`,
          { variant: "error" }
        );
      });
    },
  });

  const title = file?.name;
  const url =
    file?.preview ||
    defaultValue ||
    getClientDocumentIdentifierQuery?.data?.data?.resourceIdentifier;
  const type = file?.type || getBase64FileType(url) || "";

  return (
    <FormControl className={clsx(className)} error={error} fullWidth>
      <div className="relative">
        {variant === "input" && (
          <div className="flex flex-row justify-between items-center rounded-2xl  bg-[#f0f0f0] p-3">
            <Typography className="whitespace-nowrap text-black overflow-hidden select-none">
              {title || label}
            </Typography>

            <div className="flex items-center gap-2">
              <Tooltip title="Preview">
                <IconButton
                  onClick={togglePreview}
                  size="small"
                  color="info"
                  variant="soft"
                >
                  <Icon size={18}>visibility</Icon>
                </IconButton>
              </Tooltip>
              <div {...dropzone.getRootProps()}>
                <input {...dropzone.getInputProps()} />
                <LoadingButton
                  className="rounded-4 w-[100px]"
                  fullWidth
                  variant="soft"
                  color="info"
                  disabled={disabled}
                  size="small"
                >
                  Upload
                </LoadingButton>
              </div>
            </div>
          </div>
        )}

        {variant === "card" && (
          <div className="rounded-2xl  bg-primary-lighter flex justify-center p-6 z-50">
            <div
              className={clsx(
                "overflow-hidden  flex flex-col rounded-2xl justify-center items-center gap-2 w-full bg-gray-50 py-12 px-4 "
              )}
            >
              <Typography
                noWrap
                className="whitespace-nowrap text-black  select-none"
              >
                {title || label}
              </Typography>
              <div {...dropzone.getRootProps()}>
                <input {...dropzone.getInputProps()} />
                <LoadingButton
                  className="rounded-4 w-[100px]"
                  fullWidth
                  variant="soft"
                  color="info"
                  disabled={disabled}
                  size="small"
                >
                  Upload
                </LoadingButton>
              </div>
              {takePhoto && (
                <>
                  or
                  <Button
                    className="rounded-4 w-[100px]"
                    fullWidth
                    variant="soft"
                    color="info"
                    disabled={disabled}
                    size="small"
                    onClick={() => {
                      setIsTakePhoto(true);
                    }}
                  >
                    Take Photo
                  </Button>
                </>
              )}
              <div className="flex gap-2">
                <Tooltip title="Preview">
                  <IconButton
                    onClick={togglePreview}
                    size="small"
                    color="info"
                    variant="soft"
                  >
                    <Icon size={18}>visibility</Icon>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        )}

        <FormHelperText className="absolute bottom-[-1.5rem]" error={error}>
          {helperText}
        </FormHelperText>
      </div>
      {isTakePhoto ? (
        <CameraContent
          open={isTakePhoto}
          onClose={() => setIsTakePhoto(false)}
          onScreenshotCapture={onPhotoTaken}
          setFile={setFile}
        />
      ) : null}
      {isPreview && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={isPreview}
          onClose={togglePreview}
        >
          <DialogContent>
            <LoadingContent
              onRetry={getClientDocumentIdentifierQuery.refetch}
              loading={getClientDocumentIdentifierQuery.isLoading}
              error={getClientDocumentIdentifierQuery.isError}
            >
              <FilePreviewCard title={title} url={url} type={type} />
            </LoadingContent>
          </DialogContent>
        </Dialog>
      )}
    </FormControl>
  );
}

export default FileUpload;

FileUpload.defaultProps = {
  multiple: false,
  maxFiles: 1,
  minSize: 50,
  label: "Upload File",
  maxSize: 1024 * 5000,
  variant: "card",
};

/**
 * @typedef {{
 * label: string;
 * error: string;
 * helperText: string;
 * defaultValue: string;
 * className: string;
 * variant: "input" | "card";
 * clientIdentifierId: string;
 * attachmentId: string;
 * endIcon: import("react").ReactElement | string;
 * } & import('react-dropzone').DropzoneOptions} FileUploadInputProps
 */
