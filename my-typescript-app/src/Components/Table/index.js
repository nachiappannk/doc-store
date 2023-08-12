import { useState } from 'react'
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Loader } from '../Progress';
export const Table = (props) => {
  const { enteries, deleteEntry, downloadMethod, onDelete, loading = false } = props;
  const [eneryDeleting , setEntryDeleteing] = useState(false);

  const handleDelete = async (entryTitle) => {
    setEntryDeleteing(true);
    await deleteEntry(entryTitle);
    await onDelete()
    setEntryDeleteing(false)
  }
  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              File name
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Download</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {enteries &&
            enteries.map((entry) => {
              return (
                <tr
                  key={`file_item_${entry.id}`}
                  className="bg-white border-b  hover:bg-gray-50 "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {entry.name}
                  </th>
                  <td className="px-6 py-4">{entry.type}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => downloadMethod(entry.name)} className="font-medium text-blue-600  hover:underline">
                      <FileDownloadOutlinedIcon />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="font-medium text-blue-600  hover:underline">
                      <EditOutlinedIcon />
                    </button>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(entry.name)}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Loader loading={eneryDeleting || loading} />      
    </div>
  );
};
