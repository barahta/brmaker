import style from './styles/VariousLearning.module.scss'
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

function VariousLearning () {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();

    const [learnTitle, setLearnTitle] = useState('')
    const [learnDesc, setLearnDesc] = useState('')
    const [theoryTitle, setTheoryTitle] = useState('')
    const [theoryDesc, setTheoryDesc] = useState('')

    const [listLearn, setListLearn] = useState([])
    const [listTheory, setListTheory] = useState([])

    const delLearn = async (index) => {
        const newarr = [...listLearn]
        newarr.splice(index, 1);
        setListLearn(newarr)
        try{
            const {data} = await NewsService.createListLeart({capter: company, learn: newarr})
            if(data){
                setLearnTitle('')
                setLearnDesc('')
            }
        }catch(e){
            console.log(e)
        }
    }

    const delTheory = async (index) => {
        const newarr = [...listTheory]
        newarr.splice(index, 1);
        setListTheory(newarr)
        try{
            const {data} = await NewsService.createListTheory({
                capter: company,
                desc: {desc: theoryDesc, list: newarr}
            })
            if (data) {
                setTheoryTitle('')
            }
        }catch(e){
            console.log(e)
        }
    }

    const getLearnTeory = async () => {
        try{
            const {data} = await NewsService.getLearnTeory({capter: company})
            console.log(data)
            if(data){
                setTheoryDesc(data.theory.desc)
                setListLearn(data.learn)
                setListTheory(data.theory.list)

            }
            console.log(data)
        }catch(e){
            console.log(e)
        }
    }

    const editDescTheory = async (value) => {
        setTheoryDesc(value)
        try{
            const {data} = await NewsService.editTheoryDesc({capter: company, desc: {desc: value, list: listTheory}})

        }catch(e){
            console.log(e)
        }
    }

    const createListLeart = async () => {
        if(learnTitle.length > 0 && learnDesc.length > 0){
            const newarr = [...listLearn]
            const newpoint = [learnTitle,learnDesc]
            newarr.push(newpoint)
            setListLearn(newarr)
            try{
                const {data} = await NewsService.createListLeart({capter: company, learn: newarr})
                if(data){
                    setLearnTitle('')
                    setLearnDesc('')
                }
            }catch(e){
                console.log(e)
            }
        }else{
            message('Заполните форму перед добавлением')
        }

    }

    const createListTheory = async () => {
        if(theoryTitle.length > 0) {
            const newarr = [...listTheory]
            newarr.push(theoryTitle)
            setListTheory(newarr)
            try {
                const {data} = await NewsService.createListTheory({
                    capter: company,
                    desc: {desc: theoryDesc, list: newarr}
                })
                if (data) {
                    setTheoryTitle('')
                }
            } catch (e) {
                console.log(e)
            }
        }else{
            message('Заполните поле Название для теоритической дисциплины')
        }

    }

    useEffect(()=>{
        getLearnTeory()
    }, [])

    return (
        <div className={style.bodymain}>
            <HeaderMain page={'./Новости'}/>
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
                    <div className={style.blocks}>
                        <div className={style.blocks_column}>
                            <div className={style.blocks_title}>Варианты обучения</div>
                            <div className={style.blocks_column_form}>
                                <label>Название</label>
                                <input value={learnTitle} onChange={(e)=>setLearnTitle(e.target.value)} type="text" className={style.newname}/>
                            </div>
                            <div className={style.blocks_column_form}>
                                <label>Описание</label>
                                <textarea value={learnDesc} onChange={(e)=>setLearnDesc(e.target.value)}  className={style.newdesc}/>
                            </div>
                            <div className={style.btn} onClick={createListLeart}>Добавить</div>
                            {(listLearn)&&listLearn.map((block, index)=>(
                                <div className={style.blocks_list_make} key={index}>
                                    <div className={style.blocks_list_name}>
                                        <p>{block[0]}</p>
                                        <i className="fa-solid fa-trash-can" onClick={()=>delLearn(index)}/>
                                    </div>
                                    <div className={style.blocks_list_desc} >{block[1]}</div>

                                </div>
                            ))}

                        </div>
                        <div className={style.blocks_column}>
                            <div className={style.blocks_title}>Теоретические дисциплины:</div>
                            <textarea value={theoryDesc} onChange={(e)=>editDescTheory(e.target.value)} className={style.staicdesc}/>
                            <div className={style.blocks_column_form}>
                                <label>Название</label>
                                <input value={theoryTitle} onChange={(e)=>setTheoryTitle(e.target.value)} type="text" className={style.newname}/>
                            </div>
                            <div className={style.btn} onClick={createListTheory}>Добавить</div>
                            <div className={style.blocks_list}>
                                {(listTheory)&&listTheory.map((block, index)=>(
                                    <div className={style.blocks_list_check} key={index}>
                                        <p>{block}</p>
                                        <i className="fa-solid fa-trash-can" onClick={()=>delTheory(index)}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default VariousLearning