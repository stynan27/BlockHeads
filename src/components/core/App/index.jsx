import { Container, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WelcomePage } from '../../pages/Welcome';
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
          <HeaderComponent/> 
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomePage/>} />

                    {/* All other trafic to error page */}
                    <Route path="*" element={<ErrorPage/>} />
                </Routes>
            </BrowserRouter>
            <FooterComponent/> 
            <UserAuth/>
          </Provider>
    </Container>
  );
}

export default AppComponent;
