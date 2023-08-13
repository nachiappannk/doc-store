import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../../Components";
import {
  LoginPage,
  HomePage,
  DocumentPage,
  TextEditor,
  EditExistingFile,
} from "../../Pages";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<DocumentPage />} />
          <Route path="/new-file" element={<TextEditor />} />
          <Route path="/:fileName/edit" element={<EditExistingFile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
