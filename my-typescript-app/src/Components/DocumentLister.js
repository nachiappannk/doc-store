import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { EncryptionContext } from "../Containers";
import { Table } from "./Table";
import { UploadAndSeearchSection } from "../Pages/Documents/Upload&Search";
import {
  getProjectFilesList,
  deleteProjectFile,
  downloadProjectFile,
} from "../Api/Services/ProjectsService";

const DocumentLister = (props) => {
  const { token } = useContext(AuthContext);
  const [
    groupName,
    projectName,
    encryptionKey,
    groupAccositedProjectList,
    clear,
  ] = useContext(EncryptionContext);

  const [loading, setLoading ] = useState(false)
  const [projectFilesList, setProjectFilesList] = useState([]);

  const selectedProject = groupAccositedProjectList.filter(
    (x) => x.name === projectName
  )[0];

  const getProjectFiles = async () => {
      setLoading(true)
      const { data: fileList } = await getProjectFilesList(selectedProject.id, encryptionKey);
      console.log(fileList);
      let matchedFiles = fileList.filter((x) => x.isValid == true);
      setProjectFilesList(matchedFiles);
      setLoading(false)
    };

  useEffect(() => {    
    if (selectedProject) {
      getProjectFiles();
    }
  }, []);
  return (
    <>
      {token ? (
        <div className="relative  flex flex-col justify-center items-center ">
          <section className="mt-52 p-8 container max-w-4xl flex flex-col flex-wrap justify-center items-start w-full">
            <div className="break-all">
              <span>The token: </span>
              {token}
            </div>
            <div>
              <span>The Group: </span>
              {groupName}
            </div>
            <div>
              <span>The project: </span>
              {projectName}
            </div>
            <div>
              <span>The EncryptionKey: </span>
              {encryptionKey}
            </div>

            <button onClick={() => clear()}>clear encryption key</button>
            <div className="w-full">
              <ul className="divide-y divide-gray-100 hover:bg-slate-300">
                {groupAccositedProjectList.map((project) => {
                  return (
                    <li
                      className="flex justify-between gap-x-6 py-5"
                      key={`project_list${project.id}`}
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto ">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {project.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {project.description}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {project.pages_access_level}
                          </p>
                        </div>
                      </div>
                      <div className="sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {project.name_with_namespace}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Last seen{" "}
                          <time dateTime={project.last_activity_at}>
                            {Math.ceil(
                              Math.abs(
                                new Date().getTime() -
                                  new Date(project.last_activity_at).getTime()
                              ) /
                                (24 * 60 * 60 * 1000)
                            )}{" "}
                            day ago
                          </time>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
          <UploadAndSeearchSection
            project={selectedProject}
            onUpload={getProjectFiles}
            encryptionKey={encryptionKey}
            loading={loading}
          />
          <section className="m-4 my-8 p-8 container max-w-4xl flex flex-col justify-center items-center w-full">
            <Table
              enteries={projectFilesList}
              deleteEntry={async (filename) =>
                await deleteProjectFile(selectedProject.id, filename)
              }
              downloadMethod={(fileName) => {
                downloadProjectFile(selectedProject.id, fileName);
              }}
              onDelete={getProjectFiles}
            />
          </section>
        </div>
      ) : (
        <>
          <div>Error</div>
        </>
      )}
    </>
  );
};

export default DocumentLister;
