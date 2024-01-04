import Button from "libs/mui/Button";
import Dialog from "libs/mui/Dialog";
import DialogActions from "libs/mui/DialogActions";
import DialogContent from "libs/mui/DialogContent";
import DialogTitleXCloseButton from "libs/mui/DialogTitleXCloseButton";
import { useEffect, useRef, useState } from "react";
import LoadingContent from "./LoadingContent";
import Typography from "libs/mui/Typography";
import "./CameraContent.css";
import { useSnackbar } from "notistack";

function CameraContent({ open, onClose, onScreenshotCapture, setFile }) {
  const videoRef = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [screenshot, setScreenshot] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  let stream;

  useEffect(() => {
    async function startWebcam() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 400, height: 400 },
        });

        let video = videoRef.current;

        setLoading(false);
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      } catch (error) {
        enqueueSnackbar(error, { variant: "error" });
      }
    }

    if (open) {
      startWebcam();
    }

    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        onClose();
      }
    };
  }, [open]);

  const capture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/jpeg");

    setScreenshot(dataURL);
  };

  const captureSelected = () => {
    onScreenshotCapture(screenshot);
    setFile({ name: "Camera Photo", preview: screenshot });

    onClose();
  };
  const retry = () => {
    setScreenshot(null);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitleXCloseButton onClose={onClose}>
          Take Photo
        </DialogTitleXCloseButton>
        <LoadingContent Loading={isLoading}>
          {() => (
            <>
              <DialogContent>
                <div className="relative">
                  {!isLoading ? (
                    <video
                      className="rounded-lg "
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                    />
                  ) : (
                    <Typography>Camera Starting...</Typography>
                  )}
                  {screenshot && (
                    <div className="rounded-lg absolute top-0">
                      <img
                        src={screenshot}
                        alt="Captured"
                        className="roudned-lg"
                      />
                    </div>
                  )}
                </div>
              </DialogContent>
            </>
          )}
        </LoadingContent>
        <DialogActions className="justify-center">
          {screenshot && (
            <Button className="px-12 rounded" onClick={captureSelected}>
              Use
            </Button>
          )}
          <Button
            onClick={!screenshot ? capture : retry}
            color="primary"
            className="px-12 rounded"
          >
            {!screenshot ? "Capture" : "Retake"}
          </Button>
          <Button
            onClick={onClose}
            variant="soft"
            color="error"
            className="px-12 rounded"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CameraContent;
