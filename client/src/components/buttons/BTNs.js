import style from './BTNs.module.scss'

function BTNs({btnName, btnText}){

    if(btnName === 'single'){
        return(
            <div className={`${style.funbtn} ${style.fun_b_l_b_standart}`}>{(btnText)?btnText:'Настройки...'}</div>
        )
    }
    if(btnName === 'write_close'){
        return(
            <div className={`${style.funbtn} ${style.fun_b_l_b_make}`}>{(btnText)?btnText:'Записать и закрыть'}</div>
        )
    }
    if(btnName === 'varius'){
        return(
            <div className={`${style.funbtn} ${style.fun_b_l_b_list}`}><img src="/components/buttons/variusicon.svg" alt=""/><p>{(btnText)?btnText:'Варианты'}</p></div>
        )
    }
    if(btnName === 'print'){
        return(
            <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/printicon.svg" alt=""/></div>
        )
    }
    if(btnName === 'save'){
        return(
            <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/saveicon.svg" alt=""/></div>
        )
    }
    if(btnName === 'search'){
        return(
            <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/searchicon.svg" alt=""/></div>
        )
    }
    if(btnName === 'mail'){
        return(
            <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/posticon.svg" alt=""/></div>
        )
    }
    // return(
    //     <div className={style.main}>
    //         {/*БЛОК ФУНКЦИОНАЛЬНЫЕ КНОПКИ*/}
    //         <div className={style.function_bnts}>
    //             <div className={style.function_bnts_line_btns}>
    //                 <div className={`${style.funbtn} ${style.fun_b_l_b_make}`}>Сформировать</div>
    //                 <div className={`${style.funbtn} ${style.fun_b_l_b_standart}`}>Настройки...</div>
    //                 <div className={`${style.funbtn} ${style.fun_b_l_b_list}`}><img src="/components/buttons/variusicon.svg" alt=""/><p>Варианты</p></div>
    //                 <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/printicon.svg" alt=""/></div>
    //                 <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/saveicon.svg" alt=""/></div>
    //                 <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/searchicon.svg" alt=""/></div>
    //                 <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/posticon.svg" alt=""/></div>
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default BTNs