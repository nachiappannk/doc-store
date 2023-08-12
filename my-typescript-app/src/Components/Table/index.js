import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export const Table = (props) => {
  const { enteries, deleteMethod } = props;
  console.log(enteries)
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
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Last Modified
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
          {enteries && enteries.map((entry) => {
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
                <td className="px-6 py-4">{entry.path}</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600  hover:underline"
                  >
                    <FileDownloadOutlinedIcon />
                  </a>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600  hover:underline"
                  >
                    <EditOutlinedIcon />
                  </a>
                </td>

                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600  hover:underline"
                  >
                    <button onClick={()=> deleteMethod(entry.name) }><DeleteOutlinedIcon /></button>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
