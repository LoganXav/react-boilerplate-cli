import React, { useState } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import {
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Icon,
  IconButton,
  Tooltip,
} from "@mui/material";
import PdfPreviewerModal from "./PdfPreviewerModal";
import { Lightbox } from "react-modal-image";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { DocumentTypeEnum } from "constants/AssetConstants";

/**
 *
 * @param {title} string
 * @param {url} string
 *  @param {type} "pdf" | "image"
 * @returns
 */
export default function FilePreviewCard({ title, url, type }) {
  const [previewData, setPreviewData] = useState(false);
  return (
    <div className="m-3 relative">
      <div className="absolute top-1 z-10 right-1 ">
        <div className="bg-gray-50 rounded-md">
          <Tooltip title="Download">
            <a href={url} download>
              <IconButton>
                <Icon>download</Icon>
              </IconButton>
            </a>
          </Tooltip>

          <Tooltip title="Preview">
            <IconButton onClick={() => setPreviewData(true)}>
              <Icon>visibility</Icon>
            </IconButton>
          </Tooltip>

          <Chip size="small" label={title} className="p-2" />
        </div>
      </div>
      <Card className="h-[500px]">
        <CardActionArea>
          {DocumentTypeEnum.PDF.includes(type) && (
            <div className="h-[500px] overflow-x-auto">
              <FilePreviewCardPDF key={url} dataUrl={url} />
              {previewData && (
                <PdfPreviewerModal
                  open={previewData}
                  title={title}
                  fileUrl={url}
                  fullScreen
                  onClose={() => setPreviewData(false)}
                />
              )}
            </div>
          )}

          {DocumentTypeEnum.IMG.includes(type) && (
            <>
              <CardMedia
                component="img"
                className="w-full h-[500px] object-cover"
                image={url}
                alt={title}
              />
              {previewData && (
                <Lightbox
                  alt={title}
                  medium={url}
                  large={url}
                  onClose={() => setPreviewData(false)}
                />
              )}
            </>
          )}
        </CardActionArea>
      </Card>
    </div>
  );
}

FilePreviewCard.defaultProps = {
  type: "image",
};

function FilePreviewCardPDF({ dataUrl }) {
  return (
    <>
      {dataUrl && (
        <Viewer
          key={dataUrl}
          fileUrl={dataUrl}
          plugins={[defaultLayoutPlugin]}
        />
      )}
    </>
  );
}
