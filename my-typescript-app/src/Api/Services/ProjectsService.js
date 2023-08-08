import { getAPI } from "../Config/ApiMethods";
import {
  GetUserProjectsEndpoint,
  GetGroupAssociatedProjectsEndpoint,
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