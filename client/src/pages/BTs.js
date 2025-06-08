import style from './styles/Main.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import BT from "../components/projects/BT";

function BTs () {


    return (
        <div className={style.bodymain}>
            <HeaderMain page={'.'}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <BT />
                </div>
                <div className={style.rightpath}></div>
            </div>
        </div>
    )
}

export default BTs