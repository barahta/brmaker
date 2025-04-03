import style from './styles/Activities.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import BigModal from "../components/modalwin/BigModal";
import CreatePost from "../components/news/CreatePost";
import PlusAUP from "../components/forms/PlusAUP";
import UpdateAUP from "../components/forms/UpdateAUP";
import NewsService from "../services/NewsService";
import DeleteMan from "../components/forms/DeleteMan";
import EditActivities from "../components/forms/EditActivities";


function Activities () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');

    const [data, setData] = useState('')
    const [editact, setEditact] = useState(false)



    useEffect(()=>{
    },[])
    return (
        <div className={style.bodymain}>
            <BigModal data={<EditActivities act={data} setActivemodal={setEditact}/>} activemodal={editact} setActivemodal={setEditact} setData={setData}/>
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
                        {/*<div className={style.pluspost}>*/}
                        {/*    <i className="fa-solid fa-plus"/>*/}
                        {/*    <div className={style.namebtn}>Добавить площадку</div>*/}
                        {/*</div>*/}
                    </div>

                    <div className={style.places}>
                        <div className={style.places_line}>
                            <div className={style.places_line_radio} onClick={()=>{setData('radio');setEditact(true)}}>Радио</div>
                            <div className={style.places_line_box}>
                                <div className={style.places_line_box_square} onClick={()=>{setData('tv');setEditact(true)}}>Телевидение</div>
                                <div className={style.places_line_box_square} onClick={()=>{setData('cifra');setEditact(true)}}>Цифровые платформы</div>
                            </div>
                        </div>
                        <div className={style.places_line}>
                            <div className={style.places_line_pr} onClick={()=>{setData('pr');setEditact(true)}}>Рекалама и Маркетинг</div>
                            <div className={style.places_line_more} onClick={()=>{setData('more');setEditact(true)}}>Другие активы</div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Activities