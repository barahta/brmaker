import style from './Projects.module.scss'
import {Link} from "react-router-dom";

function Projects() {

    return (
        <div className={style.main}>
            <Link to={'/thisproject?project=newproject'} className={style.project}>
                <div className={style.window}></div>
                <div className={style.name}>Реализация журнала задач по направлению уведомлений Реализация журнала задач по направлению уведомлений</div>
            </Link>
            <div className={style.project}>
                <div className={style.window}></div>
                <div className={style.name}>Реализация журнала задач по направлению уведомлений</div>
            </div>
            <div className={style.project}>
                <div className={style.window}></div>
                <div className={style.name}>Реализация журнала задач по направлению уведомлений</div>
            </div>
            <div className={style.project}>
                <div className={style.window}></div>
                <div className={style.name}>Реализация журнала задач по направлению уведомлений</div>
            </div>
            <div className={style.project}>
                <div className={style.window}></div>
                <div className={style.name}>Реализация журнала задач по направлению уведомлений</div>
            </div>
            <div className={style.project}>
                <div className={style.window}></div>
                <div className={style.name}>Реализация журнала задач по направлению уведомлений</div>
            </div>
            <div className={style.project}>
                <div className={style.window}></div>
                <div className={style.name}>Реализация журнала задач по направлению уведомлений</div>
            </div>
        </div>
    )
}

export default Projects