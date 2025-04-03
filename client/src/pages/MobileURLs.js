import style from './styles/ZonesSlider.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import BigModal from "../components/modalwin/BigModal";
import {useMessage} from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import EditPack from "../components/forms/EditPack";
import PlusZones from "../components/forms/PlusZones";
import EditZones from "../components/forms/EditZones";
import React, {useRef} from "react";
import imageCompression from "browser-image-compression";


function MobileURLs () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [android, setAndroid] = useState('')
    const [apple, setApple] = useState('')

   const getMobileURLs = async () => {
        try{
            const {data} = await NewsService.getMobileURLs({capter: company})
            if(data){
                setAndroid(data.android)
                setApple(data.apple)
            }else{
                message('Ожидание')
            }
        }catch(e){
            console.log(e)
        }
   }

   const updateURLMobileAPP = async (app, value) => {
        if(app === 'android'){
            setAndroid(value)
        }else{
            setApple(value)
        }
        try{
            const {data} = await NewsService.updateURLMobileAPP({capter: company, android, apple})
        }catch(e){
            console.log(e)
        }
   }

    useEffect(()=>{
        getMobileURLs()
    }, [])

    return (
        <div className={style.bodymain}>

            <HeaderMain page={`./${company}`}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <div className={style.nav}>
                        <Link to={`/company?com=${company}`} className={style.back}>
                            <i className="fa-solid fa-rotate-left"/>
                            <div className={style.namebtn}>Назад</div>
                        </Link>
                    </div>

                    <div className={style.plusblockz}>

                        <input type="text" placeholder='Android' value={android} onChange={(e)=>updateURLMobileAPP('android', e.target.value)}/>
                        <input type="text" placeholder='Apple' value={apple} onChange={(e)=>updateURLMobileAPP('apple', e.target.value)}/>


                    </div>

                </div>
            </div>


        </div>
    )
}

export default MobileURLs