import { getAPI } from "../Config/ApiMethods"
import { GetGroupsEndpoint } from "../Config/ApiContants"

export const getGroups = async () => {
    return await getAPI(GetGroupsEndpoint(1));
}