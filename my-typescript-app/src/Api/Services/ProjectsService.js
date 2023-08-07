import { getAPI } from "../Config/ApiMethods";
import { GetProjectsEndpoint } from "../Config/ApiContants";

export const getProjects = async () => {
  return await getAPI(GetProjectsEndpoint(1));
};
