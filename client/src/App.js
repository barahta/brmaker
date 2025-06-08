import React, {useContext, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./pages/Main.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {observer} from "mobx-react-lite";
import AuthRouter from "./pages/auth/AuthRouter";
import {Context} from "./index";
import ThisProject from "./pages/ThisProject";
import StaffingTable from "./pages/StaffingTable";
import BTs from "./pages/BTs";


function App() {
    const {store} = useContext(Context)
    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }

        // const storedUser = localStorage.getItem('user');
        // if (storedUser) {
        //     const parsedUser = JSON.parse(storedUser);
        //     store.setUser(parsedUser); // Убедитесь, что у вас есть метод для установки пользователя в store
        // }
    },[])
    if(store.isLoading){
        return <div>Загрузка...</div>
    }
    if(!store.isAuth) return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='*' element={<AuthRouter/>} />
                </Routes>
            </div>
        </Router>
    )



    if(store.isAuth) {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/thisproject" element={<ThisProject/>}/>
                    <Route path="/bt" element={<BTs/>}/>
                    <Route path="/staffingtable" element={<StaffingTable/>}/>

                </Routes>
                <ToastContainer/>
            </Router>
        );
    }
}

export default observer(App)
