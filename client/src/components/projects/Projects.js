import style from './Projects.module.scss'
import {Link} from "react-router-dom";

function Projects() {
    const referenceImgSrc = window.localStorage.getItem('referenceImage') || '';

    return (
        <div className={style.main}>
            <Link to={'/bt'} className={style.project}>
                <div className={style.name}>Мини-проект "Цифровой АДПУЭ"</div>
            </Link>
            <div className={style.project}>
                <div className={style.name}>Мини-проект "Автоматизация учета установки ИСУЭ"</div>
            </div>
        </div>
    )
}

export default Projects