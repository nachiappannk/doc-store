import { GetCurrentUserEndpoint } from "../Config/ApiContants";
import { getAPI } from "../Config/ApiMethods";

const currentUserKey = "_d_c_cu_id";
export const GetCurrentUser = async () => {
  const currentUserId = sessionStorage.getItem(currentUserKey);
  if (!currentUserId) {
    const currentUser = await getAPI(GetCurrentUserEndpoint);
    sessionStorage.setItem(currentUserKey, currentUser.data.id);
    return currentUser.data.id;
  }
  return currentUserId;
};
