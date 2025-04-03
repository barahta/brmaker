import style from './DeleteManStyle.module.scss'
import React, {useRef, useState} from "react";
import NewsService from "../../services/NewsService";
import {useMessage} from "../../hooks/message.hook";

function DeleteMan ({man, setActivemodal,setMandel}) {
    const message = useMessage();

    const delMan = async()=>{
        try{
            const {data} = await NewsService.delMan({id: man.id})
            if(data){
                setActivemodal(false)
                setMandel({})
                message(`Сотрудник удален из списка`)
            }
        }catch(e){
            console.log(e)
        }
    }

    return(
        <div className={style.main}>
            <div className={style.text}>
                Удалить {man.developers} {man.firstname} {man.lastname} ?
            </div>
            <div className={style.btns}>
                <div className={style.cancel} onClick={()=>{setActivemodal(false);setMandel({})}}>Отмена</div>
                <div className={style.delete} onClick={delMan}>Удалить</div>
            </div>
        </div>
    )
}

export default DeleteMan