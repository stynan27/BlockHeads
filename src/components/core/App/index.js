import { BrowserRouter, Route, Routes } from "react-router-dom";

import { WelcomeComponent } from '../../pages/Welcome';
import { ErrorComponent } from '../../pages/Error';

import './style.css';

export function AppComponent() {
  return (
    <div className="AppComponent">
        <BrowserRouter>
            {/* 
                TODO: <Header/> 
            */}
            <Routes>
                <Route path="/" element={<WelcomeComponent/>} />

                {/* All other trafic to error page */}
                <Route path="*" element={<ErrorComponent/>} />
            </Routes>
            {/* 
                TODO: <Footer/> 
            */}
        </BrowserRouter>
    </div>
  );
}

export default AppComponent;
