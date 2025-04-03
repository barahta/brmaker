import style from './styles/PacketsReaFarm.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import BigModal from "../components/modalwin/BigModal";
import EditActivities from "../components/forms/EditActivities";
import PlusPack from "../components/forms/PlusPack";
import {useMessage} from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import EditPack from "../components/forms/EditPack";
import PlusPackReaFarm from "../components/forms/PlusPackReaFarm";
import EditPackReaFarm from "../components/forms/EditPackReaFarm";


function PacketsReaFarm () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [data, setData] = useState('')
    const [cat, setCat] = useState('')
    const [editact, setEditact] = useState(false)
    const [plusPack, setPlusPack] = useState(false)
    const [editPack, setEditPack] = useState(false)
    const [list, setList] = useState([])
    const [listcom, setListcom] = useState([])

    const getComVak = async () => {
        try {
            const {data} = await NewsService.getComVak({com: company})
            setListcom(data)
        }catch(e){
            console.log(e)
        }
    }

    const delComVak = async(com) =>{
        try{
            const {data} = await NewsService.delComVak({com})
            if(data){
                getComVak()
                message(`Категория ${com.name} удалена из списка`)
            }
        }catch(e){
            console.log(e)
            message('О! Что-то пошло не так')
        }
    }

    const plusCategory = async () => {
        try{
            const {data} = await NewsService.plusComVak({name: cat,category: company,})
            if(data){
                message('Категория "'+cat+'" добавлена')
                setCat('')
                getComVak()
            }
        }catch(e){
            console.log(e)
        }
    }

    const changePriory = async (value, line) => {
        const newarr = [...list]
        if(newarr[line].priory !== value){
            newarr[line].priory = value
            setList(newarr)
            try{
                const {data} = await NewsService.editPrioryPack({id: newarr[line].id, priory: value})

            }catch(e){
                console.log(e)
            }
        }

    }
    const getPacks = async () => {
        try{
            const {data} = await NewsService.getAllPacks({capter: company})
            if(data){
                data.reverse()
                setList(data)
            }
        }catch(e){
            console.log(e)
        }
    }

    const delPacks = async (id, name) =>{
        try{
            const {data} = await NewsService.delPacks({id})
            if(data){
                message('Пакет "' + name + '" удален')
                getPacks()
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getComVak()
    },[])

    useEffect(()=>{
        getPacks()
    },[plusPack, editPack])


    return (
        <div className={style.bodymain}>
            <BigModal data={<PlusPackReaFarm com={company} setActivemodal={setPlusPack}/>} activemodal={plusPack} setActivemodal={setPlusPack} setData={setData}/>
            <BigModal data={<EditPackReaFarm pack={data} setPack={setData} com={company} setActivemodal={setEditPack}/>} activemodal={editPack} setActivemodal={setEditPack} setData={setData}/>
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
                        <div className={style.pluspost} onClick={()=>setPlusPack(true)}>
                            <i className="fa-solid fa-plus"/>
                            <div className={style.namebtn}>Добавить Пакет</div>
                        </div>
                    </div>
                    <div className={style.category}>
                        <div className={style.category_form}>
                            <input type="text" value={cat} onChange={(e)=>setCat(e.target.value)}/>
                            <div className={style.category_form_btn} onClick={plusCategory}>Добавить категорию</div>

                        </div>
                        <div className={style.category_list}>
                            {(listcom)&&listcom.map((cat, index)=>(
                                <div className={style.category_list_point} key={index}><div className={style.category_list_point_tchk}></div><div className={style.category_list_point_name}>{cat.name}</div>
                                    <i className="fa-regular fa-trash-can" onClick={()=>delComVak(cat)}></i>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.packs}>
                        <div className={style.title}>
                            <div className={style.title_num}>№</div>
                            <div className={style.title_name}>Наименование</div>
                            <div className={style.title_time}>Категория</div>
                            <div className={style.title_price}></div>
                            <div className={style.title_desc}>Описание</div>
                            <div className={style.title_priory}>Показ (приоритет)</div>
                            <div className={style.title_multi}></div>
                        </div>
                        {(list)&&list.map((line, indexLine)=>(
                            <div key={indexLine} className={style.line}>
                                <div className={style.line_num}>{indexLine+1}</div>
                                <div className={style.line_name}>{line.name}</div>
                                <div className={style.line_time}>{line.time}</div>
                                <div className={style.line_price}>{line.price} <br/>{(line.publicdesc.split("|")[0])&&line.publicdesc.split("|")[0]} {(line.publicdesc.split("|")[1])&&line.publicdesc.split("|")[1]}</div>
                                <div className={style.line_desc}>
                                    {(line.desc)&&line.desc.map((desc, indexDESC) => (
                                        <div key={indexDESC + 1100} className={style.line_desc_param}>{desc}</div>
                                    ))}
                                </div>
                                <div className={style.line_priory}>
                                    <input type="number" value={+line.priory} onChange={(e)=>changePriory(e.target.value, indexLine)}></input>
                                </div>
                                <div className={style.line_multi}>
                                    <div className={style.line_edit} onClick={()=>{setData(line); setEditPack(true)}}><i className="fa-solid fa-pen-to-square"/></div>
                                    <div className={style.line_del} onClick={()=>delPacks(line.id, line.name)}><i className="fa-solid fa-trash-can"/></div>
                                </div>
                            </div>
                        ))}


                    </div>


                </div>
            </div>


        </div>
    )
}

export default PacketsReaFarm