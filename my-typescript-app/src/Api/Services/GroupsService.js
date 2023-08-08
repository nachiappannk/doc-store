import { getAPI } from "../Config/ApiMethods"
import { GetUserGroupsEndpoint } from "../Config/ApiContants";
import { GetCurrentUser } from "./UserService";

export const getGroups = async () => {
    return getAPI(GetUserGroupsEndpoint());
}