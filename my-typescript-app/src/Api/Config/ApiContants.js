const BackendBaseURI = "https://gitlab.com/api/v4";

const GetCurrentUserEndpoint = "user";

const GetUserGroupsEndpoint = () => {
  return `groups/?owned=true`;
};

const GetUserProjectsEndpoint = (userId) => {
  return `users/${userId}/projects`;
};

const GetGroupAssociatedProjectsEndpoint = (groupId) => {
  return `groups/${groupId}/projects`;
};

const GetCreateNewFileInRepositoryEndpoint = (projectId, filename) => {
  return `projects/${projectId}/repository/files/${filename}`;
};

const GetUploadFileToProjectEndpoint = (projectId) => {
  return `projects/${projectId}/uploads`;
};

const GetProjectFilesListEndpoint = (projectId) => {
  return `projects/${projectId}/repository/tree`;
};

export {
  BackendBaseURI,
  GetCurrentUserEndpoint,
  GetGroupAssociatedProjectsEndpoint,
  GetCreateNewFileInRepositoryEndpoint,
  GetUploadFileToProjectEndpoint,
  GetProjectFilesListEndpoint,
  GetUserGroupsEndpoint,
  GetUserProjectsEndpoint,
};
