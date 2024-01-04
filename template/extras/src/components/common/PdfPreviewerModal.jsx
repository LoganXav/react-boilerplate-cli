import React from "react";
import { Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button, Dialog, Icon } from "@mui/material";
import DialogContent from "libs/mui/DialogContent";
import { downloadFile } from "utils/FileUtils";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import DialogTitleXCloseButton from "libs/mui/DialogTitleXCloseButton";

/**
 *
 * @param {string} fileUrl
 * @returns
 */
export default function PdfPreviewerModal({
  onClose,
  fileUrl,
  isDownload,
  ...rest
}) {
  return (
    <Dialog {...rest}>
      <DialogTitleXCloseButton onClose={onClose} />
      <DialogContent className="mt-10">
        <div className="h-full overflow-x-auto">
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPlugin]} />
          {isDownload && (
            <div className="flex justify-center mt-5">
              <Button
                onClick={async () => {
                  const blob = new Blob([fileUrl]);
                  downloadFile(
                    blob,
                    `${rest?.title?.split(" ")?.join("-")}-${"file.pdf"}`
                  );
                }}
                endIcon={<Icon>download</Icon>}
              >
                Download
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
