import style from './styles/Group.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import NewsService from "../services/NewsService";
import {useMessage} from "../hooks/message.hook";
import BigModal from "../components/modalwin/BigModal";
import OpenPost from "../components/news/OpenPost";
import CreateGroupCom from "../components/forms/CreateGroupCom";
import EditGroupCom from "../components/forms/editGroupCom";

function Group () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [data, setData] = useState('')
    const [activemodal, setActivemodal] = useState(false)
    const [news, setNews] = useState([])
    const [openPost, setOpenPost] = useState(false)
    const [thisPost, setThisPost] = useState({})
    const [openDel, setOpenDel] = useState('close')
    const [delIDcom, setDelIDcom] = useState(undefined)
    const [editmodal,setEditmodal] = useState(false)
    const deleteComGroup = async () => {
        if(openDel !== 'close' && delIDcom !== undefined){
            try{
                const delcom = await NewsService.delComGroup({delIDcom})
                if(delcom){
                    const arrnews = [...news]
                    arrnews.splice(openDel, 1)
                    setNews(arrnews)
                    setOpenDel('close')
                    setDelIDcom(undefined)
                    message('Компания успшнео удалена из группы')
                }else{
                    message('Что-то пошло не так, попробуйте снова')
                }
            }catch(e){
                console.log(e)
            }
        }else{
            setOpenDel('close')
            setDelIDcom(undefined)
            message('Ошибка выбора компании, попробуйте снова')
        }
    }

    const openCloseDelete = (index, id, open)=>{
        if(open){
            setOpenDel(index)
            setDelIDcom(id)
        }else{
            setOpenDel('close')
            setDelIDcom(undefined)
        }
    }

    const getGroupCompanyes = async () => {
        try{
            const {data} = await NewsService.getGroupCompanyes()
            const posts = data.reverse()
            const sortedArray = posts.sort((a, b) => a.number - b.number);
            console.log(sortedArray)
            setNews(sortedArray)
        }catch(e){
            console.log(e)
        }
    }

    const rePosition = async (id, value) => {
        const arrnews = [...news]
        let number = value
        if(!value || value.length === 0){number = 0}
        arrnews.forEach(com=>{
            if(com.id === id)com.number=number
        })
        setNews(arrnews)
        try{
            const updatePos = await NewsService.updatePosComGroup({id, number})
        }catch(e){
            console.log(e)
        }

    }

    useEffect(()=>{
        getGroupCompanyes()
    },[activemodal,openPost,editmodal])
    return (
        <div className={style.bodymain}>
            <BigModal data={<OpenPost thisPost={thisPost} setActivemodal={setOpenPost}/>} activemodal={openPost} setActivemodal={setOpenPost} setData={setData}/>
            <BigModal data={<CreateGroupCom setActivemodal={setActivemodal}/>} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData}/>
            <BigModal data={<EditGroupCom news={data} setActivemodal={setEditmodal}/>} activemodal={editmodal} setActivemodal={setEditmodal} setData={setData}/>
            <HeaderMain page={'./Группа компаний'}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <div className={style.nav}>
                        <Link to={`/`} className={style.back}>
                            <i className="fa-solid fa-rotate-left"/>
                            <div className={style.namebtn}>Назад</div>
                        </Link>
                        <div className={style.pluspost} onClick={()=>setActivemodal(true)}>
                            <i className="fa-solid fa-plus"/>
                            <div className={style.namebtn}>Добавить компанию</div>
                        </div>
                    </div>

                    {news.map((com, indexcom)=>(
                        <div key={indexcom} className={style.companygroup}>
                            <div className={style.group_left}>
                                <img src={`${com.logo}`} alt="" height='300px'/>
                                {com.name}
                            </div>
                            <div className={style.group_center}>
                                <div className={style.imgcover} style={(com.image)?{backgroundImage:`url('${com.image}')`}:{}}></div>
                                <div key={indexcom} className={style.group_center_desc}>{com.desc}</div>
                            </div>
                            <div  className={style.group_right}>
                                <input type="number" className={style.group_right_position} value={com.number} onChange={(e)=>rePosition(com.id, e.target.value)}/>
                                <div className={style.group_right_contact}>{com.contacts}</div>
                                <div className={style.group_right_delete}><i className="fa-solid fa-trash-can" onClick={()=>openCloseDelete(indexcom, com.id, 1)}/>
                                    <div className={style.delete_pos} style={(openDel === indexcom)?{display: 'flex'}:{}}>
                                        <div className={style.delete_pos_quest} >Удалить?</div>
                                        <div className={style.delete_pos_btn}>
                                            <div className={style.delete_pos_btn_del} onClick={deleteComGroup}>Удалить</div>
                                            <div className={style.delete_pos_btn_cancel} onClick={()=>openCloseDelete(indexcom, com.id, 0)}>Закрыть</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.edit}><i className="fa-solid fa-pen-to-square" onClick={()=>{setData(com);setEditmodal(true)}}/></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.rightpath}></div>
            </div>


        </div>
    )
}

export default Group