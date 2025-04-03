import style from './styles/News.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import NewsPost from "../components/news/NewsPost";
import {useEffect, useState} from "react";
import BigModal from "../components/modalwin/BigModal";
import CreatePost from "../components/news/CreatePost";
import NewsService from "../services/NewsService";
import OpenPost from "../components/news/OpenPost";
import {Link} from "react-router-dom";

function News () {

    const [data, setData] = useState('')
    const [activemodal, setActivemodal] = useState(false)
    const [news, setNews] = useState([])
    const [openPost, setOpenPost] = useState(false)
    const [openPostCreate, setOpenPostCreate] = useState(false)
    const [thisPost, setThisPost] = useState({})
    const [deleted, setDeleted] = useState('')

    const getNews = async () => {
        try{
            const {data} = await NewsService.viewPost()
            const posts = data.reverse()
            console.log(posts)
            setNews(posts)
        }catch(e){
            console.log(e)
        }
    }



    useEffect(()=>{
        getNews()
    },[activemodal,openPost,deleted])
    return (
        <div className={style.bodymain}>
            <BigModal data={<OpenPost thisPost={thisPost} setActivemodal={setOpenPostCreate}/>} activemodal={openPostCreate} setActivemodal={setOpenPostCreate} setData={setData}/>
            <BigModal data={<CreatePost news={data} setActivemodal={setActivemodal}/>} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData}/>
            <HeaderMain page={'./Новости'}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <div style={{display: 'flex'}}>
                        <Link to={`/`} className={style.pluspost} style={{color: '#454545', marginRight: '20px'}}>
                            <i className="fa-solid fa-rotate-left"/>
                            <div className={style.namebtn}>Назад</div>
                        </Link>
                        <div className={style.pluspost} onClick={()=>setActivemodal(true)}>
                            <i className="fa-solid fa-plus"/>
                            <div className={style.namebtn}>Добавить новость</div>
                        </div>
                    </div>

                    {news.map((post, index)=>(
                        <NewsPost post={post} key={index} openPostCreate={openPostCreate} setOpenPostCreate={setOpenPostCreate} thisPost={thisPost} openPost={openPost} setOpenPost={setOpenPost} setThisPost={setThisPost} setDeleted={setDeleted}/>
                    ))}
                </div>
                <div className={style.rightpath}></div>
            </div>


        </div>
    )
}

export default News