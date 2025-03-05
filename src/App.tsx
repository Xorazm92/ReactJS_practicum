import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./page/login/Login";
import { Home } from "./page/home/Home";
import MainLayout from "./layout/MainLayout";

function App() {
    return (
        <Routes>
            <Route path = "/" element = {<MainLayout/>}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
