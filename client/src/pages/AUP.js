import style from './styles/News.module.scss'
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


function AUP () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');

    const [data, setData] = useState('')
    const [activemodal, setActivemodal] = useState(false)
    const [news, setNews] = useState([])
    const [plusman, setPlusman] = useState(false)
    const [thisPost, setThisPost] = useState({})
    const [people, setPeople] = useState([])
    const [activedel, setActivedel] = useState(false)
    const [activeUpdate, setActiveUpdate] = useState(false)
    const [mandel, setMandel] = useState({})

    const getMans = async () => {
        try {
            const { data } = await NewsService.getAUP();

            // Сортировка по priory от меньшего к большему
            const sortedData = data.sort((a, b) => a.priory - b.priory);

            // Установка отсортированных данных в состояние
            setPeople(sortedData);

            console.log(sortedData);
        } catch (e) {
            console.log(e);
        }
    };

    const reversePriory = async (value, index) => {
        try{
            const newarr = [...people]
            newarr[index].priory = value
            setPeople(newarr)
            const {data} = await NewsService.reversePrioryAUP({id: newarr[index].id, priory: value})
            if(data){
                getMans()
            }
        }catch(e){

            console.log(e)
        }
    }

    useEffect(()=>{
        getMans()
    },[plusman,activedel,activeUpdate])
    return (
        <div className={style.bodymain}>
            <BigModal data={<PlusAUP man={data} setActivemodal={setPlusman}/>} activemodal={plusman} setActivemodal={setPlusman} setData={setData}/>
            <BigModal data={<UpdateAUP man={data} setActivemodal={setActiveUpdate}/>} activemodal={activeUpdate} setActivemodal={setActiveUpdate} setData={setData}/>
            <BigModal data={<DeleteMan man={mandel} setActivemodal={setActivedel} setMandel={setMandel}/>} activemodal={activedel} setActivemodal={setActivedel} setData={setData}/>
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
                        <div className={style.pluspost} onClick={()=>setPlusman(true)}>
                            <i className="fa-solid fa-plus"/>
                            <div className={style.namebtn}>Добавить сотрудника</div>
                        </div>
                    </div>

                    {(company)&&(
                        <div className={style.list}>
                            {people.map((man, index) => (
                                <div
                                    className={style.blockman}
                                    key={index}
                                    // ref={(el) => blockRefs.current[index] = el}
                                >
                                    <div className={style.photo} style={(man.image.length > 0)?{backgroundImage: `url('${man.image}')`}:{}}>
                                        <input type="number" className={style.priory} value={man.priory} onChange={(e)=>reversePriory(e.target.value, index)}/>
                                    </div>
                                    <div className={style.fio}>
                                        <div className={style.name}>{man.firstname}</div>
                                        <div className={style.name}>{man.secondname}</div>
                                        <div className={style.name}>{man.lastname}</div>
                                    </div>
                                    <div className={style.dev}>{man.developers}</div>
                                    <div className={style.btncontact} onClick={() => {setActiveUpdate(true);setData(man)}}>Редактировать</div>
                                    <div className={style.btncontact} onClick={() => {setActivedel(true); setMandel(man)}}>Удалить</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/*<div className={style.rightpath}></div>*/}
            </div>


        </div>
    )
}

export default AUP