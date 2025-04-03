import style from './styles/Packets.module.scss'
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


function Zones () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [data, setData] = useState('')
    const [editact, setEditact] = useState(false)
    const [plusPack, setPlusPack] = useState(false)
    const [plusZone, setPlusZone] = useState(false)
    const [editPack, setEditPack] = useState(false)
    const [list, setList] = useState([])

    const getZones = async () => {
        try{
            const {data} = await NewsService.getZones({capter: company})
            console.log(data)
            if(data){
                const sortedData = data.sort((a, b) => parseInt(b.priory, 10) - parseInt(a.priory, 10));
                setList(sortedData)
            }
        }catch(e){
            console.log(e)
        }
    }

    const changePriory = async () => {

    }

    useEffect(()=>{
        getZones()
    }, [plusZone])

    return (
        <div className={style.bodymain}>
            <BigModal data={<PlusZones com={company} setActivemodal={setPlusZone}/>} activemodal={plusZone} setActivemodal={setPlusZone} setData={setData}/>
            <BigModal data={<EditZones thiszone={data} setPack={setData} com={company} setActivemodal={setEditPack}/>} activemodal={editPack} setActivemodal={setEditPack} setData={setData}/>
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
                        <div className={style.pluspost} onClick={()=>setPlusZone(true)}>
                            <i className="fa-solid fa-plus"/>
                            <div className={style.namebtn}>Добавить Зону</div>
                        </div>
                    </div>
                    <div className={style.packs}>
                        <div className={style.title}>
                            <div className={style.title_num}>№</div>
                            <div className={style.title_name}>Наименование</div>
                            <div className={style.title_price}>Кол-во фото</div>
                            <div className={style.title_desc}>Описание</div>
                            <div className={style.title_priory}>Показ (приоритет)</div>
                            <div className={style.title_multi}></div>
                        </div>
                        {(list)&&list.map((line, indexLine)=>(
                            <div key={indexLine} className={style.line}>
                                <div className={style.line_num}>{indexLine+1}</div>
                                <div className={style.line_name}>{line.name}</div>
                                <div className={style.line_price}>{(line.lastimg)&&line.lastimg.length + 3}</div>
                                <div className={style.line_desc}>

                                    {line.desc}
                                </div>
                                <div className={style.line_priory}>
                                    <input type="number" value={+line.priory} onChange={(e)=>changePriory(e.target.value, indexLine)}></input>
                                </div>
                                <div className={style.line_multi}>
                                    <div className={style.line_edit} onClick={()=>{setData(line); setEditPack(true)}}><i className="fa-solid fa-pen-to-square"/></div>
                                    <div className={style.line_del}><i className="fa-solid fa-trash-can"/></div>
                                </div>
                            </div>
                        ))}


                    </div>


                </div>
            </div>


        </div>
    )
}

export default Zones