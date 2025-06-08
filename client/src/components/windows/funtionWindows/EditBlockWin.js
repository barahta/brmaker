import style from './EditBlockWin.module.scss'
import {useEffect, useState} from "react";
import Frames from "../../layers/Frames";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function EditBlockWin({winEditBlock,setWinEditBlock,elements,setElements,editElem,setEditElem}){

    const [thisElem, setThisElem] = useState({})

    useEffect(()=>{
        let newElem = {}
        const newArr = [...elements]
        newArr.forEach(elem=>{
            if(elem.id === editElem){newElem=elem}
        })
        setThisElem(newElem)
    },[editElem])

    return(
        <div className={style.main} style={(winEditBlock)?{display: 'flex'}:{display: 'none'}}>
            <div className={style.exit} onClick={()=>setWinEditBlock(false)}><i className="fa-solid fa-xmark"/></div>
            <div className={style.workblock}>

                {(thisElem.type && thisElem.type === 'frame' && thisElem.name === 'selections')&&(
                    <Frames frameName={thisElem.name} tables={thisElem.table}/>
                )}

            </div>

        </div>
    )}

export default EditBlockWin