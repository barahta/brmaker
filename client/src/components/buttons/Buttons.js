import style from './Buttons.module.scss'

function Buttons(){
    return(
        <div className={style.main}>
            {/*КНОПКИ НАЗАД-ВПЕРЕД*/}
            <div className={style.title_left_right}>
                <div className={style.btn_tit_left}><img src="/components/buttons/tit_left.svg" alt=""/></div>
                <div className={style.btn_tit_right}><img src="/components/buttons/tit_right.svg" alt=""/></div>
            </div>
            {/*МЕНЮ (РАЗДЕЛЫ В ОТКРЫТОМ ОКНЕ)*/}
            <div className={style.points_block}>
                <div className={style.points_block_line}>
                    <div className={`${style.points_block_line_point} ${style.points_block_backcolor_grey}`}>Основное</div>
                    <div className={style.points_block_line_point}>ИКУ/ТСО</div>
                    <div className={style.points_block_line_point}>Подпись (по умолчанию)</div>
                    <div className={style.points_block_line_point}>Контактные лица</div>
                    <div className={style.points_block_line_point}>Шаблоны уведомлений</div>
                </div>
            </div>
            {/*БЛОК "ОТБОРЫ"*/}
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
                                <div className={style.block_f_p_line_left_name}>Дата СМР(план)</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_dateinto}>
                                    <input type="date" className={style.block_f_p_line_right_dateinto_input}/>
                                    <div className={style.block_f_p_line_right_dateinto_slash}> - </div>
                                    <input type="date" className={style.block_f_p_line_right_dateinto_input}/>
                                    <div className={style.btn_more}>...</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Отделение</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_choice}>
                                    <input type="text" className={style.block_f_p_line_right_choice_input}/>
                                    <div className={style.block_f_p_line_right_choice_more}>...</div>
                                    <div className={style.block_f_p_line_right_choice_close}><i className="fa-solid fa-xmark"/></div>
                                </div>
                            </div>
                        </div>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Населенный пункт</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_choice}>
                                    <input type="text" className={style.block_f_p_line_right_choice_input}/>
                                    <div className={style.block_f_p_line_right_choice_more}>...</div>
                                    <div className={style.block_f_p_line_right_choice_close}><i className="fa-solid fa-xmark"/></div>
                                </div>
                            </div>
                        </div>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Подрядчик</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_choice}>
                                    <input type="text" className={style.block_f_p_line_right_choice_input}/>
                                    <div className={style.block_f_p_line_right_choice_more}>...</div>
                                    <div className={style.block_f_p_line_right_choice_close}><i className="fa-solid fa-xmark"/></div>
                                </div>
                            </div>
                        </div>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Статус</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_choice}>
                                    <input type="text" className={style.block_f_p_line_right_choice_input}/>
                                    <div className={style.block_f_p_line_right_choice_more}>...</div>
                                    <div className={style.block_f_p_line_right_choice_close}><i className="fa-solid fa-xmark"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.block_filters_positions_list}>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Дата СМР(факт)</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_dateinto}>
                                    <input type="date" className={style.block_f_p_line_right_dateinto_input}/>
                                    <div className={style.block_f_p_line_right_dateinto_slash}> - </div>
                                    <input type="date" className={style.block_f_p_line_right_dateinto_input}/>
                                    <div className={style.btn_more}>...</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Наименование работ</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_choice}>
                                    <input type="text" className={style.block_f_p_line_right_choice_input}/>
                                    <div className={style.block_f_p_line_right_choice_more}>...</div>
                                    <div className={style.block_f_p_line_right_choice_close}><i className="fa-solid fa-xmark"/></div>
                                </div>
                            </div>
                        </div>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Потребитель</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_choice}>
                                    <input type="text" className={style.block_f_p_line_right_choice_input}/>
                                    <div className={style.block_f_p_line_right_choice_more}>...</div>
                                    <div className={style.block_f_p_line_right_choice_close}><i className="fa-solid fa-xmark"/></div>
                                </div>
                            </div>
                        </div>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Проект</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_choice}>
                                    <input type="text" className={style.block_f_p_line_right_choice_input}/>
                                    <div className={style.block_f_p_line_right_choice_more}>...</div>
                                    <div className={style.block_f_p_line_right_choice_close}><i className="fa-solid fa-xmark"/></div>
                                </div>
                            </div>
                        </div>
                        <div className={style.block_filters_positions_line}>
                            <div className={style.block_f_p_line_left}>
                                <div className={style.checkbox_box}></div>
                                <div className={style.block_f_p_line_left_name}>Этап</div>
                            </div>
                            <div className={style.block_f_p_line_right}>
                                <div className={style.block_f_p_line_right_choice}>
                                    <input type="text" className={style.block_f_p_line_right_choice_input}/>
                                    <div className={style.block_f_p_line_right_choice_more}>...</div>
                                    <div className={style.block_f_p_line_right_choice_close}><i className="fa-solid fa-xmark"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*БЛОК ФУНКЦИОНАЛЬНЫЕ КНОПКИ*/}
            <div className={style.function_bnts}>
                <div className={style.function_bnts_line_btns}>
                    <div className={`${style.funbtn} ${style.fun_b_l_b_make}`}>Сформировать</div>
                    <div className={`${style.funbtn} ${style.fun_b_l_b_standart}`}>Настройки...</div>
                    <div className={`${style.funbtn} ${style.fun_b_l_b_list}`}><img src="/components/buttons/variusicon.svg" alt=""/><p>Варианты</p></div>
                    <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/printicon.svg" alt=""/></div>
                    <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/saveicon.svg" alt=""/></div>
                    <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/searchicon.svg" alt=""/></div>
                    <div className={`${style.funbtn} ${style.fun_b_l_b_img}`}><img src="/components/buttons/posticon.svg" alt=""/></div>
                </div>
            </div>
        </div>
    )
}

export default Buttons