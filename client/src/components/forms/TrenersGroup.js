import style from './TrenersGroup.module.scss'
import {useEffect, useState} from "react";
import {useMessage} from "../../hooks/message.hook";
import NewsService from "../../services/NewsService";
import imageCompression from "browser-image-compression";
import React, {useRef} from "react";
import {useLocation} from "react-router-dom";

function TrenersGroup({pack, setPack, com, setActivemodal}){
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [namegroup, setNameGroup] = useState('')
    const [descGroup, setDescGroup] = useState('')
    const [price, setPrice] = useState('')
    const [priory, setPriory] = useState(0)
    const [descline, setDescLine] = useState('')
    const [desclist, setDescList] = useState([])
    const [list, setList] = useState([])
    const fileInputRef = useRef(null);
    const [imgpage, setImgpage] = useState('');

    const getTrenersGroup = async () => {
        try{
            const {data} = await NewsService.getTrenersGroup({capter: company})
            setList(data)
        }catch(e){
            console.log(e)
        }
    }

    const plusTrenersGroup = async () => {
        if(namegroup.length > 0 && descGroup.length > 0){
            try{
                const {data} = NewsService.plusTrenersGroup({name: namegroup, capter: company, desc: descGroup})

                    setNameGroup('')
                    setDescGroup('')
                getTrenersGroup()
            }catch(e){
                console.log(e)
            }
        }else{
            message('Заполните все поля')
        }

    }

    const delTrenersGroup = async (id, name) => {
        try{
            const {data} = await NewsService.delTrenersGroup({id})
            if (data){
                message('Группа "' + name + '" удалена')
                getTrenersGroup()
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getTrenersGroup()
    },[])

    return(
        <div className={style.main}>
            <div className={style.title}>Группы тренеров</div>
            <div className={style.formplus}>
                <input type="text" className={style.nameinput} value={namegroup} onChange={(e)=>setNameGroup(e.target.value)}/>
                <input type="text" className={style.descinput} value={descGroup} onChange={(e)=>setDescGroup(e.target.value)}/>
                <div className={style.btnplus} onClick={plusTrenersGroup}>Добавить</div>
            </div>
            <div className={style.list}>
                {(list && list.length > 0)&&list.map((group, index)=>(
                    <div key={index} className={style.line}>
                        <div className={style.name}>{group.name}</div>
                        <div className={style.desc}>{group.desc}</div>
                        <div className={style.tools}>
                            <i className="fa-solid fa-trash-can" onClick={()=>delTrenersGroup(group.id, group.name)}/>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default TrenersGroup