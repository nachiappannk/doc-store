export const InfoIcon = () => {
  return (
    <>
      <svg
        className="flex-shrink-0 inline w-4 h-4 mr-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
    </>
  );
};

export const AlertBar = ({
  variant = "default",
  showIcon = true,
  message = "",
  htmlMessage = "",
}) => {
  let style = "";
  switch (variant) {
    case "info":
      style = "text-blue-800 bg-blue-50";
      break;
    case "error":
      style = "text-red-800  bg-red-50";
      break;
    case "success":
      style = "text-green-800 bg-green-50";
      break;
    case "warning":
      style = "text-yellow-800 bg-yellow-50";
      break;
    default:
      style = "text-gray-800 bg-gray-50";
      break;
  }
  return (
    <div
      className={`w-full flex  items-center p-4 mb-4 text-sm  rounded-lg ${style}`}
      role="alert"
    >
      {showIcon && <InfoIcon />}
      {message}
      {htmlMessage}
    </div>
  );
};

export const AlertWithAction = ({
  message = "You have unsaved changes. Your changes will be lost!",
  okButtonText = " Yes, I'm sure",
  cancelButtonText = "No, cancel",
  onConfim,
  onCancel,
}) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full  flex justify-center items-center bg-slate-300 opacity-90">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative  bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onCancel}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>
              <button
                onClick={onConfim}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                {okButtonText}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                {cancelButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
