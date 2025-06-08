import style from './styles/Main.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useParams} from "react-router-dom";
import Buttons from "../components/buttons/Buttons";
import ChihardaTable from "../components/tabels/Chiharda";

function StaffingTable () {
    const params = useParams()

    const projectParam = params.project


    return (
        <div className={style.bodymain}>
            <HeaderMain page={'./projectParam'}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    Штатное расписание
                </div>
                <div className={style.rightpath}></div>
            </div>
        </div>
    )
}

export default StaffingTable