import React, { useState } from "react";
import { SerachWithIcon } from "../../Components/Search";
import { AttachmentItem } from "../../Components/Attachment/AttachmentItem";
import { Typography } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { ProgressBar } from "../../Components/Progress";
import { readFile } from "../../Utils/FileReader";
import {
  createNewFileInRepository,
  uploadFiletoProject,
} from "../../Api/Services/ProjectsService";
const MAX_LENGTH = 5;
const MAX_FILE_SIZE = 5120;

export const UploadAndSeearchSection = ({ project }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSize, setfileSize] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileReadProgress, setFileReadProgress] = useState([]);

  const handleClick = (e) => {
    let element = document.querySelector(".input-field");
    element.value = null;
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
    const acceptedFiles = [...selectedFiles];
    let removedFile = acceptedFiles.filter((t) => t[0].name === file.name);
    if (removedFile && removedFile.length > 0) {
      acceptedFiles.splice(acceptedFiles.indexOf(removedFile[0]), 1);
      setSelectedFiles(acceptedFiles);
    }
    let removedFileSize = file.size;
    setfileSize(fileSize - removedFileSize);
  };

  const uploadFiles = () => {
    setUploading(true);
    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        console.log(file[0]);
        readFile(
          file[0],
          (data) => pushFileToGitlab(file, data),
          (progress) => updatefileReadProgress(i, progress)
        );
      }
    }
  };

  const updatefileReadProgress = (i, progress) => {
    const readprogressState = [...fileReadProgress];
    readprogressState[i] = progress;
    console.log("updating progress", i, progress);
    setFileReadProgress(readprogressState);
  };

  const pushFileToGitlab = async (file, data) => {
    console.log("pushing to gitlab");
    const content = {
      branch: "main",
      content: btoa(data),
      commit_message: "create a new file",
      encoding: "base64"
    };
   const res = await createNewFileInRepository(project.id, file[0].name, content);

   //const res = await uploadFiletoProject(project.id,file[0]);
    if(res.status !== "failed"){
      removeSelectedFile(file);      
    }
    setUploading(false);
    return;    
  };

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
            {!uploading && (
              <>
                <div className="flex flex-row gap-8 mb-12 ">
                  <div className="flex flex-row gap-4">
                    {selectedFiles.map((item, i) => {
                      return (
                        <AttachmentItem
                          item={item}
                          removeSelectedFile={removeSelectedFile}
                          key={`attchment_${i}`}
                        />
                      );
                    })}
                  </div>
                </div>
                <button
                  className="w-auto bg-teal-600 hover:bg-teal-900 p-2 px-4 rounded text-color-3-100"
                  onClick={uploadFiles}
                >
                  <Typography>submit</Typography>
                </button>
              </>
            )}
            {uploading && (
              <>
                {selectedFiles.map((item, i) => {
                  return (
                    <div
                      key={`attchment_${i}`}
                      className="flex flex-row flex-wrap md:flex-nowrap justify-start items-center w-full"
                    >
                      <p className="w-[40%] m-2">{item[0].name}</p>
                      <ProgressBar
                        progress={fileReadProgress[i]}
                        className="w-[60%] m-2"
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
