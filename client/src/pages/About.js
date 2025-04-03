import style from './styles/News.module.scss'
import styler from './styles/About.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import NewsService from "../services/NewsService";
import {useMessage} from "../hooks/message.hook";

function About () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [aboutText, setAboutText] = useState('')
    const getAbout = async () => {
        try{
            const {data} = await NewsService.getAbout({company})
            if(data){
                setAboutText(data.text)
            }
        }catch(e){
            console.log(e)
        }
    }

    const saveAbout = async () =>{
        try{
            const newtext = aboutText+''
            const {data} = await NewsService.saveAbout({company, text: newtext})
            if(data){
                message('О! Изменения сохранены')
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
       getAbout()
    },[])

    return (
        <div className={style.bodymain}><HeaderMain page={`./${company}`}/>
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
                    <div className={styler.about}>
                        <div className={styler.titleabout}>Раздел "О нас"</div>
                        <textarea className={styler.text} onChange={(e) => setAboutText(e.target.value)} value={aboutText}></textarea>
                        <div className={styler.btnsave} onClick={saveAbout}>Сохранить</div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default About