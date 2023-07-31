import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, HomePage, DocumentPage } from "../../Pages";

const AppRoutes= () => {

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>            
              <Route path="documents/new" element={<DocumentPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default AppRoutes