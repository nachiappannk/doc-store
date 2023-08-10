import { getAPI, postAPI } from "../Config/ApiMethods";
import {
  GetUserProjectsEndpoint,
  GetGroupAssociatedProjectsEndpoint,
  GetCreateNewFileInRepositoryEndpoint,
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