const BackendBaseURI = "https://gitlab.com/api/v4/projects";

const GetGroupsEndpoint = (userId) => {
    return `/users/${userId}/groups`
}

const GetProjectsEndpoint = (userId)=> {
    return `/users/${userId}/projects`
};

export { BackendBaseURI, GetGroupsEndpoint, GetProjectsEndpoint}