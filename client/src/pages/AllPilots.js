import style from './styles/AllPilots.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import NewsPost from "../components/news/NewsPost";
import {useEffect, useState} from "react";
import BigModal from "../components/modalwin/BigModal";
import CreatePost from "../components/news/CreatePost";
import NewsService from "../services/NewsService";
import OpenPost from "../components/news/OpenPost";
import {Link, useLocation} from "react-router-dom";
import CreateTeacher from "../components/teachers/CreateTeacher";
import EditTeacher from "../components/teachers/EditTeacher";
import {useMessage} from "../hooks/message.hook";

function AllPilots () {

    const [data, setData] = useState('')
    const [activemodal, setActivemodal] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [openTeacher, setOpenTeacher] = useState(false)
    const [openPostCreate, setOpenPostCreate] = useState(false)
    const [thisPost, setThisPost] = useState({})
    const [deleted, setDeleted] = useState('')
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();

    const getTeachers = async () => {
        try{
            const {data} = await NewsService.getTeachersAvia({company})
            data.sort((a, b) => a.priory - b.priory);
            console.log(data)
            setTeachers(data)
        }catch(e){
            console.log(e)
        }
    }

    const delTeacher = async (id, name) => {
        try{
            const {data} = await NewsService.delTeacherAvia({id})
            if(data){
                getTeachers()
                message('Сотрудник ' + name + 'был удален из списка')
            }
        }catch(e){
            console.log(e)
        }
    }

    const changePriory = async (value, index) => {
        try{
            const newarr = [...teachers]
            newarr[index].priory = value
            setTeachers(newarr)
            const {data} = await NewsService.prioryTeachersAvia({id: newarr[index].id, priory: value})
            if(data){
                getTeachers()
            }
        }catch(e){

            console.log(e)
        }
    }

    useEffect(()=>{
        getTeachers()
    },[activemodal,openTeacher,deleted])
    return (
        <div className={style.bodymain}>
            <BigModal data={<CreateTeacher com={company} teacher={data} setActivemodal={setActivemodal}/>} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData}/>
            <BigModal data={<EditTeacher com={company} teacher={data} setActivemodal={setOpenTeacher}/>} activemodal={openTeacher} setActivemodal={setOpenTeacher} setData={setData}/>
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
                    <div className={style.teachers}>
                        {(teachers)&&teachers.map((teacher, index)=>(
                            <div className={style.teacher} key={index}>
                                <div className={style.teacher_photo}>
                                    <div className={style.teacher_photo_img} style={(teacher && teacher.photo.length > 0)?{backgroundImage: `url('${teacher.photo}')`}:{backgroundImage: `url('/files/news/nophoto.svg')`}}></div>
                                </div>
                                <div className={style.teacher_desc}>
                                    <div className={style.teacher_desc_name}>{teacher.name}</div>
                                    <div className={style.teacher_desc_dev}>{teacher.dev}</div>
                                    {(teacher.desc)&&teacher.desc.map((desc, indexDesc)=>(
                                        <div className={style.teacher_desc_Line} key={indexDesc}>
                                            <div className={style.teacher_desc_Line_point}></div>
                                            <div className={style.teacher_desc_Line_text}>{desc}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className={style.teacher_tools}>
                                    <div className={style.teacher_tools_priory}>
                                        {/*<input type="number" value={+line.priory} onChange={(e)=>changePriory(e.target.value, indexLine)}></input>*/}
                                        <input type="number"  value={+teacher.priory} onChange={(e)=>changePriory(e.target.value, index)}/>
                                    </div>
                                    <div className={style.teacher_tools_multi}>
                                        {/*<div className={style.line_edit} onClick={()=>{setData(line); setEditPack(true)}}><i className="fa-solid fa-pen-to-square"/></div>*/}
                                        {/*<div className={style.line_del} onClick={()=>delPrice(line.id, line.name)}><i className="fa-solid fa-trash-can"/></div>*/}
                                        <i className="fa-solid fa-pen-to-square" onClick={()=>{setData(teacher); setOpenTeacher(true)}}/>
                                        <i className="fa-solid fa-trash-can" onClick={()=>delTeacher(teacher.id, teacher.name)}/>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div className={style.rightpath}></div>
            </div>


        </div>
    )
}

export default AllPilots