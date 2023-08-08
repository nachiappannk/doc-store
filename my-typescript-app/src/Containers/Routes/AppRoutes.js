import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "../../Components";
import { LoginPage, HomePage, DocumentPage } from "../../Pages";
import { EncryptionContainer } from '../Encryption/EncryptionContainer';

const AppRoutes= () => {

    return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="" element={<DocumentPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default AppRoutes