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
    let fileNameAndEncryptionHash = getFileNameAndEncryptionHash(element.name);
    if(fileNameAndEncryptionHash.isValidFileName == false){
      element.isValid = false;
    }else if(fileNameAndEncryptionHash.encryptionHash != getFileSuffix(encryptionKey)){
      element.isValid = false;
    }else{
      element.isValid = true;
      element.name = fileNameAndEncryptionHash.fileName;
    }
    element.id = element.path;
  });
  return files;
};

export const downloadProjectFile = async (projectId, fileName, encryptionKey) =>{
  console.log(fileName);
  console.log(encryptionKey);
  let encodedName = encodedFilename(fileName, encryptionKey);
  console.log(encodedName);
  let result = await getAPI(GetCreateNewFileInRepositoryEndpoint(projectId, encodedName)+"?ref=main");
  let base64_string = result.data.content;
  let byteArray = Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))
  const blob = new Blob([byteArray], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};


export const deleteProjectFile = async (projectId, fileName, encryptionKey) => {
  let encodedName = encodedFilename(fileName, encryptionKey);
  return await deleteAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, encodedName),
    { branch: "main", commit_message: "deleteing", file_path: encodedName }
  );
};
