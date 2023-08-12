import { getAPI, postAPI, postFormAPI, deleteAPI } from "../Config/ApiMethods";
import {
  GetUserProjectsEndpoint,
  GetGroupAssociatedProjectsEndpoint,
  GetCreateNewFileInRepositoryEndpoint,
  GetProjectFilesListEndpoint,
  GetUploadFileToProjectEndpoint
} from "../Config/ApiContants";
import { GetCurrentUser } from "./UserService";

export const getProjects = async () => {  
   return await GetCurrentUser().then((userId) =>
     getAPI(GetUserProjectsEndpoint(userId))
   );
};


export const getGroupProjects = async (groupId) => {
  return await getAPI(GetGroupAssociatedProjectsEndpoint(groupId));
};

export const createNewFileInRepository = async (projectId, fileName, data) => {
    return await postAPI(GetCreateNewFileInRepositoryEndpoint(projectId,fileName),data);
}

export const uploadFiletoProject = async (projectId, data) => {
  const formData = new FormData();
  formData.append("file=", data);
  return await postFormAPI(GetUploadFileToProjectEndpoint(projectId), data);
};


export const getProjectFilesList = async (projectId) => {
  return await getAPI(GetProjectFilesListEndpoint(projectId));
};

export const deleteProjectFile = async (projectId, fileName) => {
  return await deleteAPI(GetCreateNewFileInRepositoryEndpoint(projectId,fileName),{"branch" : "main", "commit_message" : "deleteing", "file_path" : fileName});
};