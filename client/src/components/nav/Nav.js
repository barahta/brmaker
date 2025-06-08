import style from './NavStyle.module.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import WriteModal from "../modalwin/WriteModal";
import NewProject from "../modalforms/NewProject";

function Navigation (){
    const [activemodal, setActivemodal] = useState(false)
    const [data, setData] = useState('')



    return (
        <div className={style.main}>
            <Link to='/' className={style.point}>
                <i className="fa-solid fa-folder-open"/>
                <div className={style.name}>My projects</div>
                <div className={style.active}></div>
            </Link>
            <div onClick={()=>setActivemodal(true)} className={style.point}>
                <i className="fa-solid fa-marker"/>
                <div className={style.name}>New project</div>
                <div className={style.active}></div>
            </div>
            <Link to='/staffingtable' className={style.point}>
                <i className="fa-solid fa-clipboard-user"/>
                <div className={style.name}>Staffing table</div>
                <div className={style.active}></div>
            </Link>
            <WriteModal activemodal={activemodal} setActivemodal={setActivemodal} data={<NewProject/>} setData={setData}/>
        </div>
    )
}

export default Navigation