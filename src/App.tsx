import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./page/login/Login";
import { Home } from "./page/home/Home";
import MainLayout from "./layout/MainLayout";
import CustomCalendar from "./page/calaendar/Calendar";
import CreateCustomer from "./page/create-customer/CreateCustomer";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="calendar" element={<CustomCalendar />} />
                <Route path="/create-customer" element={<CreateCustomer />} />
            </Route>
                <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
