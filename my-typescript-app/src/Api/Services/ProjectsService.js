import CryptoJS from "crypto-js";
import { getAPI, postAPI, postFormAPI, deleteAPI } from "../Config/ApiMethods";
import {
  GetUserProjectsEndpoint,
  GetGroupAssociatedProjectsEndpoint,
  GetCreateNewFileInRepositoryEndpoint,
  GetProjectFilesListEndpoint,
  GetUploadFileToProjectEndpoint,
} from "../Config/ApiContants";

import { GetCurrentUser } from "./UserService";

function getFileSuffix(encryptionKey) {
  var hash = CryptoJS.SHA256(encryptionKey);
  return hash.toString(CryptoJS.enc.Hex);
}

function getFilePrefix(fileName) {
  return btoa(fileName).replace("/", "-").replace("+", "_").replace("=", "!");
}

function getFileName(prefix) {
  try{
    let convertedPrefix = prefix.replace("-","/").replace("_", "+").replace("!", "=");
    let fileName = atob(convertedPrefix);
    if(getFilePrefix(fileName) == prefix) return fileName;
    return "";
  }catch(error){
    return "";
  }
}

function encodedFilename(fileName, encryptionKey) {
  let encodedFileName = getFilePrefix(fileName) + "." + getFileSuffix(encryptionKey);
  return encodedFileName;
}

function getFileNameAndEncryptionHash(encodedFileName){
  let parts = encodedFileName.split(".");
  if(parts.length != 2){
    return {
      isValidFileName : false,
      fileName: "",
      encryptionHash: "",
    }
  }
  let fileName = getFileName(parts[0]);
  if(fileName == ""){
    return {
      isValidFileName : false,
      fileName: "",
      encryptionHash: "",
    }
  }
  return {
    isValidFileName : true,
    fileName: fileName,
    encryptionHash: parts[1],
  }
}



export const getProjects = async () => {
  return await GetCurrentUser().then((userId) =>
    getAPI(GetUserProjectsEndpoint(userId))
  );
};

export const getGroupProjects = async (groupId) => {
  return await getAPI(GetGroupAssociatedProjectsEndpoint(groupId));
};

export const createNewFileInRepository = async (projectId, fileName, data, encryptionKey) => {
  var encodedFileName = encodedFilename(fileName, encryptionKey);
  console.log(encodedFileName);
  return await postAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, encodedFileName),
    data
  );
};

export const uploadFiletoProject = async (projectId, data) => {
  const formData = new FormData();
  formData.append("file=", data);
  return await postFormAPI(GetUploadFileToProjectEndpoint(projectId), data);
};

export const getProjectFilesList = async (projectId, encryptionKey) => {
  let files = await getAPI(GetProjectFilesListEndpoint(projectId));
  
  files.data.forEach(function(element) {
    console.log('start');
    let fileNameAndEncryptionHash = getFileNameAndEncryptionHash(element.name);
    console.log(fileNameAndEncryptionHash);
    if(fileNameAndEncryptionHash.isValidFileName == false){
      element.isValid = false;
    }else if(fileNameAndEncryptionHash.encryptionHash != getFileSuffix(encryptionKey)){
      element.isValid = false;
      console.log(" un matched");
    }else{
      element.isValid = true;
      console.log("matched");
      element.name = fileNameAndEncryptionHash.fileName;
    }
    console.log(element);
    console.log("end");
  });
  return files;
};

export const downloadProjectFile = async (projectId, fileName) =>{

  let result = await getAPI(GetCreateNewFileInRepositoryEndpoint(projectId, fileName)+"?ref=main");
  let base64_string = result.data.content;
  let byteArray = Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))
  const blob = new Blob([byteArray], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};


export const deleteProjectFile = async (projectId, fileName) => {
  return await deleteAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, fileName),
    { branch: "main", commit_message: "deleteing", file_path: fileName }
  );
};
