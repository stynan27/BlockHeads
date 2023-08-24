import { Container, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WelcomePage } from '../../pages/Welcome';
import { ManageSetsPage } from '../../pages/ManageSets';
import { ErrorPage } from '../../pages/Error';
import { HeaderComponent } from '../../widgets/Header';
import { FooterComponent } from "../../widgets/Footer";
import { Provider } from 'react-redux';
import './style.css';
import store from '../../../store';
import UserAuth from '../../widgets/Login';



export function AppComponent() {
  return (
    <Container fluid className="AppComponent vh-100 px-0" data-testid="core-app">
       <Provider store = {store}>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path="/" element={<WelcomePage/>} />
                    <Route path="/manage-sets" element={<ManageSetsPage/>} />
                    {/* All other trafic to error page */}
                    <Route path="*" element={<ErrorPage/>} />
                </Routes>
                <FooterComponent/> 
                <UserAuth/>
            </BrowserRouter>
          </Provider>
    </Container>
  );
}

export default AppComponent;
