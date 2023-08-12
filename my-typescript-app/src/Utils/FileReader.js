export const readFile = (file, onLoaded, updateProgressCallback) => {
  const reader = new FileReader();
  reader.addEventListener("load", async (event) => {
    const result = event.target.result;
    await onLoaded(result);
  });

  reader.addEventListener("progress", (event) => {
    if (event.loaded && event.total) {
      const percent = (event.loaded / event.total) * 100;
      updateProgressCallback(Math.round(percent));
    }
  });
  reader.readAsBinaryString(file);
};
