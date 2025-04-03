import React, {useContext, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from "./pages/Main.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {observer} from "mobx-react-lite";
import News from "./pages/News";
import AuthRouter from "./pages/auth/AuthRouter";
import {Context} from "./index";
import Company from "./pages/Company";
import AUP from "./pages/AUP";
import VideoUploader from "./pages/VideoUploader";
import Vakansii from "./pages/Vakansii";
import About from "./pages/About";
import Group from "./pages/Group";
import Activities from "./pages/Activities";
import Packets from "./pages/Packets";
import Gallery from "./pages/Gallery";
import Contacts from "./pages/Contacts";
import Zones from "./pages/Zones";
import ZonesSlider from "./pages/ZonesSlider";
import ProgramSlider from "./pages/ProgramSlider";
import ProgramsPage from "./pages/ProgramsPage";
import TrenersSlider from "./pages/TrenersSlider";
import TrenersPage from "./pages/TrenersPage";
import MobileURLs from "./pages/MobileURLs";
import Prices from "./pages/Prices";
import RegPage from "./pages/RegPage";
import AllPilots from "./pages/AllPilots";
import VariousLearning from "./pages/VariousLearning";
import PacketsReaFarm from "./pages/PacketsReaFarm";


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
                    <Route path="/news" element={<News/>}/>
                    <Route path="/company" element={<Company/>}/>
                    <Route path="/aup" element={<AUP/>}/>
                    <Route path="/activities" element={<Activities/>}/>
                    <Route path="/promo" element={<VideoUploader/>}/>
                    <Route path="/packs" element={<Packets/>}/>
                    <Route path="/packsrea" element={<PacketsReaFarm/>}/>
                    <Route path="/prices" element={<Prices/>}/>
                    <Route path="/projects" element={<Gallery/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/vakansii" element={<Vakansii/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/group" element={<Group/>}/>
                    <Route path="/zones" element={<Zones/>}/>
                    <Route path="/zonesslider" element={<ZonesSlider/>}/>
                    <Route path="/programslider" element={<ProgramSlider/>}/>
                    <Route path="/programspage" element={<ProgramsPage/>}/>
                    <Route path="/trenersslider" element={<TrenersSlider/>}/>
                    <Route path="/trenerspage" element={<TrenersPage/>}/>
                    <Route path="/mobileapp" element={<MobileURLs/>}/>
                    <Route path="/reg" element={<RegPage/>}/>
                    <Route path="/allpilots" element={<AllPilots/>}/>
                    <Route path="/learning" element={<VariousLearning/>}/>

                </Routes>
                <ToastContainer/>
            </Router>
        );
    }
}

export default observer(App)
