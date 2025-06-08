import style from './Chiharda.module.scss'

function ChihardaTable (){
    return (
        <div className={style.main}>
            <div className={style.tabel_block}>
                <div className={style.tabel_block_titles}>
                    <div className={style.tabel_block_titles_column}>Отделение</div>
                    <div className={style.tabel_block_titles_column}>Населенный пункт</div>
                    <div className={style.tabel_block_titles_column}>Адрес</div>
                    <div className={style.tabel_block_titles_column}>Лицевой счет/договор</div>
                    <div className={style.tabel_block_titles_column}>Потребитель</div>
                    <div className={style.tabel_block_titles_column}>Наименование ИКУ</div>
                    <div className={style.tabel_block_titles_column}>Наименование ТСО</div>
                    <div className={style.tabel_block_titles_column}>Номер заводской</div>
                    <div className={style.tabel_block_titles_column}>Оборудование для монтажа</div>
                    <div className={style.tabel_block_titles_column}>Комплекс работ (факт)</div>
                    <div className={style.tabel_block_titles_column}>Подрядчик</div>
                    <div className={style.tabel_block_titles_column}>Субподрядчик</div>
                    <div className={style.tabel_block_titles_column}>Проект</div>
                    <div className={style.tabel_block_titles_column}>Этап</div>
                    <div className={style.tabel_block_titles_column}>Дата СМР (план)</div>
                    <div className={style.tabel_block_titles_column}>Дата СМР (факт)</div>
                    <div className={style.tabel_block_titles_column}>Статус</div>
                    <div className={style.tabel_block_titles_column}>Номер маршрутного листа</div>
                </div>
                <div className={style.tabel_block_line}></div>
            </div>
        </div>
    )
}

export default ChihardaTable