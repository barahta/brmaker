import style from './styles/Main.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useParams} from "react-router-dom";
import Buttons from "../components/buttons/Buttons";

function ThisProject () {
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
                    <Buttons />
                </div>
                <div className={style.rightpath}></div>
            </div>
        </div>
    )
}

export default ThisProject