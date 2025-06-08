import style from './BT.module.scss'
import {Link} from "react-router-dom";

function BT() {
    const referenceImgSrc = window.localStorage.getItem('referenceImage') || '';

    return (
        <div className={style.main}>
            <Link to={'/thisproject?project=newproject'} className={style.project}>
                <div className={style.window} ><img src={referenceImgSrc}/></div>
                <div className={style.name}>Пример таблицы 1</div>
            </Link>
            <div className={style.project}>
                <div className={style.window}></div>
                <div className={style.name}>Мини-проект "Автоматизация учета установки ИСУЭ"</div>
            </div>
        </div>
    )
}

export default BT