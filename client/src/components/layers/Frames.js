import style from './Frames.module.scss'

function Frames ({frameName, tables}) {
    if(frameName === 'windows'){
        return (
            <div className={style.points_block}>
                <div className={style.points_block_line}>
                    {Array.isArray(tables) && tables.map((opt, indexOpt)=>{

                        return(
                            <div key={indexOpt} className={`${style.points_block_line_point} ${(opt[1])?style.points_block_backcolor_grey:''}`}>{opt[0]}</div>
                        )

                    })}
                    {/*<div className={`${style.points_block_line_point} ${style.points_block_backcolor_grey}`}>Основное</div>*/}
                    {/*<div className={style.points_block_line_point}>Доп. 1</div>*/}
                    {/*<div className={style.points_block_line_point}>Доп. 2</div>*/}
                </div>
            </div>
        )
    }
    if(frameName === 'selections'){
        return (
            <div className={style.block_filters}>
                <div className={style.block_filters_open}>
                    <div className={style.block_filters_open_arrow}><img src="/components/buttons/arrow-open.svg" alt=""/></div>
                    <div className={style.block_filters_open_name}>Отборы</div>
                </div>
                <div className={style.block_filters_positions}>
                    <div className={style.block_filters_positions_list}>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Отбор 1</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_dateinto}>
                                    <input type="date" className={style.block_f_p_line_right_dateinto_input}/>
                                    <div className={style.block_f_p_line_right_dateinto_slash}> - </div>
                                    <input type="date" className={style.block_f_p_line_right_dateinto_input}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if(frameName === 'table'){
        return (
            <div className={style.block_table}>
                <div className={style.block_table_title}>
                    <div className={`${style.block_table_title_td} ${style.first}`}>Таблица</div>
                    <div className={style.block_table_title_td}></div>
                    <div className={style.block_table_title_td}></div>
                </div>
                <div className={style.block_table_line}>
                    <div className={`${style.block_table_line_td} ${style.first}`}></div>
                    <div className={style.block_table_line_td}></div>
                    <div className={style.block_table_line_td}></div>
                </div>
            </div>
        )
    }
    if(frameName === 'list'){
        return (
            <div className={style.block_list}>
                <div className={style.scrolling}>
                    <div className={style.scrolling_up}><i className="fa-solid fa-caret-up"/></div>
                    <div className={style.scrolling_track}>
                        <div className={style.scrolling_grabs}></div>
                    </div>
                    <div className={style.scrolling_up}><i className="fa-solid fa-caret-down"/></div>
                </div>
                <div className={style.block_list_title}>
                    <div className={`${style.block_list_title_td} ${style.first}`}><div className={style.back}>Список</div></div>
                    <div className={style.block_list_title_td}><div className={style.back}></div></div>
                    <div className={style.block_list_title_td}><div className={style.back}></div></div>
                </div>
                <div className={style.block_list_line}>
                    <div className={`${style.block_list_line_td} ${style.first}`}></div>
                    <div className={style.block_list_line_td}></div>
                    <div className={style.block_list_line_td}></div>
                </div>
                <div className={style.block_list_line} style={{backgroundColor: '#EEE'}}>
                    <div className={`${style.block_list_line_td} ${style.first}`}></div>
                    <div className={style.block_list_line_td}></div>
                    <div className={style.block_list_line_td}></div>
                </div>
                <div className={style.block_list_line}>
                    <div className={`${style.block_list_line_td} ${style.first}`}></div>
                    <div className={style.block_list_line_td}></div>
                    <div className={style.block_list_line_td}></div>
                </div>
            </div>
        )
    }

}

export default Frames