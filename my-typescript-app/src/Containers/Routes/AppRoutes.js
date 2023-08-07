import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "../../Components";
import { LoginPage, HomePage, DocumentPage } from "../../Pages";

const AppRoutes= () => {

    return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="" element={<DocumentPage />} />
            <Route path="documents/new" element={<DocumentPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default AppRoutes