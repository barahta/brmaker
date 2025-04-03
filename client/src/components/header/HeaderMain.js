import style from './HeaderMain.module.scss'

import {Context} from "../../index";
import {useContext} from "react";
function HeaderMain ({page}) {

    const {store} = useContext(Context)
    return (
        <div className={style.main}>
            <div className={style.logo}>
                <img src="/files/logos/logomain.png" alt=""/>
            </div>
            <div className={style.pages}>{page}/</div>
            <div className={style.right}>
                <div className={style.lk}>
                    <i className="fa-solid fa-user"/>
                    <div className={style.name}>{store.user.name}</div>
                </div>
                <div onClick={() => store.logout()} className={style.btnexit}>ВЫХОД</div>
            </div>

        </div>
    )
}

export default HeaderMain