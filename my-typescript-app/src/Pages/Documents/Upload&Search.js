import React, { useState } from "react";
import { SerachWithIcon } from "../../Components/Search";
import { AttachmentItem } from "../../Components/Attachment/AttachmentItem";
import { Typography } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const MAX_LENGTH = 5;
const MAX_FILE_SIZE = 5120;

export const UploadAndSeearchSection = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSize, setfileSize] = useState(0);

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
        alert("File type not supported, please attach different file");
        return;
      }
      if (event.target.files.length > 0 && selectedFiles.length) {
        selectedFiles.forEach((file) => {
          if (file[0].name === event.target.files[0].name) {
            alert("file already added");
            return;
          }
        });
      }

      if (
        selectedFiles.length > MAX_LENGTH - 1 &&
        event.target.files.length > 0
      ) {
        alert(`Cannot upload files more than ${MAX_LENGTH}`);
        return;
      }

      const fileSizeKiloBytes = fileSize / 1024;
      if (fileSizeKiloBytes > MAX_FILE_SIZE) {
        alert(`File size is greater than maximum limit ${MAX_FILE_SIZE}`);
        return;
      }
    }
    if (event.target.files.length > 0 && !isFileExist) {
      setSelectedFiles((previousFile) => [...previousFile, event.target.files]);
      let selectedFileSize = event.target.files[0].size;
      setfileSize(fileSize + selectedFileSize);
    }
  };

  const removeSelectedFile = (file) => {
    console.log("removeFile...");
    const acceptedFiles = [...selectedFiles];
    let removedFile = acceptedFiles.filter((t) => t[0].name === file.name);
    if (removedFile && removedFile.length > 0) {
      acceptedFiles.splice(acceptedFiles.indexOf(removedFile[0]), 1);
      setSelectedFiles(acceptedFiles);
    }
    let removedFileSize = file.size;
    setfileSize(fileSize - removedFileSize);
  }

  return (
    <>
      <section className="container p-8  max-w-4xl flex flex-row   flex-wrap justify-between items-center w-full">
        <button
          className="flex flex-row p-2.5 gap-4 my-4 w-full md:w-auto justify-center items-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:ring-blue-500 hover:border-blue-500"
          onClick={handleClick}
        >
          <FileUploadOutlinedIcon />
          <Typography>Upload Document</Typography>
          <input
            id="file-upload"
            type="file"
            hidden
            multiple
            className="input-field"
            onChange={(e) => {
              selectFiles(e);
            }}
          ></input>
        </button>
        <SerachWithIcon />
      </section>
      {selectedFiles && selectedFiles.length > 0 && (
        <div className="container  p-8   w-full max-w-4xl flex flex-grow">
          <div className="flex flex-col p-8  w-full justify-start items-start  bg-slate-300 ">
            <div className="flex flex-row gap-8 mb-12 ">
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
            </div>
            <button className="w-auto bg-teal-600 hover:bg-teal-900 p-2 px-4 rounded text-color-3-100">
                <Typography>submit</Typography>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
