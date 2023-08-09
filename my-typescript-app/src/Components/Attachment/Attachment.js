import React, { useState } from "react";
import {  
  Box,
  Paper
} from "@mui/material";
import { AttachmentItem } from "./AttachmentItem";
import addFileIcon from "../../Components/Images/AddFileIcon.png";

const MAX_LENGTH = 5;
const MAX_FILE_SIZE = 5120; // 5MB

const Attachment = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSize, setfileSize] = useState(0);
  const [isSectionCompleted, setIsComplete] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [severityType, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    let element = document.querySelector(".input-field");
    element.click();
  };

  const selectFiles = (event) => {
    let isFileExist = false;
    if (selectedFiles) {
      if (
        event.target.files.length > 0 &&
        event.target.files[0].type.includes("video")
      ) {
        setSeverity("warning");
        setAlertMessage(
          "File type not supported, please attach different file"
        );
        setOpen(true);
        return;
      }
      if (event.target.files.length > 0 && selectedFiles.length) {
        selectedFiles.forEach((file) => {
          if (file[0].name === event.target.files[0].name) {
            // file exist already
            isFileExist = true;
          }
        });
      }

      if (
        selectedFiles.length > MAX_LENGTH - 1 &&
        event.target.files.length > 0
      ) {
        setSeverity("warning");
        setAlertMessage(`Cannot upload files more than ${MAX_LENGTH}`);
        setOpen(true);
        return;
      }

      const fileSizeKiloBytes = fileSize / 1024;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        setSeverity("warning");
        setAlertMessage(
          `File size is greater than maximum limit ${MAX_FILE_SIZE}`
        );
        setOpen(true);
        return;
      }
    }
    if (event.target.files.length > 0 && !isFileExist) {
      setSelectedFiles((previousFile) => [...previousFile, event.target.files]);
      setSeverity("success");
      let fileName = event.target.files[0].name;
      setAlertMessage(`File ${fileName} has been added`);
      setOpen(true);
      let selectedFileSize = event.target.files[0].size;
      setfileSize(fileSize + selectedFileSize);
      setIsComplete(true);
    }
  };

  const removeSelectedFile = (file) => {
    console.log("removeFile...");
    const acceptedFiles = [...selectedFiles];
    let removedFile = acceptedFiles.filter((t) => t[0].name === file.name);
    if (removedFile && removedFile.length > 0) {
      acceptedFiles.splice(acceptedFiles.indexOf(removedFile[0]), 1);
      setSelectedFiles(acceptedFiles);
      setSeverity("info");
      setAlertMessage(`File ${file.name} has been removed`);
      setOpen(true);
    }
    let removedFileSize = file.size;
    setfileSize(fileSize - removedFileSize);
    if (acceptedFiles.length === 0) {
      setIsComplete(false);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <div className="flex flex-col">
          <div className="flex flex-row gap-8 mb-12">
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="flex flex-row gap-4">
                {selectedFiles.map((item, i) => {
                  return (
                    <AttachmentItem
                      item={item}
                      removeSelectedFile={removeSelectedFile}
                    />
                  );
                })}
              </div>
            )}
            <div className="h-24 w-20">
              <Paper elevation={0} onClick={handleClick}>
                <img src={addFileIcon} alt=""></img>
                <input
                  id="file-upload"
                  type="file"
                  className="input-field"
                  hidden
                  multiple
                  onChange={(e) => {
                    selectFiles(e);
                  }}
                ></input>
                <p>upload file</p>
              </Paper>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Attachment;
