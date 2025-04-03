import style from './styles/News.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import NewsPost from "../components/news/NewsPost";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import OpenPost from "../components/news/OpenPost";
import BigModal from "../components/modalwin/BigModal";
import CreateVak from "../components/forms/CreateVak";
import OpenVak from "../components/forms/OpenVak";


function Vakansii () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [newcom, setNewcom] = useState('')
    const [listcom, setListcom] = useState([])
    const [listVaks, setListVaks] = useState([])

    const getComVak = async () => {
        try {
            const {data} = await NewsService.getComVak({com: company})
            setListcom(data)
        }catch(e){
            console.log(e)
        }
    }
    const getVakansii = async () => {
        try {
            const {data} = await NewsService.getVakansii()
            setListVaks(data)
        }catch(e){
            console.log(e)
        }
    }

    const delComVak = async(com) =>{
        try{
            const {data} = await NewsService.delComVak({com})
            if(data){
                getComVak()
                message(`Компания ${com.name} удалена из списка для вакансий`)
            }
        }catch(e){
            console.log(e)
            message('О! Что-то пошло не так')
        }
    }

    const delThisVak = async (id) => {
        try{
            const {data} = await NewsService.delTisVak({id})
            if(data){
                message('Вакансия удалена')
                getVakansii()
            }
        }catch(e){

        }
    }

    const plusCom = async () => {
        if(newcom.length>2){
            try{
                const {data} = await NewsService.plusComVak({name:newcom, category: company})
                if(data){
                    getComVak()
                    setNewcom('')
                }
            }catch(e){
                console.log(e)
            }
        }else if(newcom.length>0){
            message('О! Название организации заполнено не полностью')
        }else{
            message('О! Введите название организации')
        }

    }

    const [data, setData] = useState('')
    const [createVakactive, setCreateVakactive] = useState(false)
    const [openVakactive, setOpenVakactive] = useState(false)
    const [thisvak, setThisvak] = useState(false)


    const editVak = vak => {
        setThisvak(vak)
        setOpenVakactive(true)
    }

    const reversOpenVak = async (index, id, openclose, name) => {
        console.log(index)
        console.log(id)
        console.log(!openclose)
        const newarr = [...listVaks]
        newarr[index].open = !openclose
        setListVaks(newarr)
        try{
            const {data} = await NewsService.editOpenVak({id, open: !openclose})
            if(data){
                if(!openclose){
                    message('Выключено')
                }else{
                    message('Включено')
                }

            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getComVak()
    },[])

    useEffect(()=>{
        getVakansii()
    },[createVakactive,thisvak])
    return (
        <div className={style.bodymain}>
            <BigModal data={<CreateVak setActivemodal={setCreateVakactive}/>} activemodal={createVakactive} setActivemodal={setCreateVakactive} setData={setData}/>
            <BigModal data={<OpenVak thisvak={thisvak} setThisvak={setThisvak} setActivemodal={setOpenVakactive}/>} activemodal={openVakactive} setActivemodal={setOpenVakactive} setData={setData}/>
           <HeaderMain page={'./Вакансии'}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>

                <div className={style.vakansii}>
                    <div className={style.centerpath} style={{overflow: 'hidden'}}>
                        <Link to={`/company?com=${company}`} className={style.pluspost} style={{color: '#454545', marginRight: '20px'}}>
                            <i className="fa-solid fa-rotate-left"/>
                            <div className={style.namebtn}>Назад</div>
                        </Link>
                    </div>
                    <div className={style.title}>Вакансии</div>
                    <div className={style.companies}>
                        <input type='text' value={newcom} onChange={(e)=>setNewcom(e.target.value)} className={style.inputcom}/>
                        <div className={style.pluscombtn} onClick={plusCom}>Добавить</div>
                        <div className={style.listcom}>
                            {listcom.map((com, index)=>(
                                <div className={style.activecom} key={index}>
                                    <div className={style.namecom}>{com.name}</div>
                                    <i className="fa-solid fa-trash" onClick={()=>delComVak(com)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.newvak}>
                        <div className={style.titlevak}>Все вакансии</div>
                        <div className={style.plusvakbtn} onClick={()=>setCreateVakactive(true)}>Добавить</div>
                    </div>
                    <div className={style.listvak}>
                        {listVaks.map((vak, indexvak)=>(
                            <div key={indexvak} className={style.thisvak}>
                                    <div className={style.vakcompany}>{vak.company}</div>
                                    <div className={style.vaktitle}>
                                        <div className={style.vakname}>{vak.name}</div>
                                        <div className={style.active}>
                                            <div className={style.open}><i className="fa-solid fa-trash" onClick={()=>delThisVak(vak.id)}></i></div>
                                            <div className={style.open}><i className="fa-regular fa-eye" onClick={()=>editVak(vak)}></i></div>
                                            <div className={(vak.open)?style.btnoff:style.btnon} onClick={()=>reversOpenVak(indexvak, vak.id, vak.open, vak.name)}>
                                                <div className={style.sphere}></div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Vakansii