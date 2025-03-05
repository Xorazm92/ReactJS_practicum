import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./page/login/Login";
import { Home } from "./page/home/Home";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
