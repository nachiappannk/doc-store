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

import { AlertBar } from "./Alerts";

const DocumentLister = (props) => {
  const { token } = useContext(AuthContext);
  const [selectedProject , encryptionKey, groupAccositedProjectList] =
    useContext(EncryptionContext);
  const [loading, setLoading ] = useState(false)
  const [projectFilesList, setProjectFilesList] = useState([]);
  const [numFilteredFiles, setNumFilteredFiles] = useState(0);

  const getProjectFiles = async () => {
      setLoading(true)
      const { data: fileList } = await getProjectFilesList(selectedProject.id, encryptionKey);
      const matchedFiles = fileList.filter((x) => x.isValid === true);
      setNumFilteredFiles(fileList.length - matchedFiles.length);
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
        <div className="flex flex-col justify-center items-center w-full ">
          <section className="container p-8 md:p-0 flex flex-col flex-wrap justify-center items-start w-full">
            <div className="break-all">
              <span>The token: </span>
              {token}
            </div>
            <div>
              <span>The project: </span>
              {selectedProject.name}
            </div>
            <div>
              <span>The EncryptionKey: </span>
              {encryptionKey}
            </div>
            <hr className="h-px my-8 bg-gray-400 border-0 w-full" />
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

          <hr className="h-px my-8 bg-gray-400 border-0 w-full" />
          <UploadAndSeearchSection
            project={selectedProject}
            onUpload={getProjectFiles}
            encryptionKey={encryptionKey}
            loading={loading}
          />
          <section className="m-4 my-8 p-8 md:p-0 container flex flex-col justify-center items-center w-full">
            <AlertBar
              variant="info"
              message={`${numFilteredFiles} more files filtered which are not matching this encryption key`}
            />
            <br />
            <Table
              enteries={projectFilesList}
              deleteEntry={async (filename) =>
                await deleteProjectFile(
                  selectedProject.id,
                  filename,
                  encryptionKey
                )
              }
              downloadMethod={(fileName) => {
                downloadProjectFile(
                  selectedProject.id,
                  fileName,
                  encryptionKey
                );
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
