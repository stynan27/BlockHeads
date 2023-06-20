import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { WelcomePage } from '../../pages/Welcome';
import { ErrorPage } from '../../pages/Error';
import { HeaderComponent } from '../../widgets/Header';
import { FooterComponent } from "../../widgets/Footer";

import './style.css';

export function AppComponent() {
  return (
    <Container fluid className="AppComponent vh-100 px-0">
        <HeaderComponent/> 

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage/>} />

                {/* All other trafic to error page */}
                <Route path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>

        <FooterComponent/> 
    </Container>
  );
}

export default AppComponent;
