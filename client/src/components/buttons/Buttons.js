import style from './Buttons.module.scss'

function Buttons(){
    return(
        <div className={style.main}>
            <div className={style.title_left_right}>
                <div className={style.btn_tit_left}><img src="/components/buttons/tit_left.svg" alt=""/></div>
                <div className={style.btn_tit_right}><img src="/components/buttons/tit_right.svg" alt=""/></div>
            </div>



        </div>
    )
}

export default Buttons