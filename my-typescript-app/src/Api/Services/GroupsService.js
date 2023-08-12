import { getAPI } from "../Config/ApiMethods";
import { GetUserGroupsEndpoint } from "../Config/ApiContants";

export const getGroups = async () => {
  return getAPI(GetUserGroupsEndpoint());
};
