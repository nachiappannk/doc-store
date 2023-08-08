const BackendBaseURI = "https://gitlab.com/api/v4";

const GetCurrentUserEndpoint= "user"

const GetUserGroupsEndpoint = () => {
    return `groups/?owned=true`;
}

const GetUserProjectsEndpoint = (userId)=> {
    return `users/${userId}/projects`
};

const GetGroupAssociatedProjectsEndpoint = (groupId) => {
    return `groups/${groupId}/projects`;
}

export {
  BackendBaseURI,
  GetCurrentUserEndpoint,
  GetGroupAssociatedProjectsEndpoint,
  GetUserGroupsEndpoint,
  GetUserProjectsEndpoint,
};