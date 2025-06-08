import style from './ThisProjectParam.module.scss'
import {Link} from "react-router-dom";

function ThisProjectParams ({isOpen, setIsOpen, net, setNet}) {

    return(
        <div className={style.main}>
            <div className={style.nav} onClick={()=>{setIsOpen(!isOpen)}}><i className="fa-regular fa-square-plus"/> new element</div>
            <div className={style.name}>Название блока</div>
            <Link to={'/bt'} className={style.nav}>Back to files <i className="fa-solid fa-circle-left"/></Link>
            <div className={style.nav} onClick={()=>{setNet(!net)}}><i className="fa-solid fa-bars"/>{(net)?' out net':' in net'}</div>
        </div>
    )
}

export default ThisProjectParams