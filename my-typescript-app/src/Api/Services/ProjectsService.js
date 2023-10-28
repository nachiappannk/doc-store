import CryptoJS from "crypto-js";
import { getAPI, postAPI, postFormAPI, putAPI, deleteAPI } from "../Config/ApiMethods";
import {
  GetAllAccesibleUserProjectsEndpoint,
  GetUserProjectsEndpoint,
  GetGroupAssociatedProjectsEndpoint,
  GetCreateNewFileInRepositoryEndpoint,
  GetProjectFilesListEndpoint,
  GetUploadFileToProjectEndpoint,
} from "../Config/ApiContants";

import { GetCurrentUser } from "./UserService";

const getFileSuffix = (encryptionKey) => {
  const hash = CryptoJS.SHA256(encryptionKey);
  return hash.toString(CryptoJS.enc.Hex);
}

const getFilePrefix = (fileName) => {
  return btoa(fileName).replace("/", "-").replace("+", "_").replace("=", "!");
}

const getFileName = (prefix) => {
  try{
    const convertedPrefix = prefix.replace("-","/").replace("_", "+").replace("!", "=");
    const fileName = atob(convertedPrefix);
    if(getFilePrefix(fileName) === prefix) return fileName;
    return "";
  }catch(error){
    return "";
  }
}

const encodedFilename = (fileName, encryptionKey) => {
  const encodedFileName = getFilePrefix(fileName) + "." + getFileSuffix(encryptionKey);
  return encodedFileName;
}

const getFileNameAndEncryptionHash = (encodedFileName) => {
  const parts = encodedFileName.split(".");
  if(parts.length !== 2){
    return {
      isValidFileName : false,
      fileName: "",
      encryptionHash: "",
    }
  }
  const fileName = getFileName(parts[0]);
  if(fileName === ""){
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

export const getAllAccesibleUserProjects = async() => {
  return await getAPI(GetAllAccesibleUserProjectsEndpoint());
}

export const getUserProjects = async () => {
  return await GetCurrentUser().then((userId) =>
    getAPI(GetUserProjectsEndpoint(userId))
  );
};

export const getGroupProjects = async (groupId) => {
  return await getAPI(GetGroupAssociatedProjectsEndpoint(groupId));
};

export const createNewFileInRepository = async (projectId, fileName, data, encryptionKey) => {
  console.log("encode this data");
  console.log(data);
  console.log(encryptionKey);
  const content = {
    branch: "main",
    content: btoa(JSON.stringify(data)),
    commit_message: "create a new file",
    encoding: "base64",
  };
  const encodedFileName = encodedFilename(fileName, encryptionKey);
  return await postAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, encodedFileName),
    content
  );
};

export const uploadFiletoProject = async (projectId, data) => {
  const formData = new FormData();
  formData.append("file=", data);
  return await postFormAPI(GetUploadFileToProjectEndpoint(projectId), data);
};

export const getProjectFilesList = async (projectId, encryptionKey) => {
  const files = await getAPI(GetProjectFilesListEndpoint(projectId));
  
  files.data.forEach(function(element) {
    let fileNameAndEncryptionHash = getFileNameAndEncryptionHash(element.name);
    if(fileNameAndEncryptionHash.isValidFileName === false){
      element.isValid = false;
    }else if(fileNameAndEncryptionHash.encryptionHash !== getFileSuffix(encryptionKey)){
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
  const encodedName = encodedFilename(fileName, encryptionKey);
  const result = await getAPI(GetCreateNewFileInRepositoryEndpoint(projectId, encodedName)+"?ref=main");
  const base64_string = result.data.content;
  const byteArray = Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))
  const blob = new Blob([byteArray], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};

export const getProjectFileData = async (
  projectId,
  fileName,
  encryptionKey
) => {
  console.log("testing this has to be decoded");
  const encodedName = encodedFilename(fileName, encryptionKey);
  const result = await getAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, encodedName) + "?ref=main"
  );
  const base64_string = result.data.content;
  return atob(base64_string)
};

export const updateProjectFile = async (
  projectId, fileName, data, encryptionKey
) => {

  const content = {
    branch: "main",
    content: btoa(JSON.stringify(data)),
    commit_message: "updating file",
    encoding: "base64",
  };

  console.log("encode this data");
  console.log(content);
  console.log(encryptionKey);
  const encodedName = encodedFilename(fileName, encryptionKey);
  return await putAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, encodedName),
    content
  );
  
};

export const deleteProjectFile = async (projectId, fileName, encryptionKey) => {
  const encodedName = encodedFilename(fileName, encryptionKey);
  return await deleteAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, encodedName),
    { branch: "main", commit_message: "deleteing", file_path: encodedName }
  );
};
