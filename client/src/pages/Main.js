import style from './styles/Main.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Companies from "../components/companies/Companies";
import Navigation from "../components/nav/Nav";
import Projects from "../components/projects/Projects";

function Main () {


    return (
        <div className={style.bodymain}>
            <HeaderMain page={'.'}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <Projects />
                </div>
                <div className={style.rightpath}></div>
            </div>
        </div>
    )
}

export default Main