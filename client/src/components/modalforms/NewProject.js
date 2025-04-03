import style from './NewProject.module.scss'
import Select from "react-select/base";

function NewProject(){
    return(
        <div className={style.main}>
            <div className={style.up}>
                <div className={style.title}>Новый проект</div>

                <div className={style.titlestrock}>Номер БП в
                    соответствии с
                    Классификатором
                    бизнес-процессов</div>
                <select>
                    <option>В 2.9 «Строительство и эксплуатация систем учета электроэнергии»</option>
                </select>
                <div className={style.titlestrock}>Проект/мини проект</div>
                <select>
                    <option>Цифровой АДПУЭ</option>
                </select>
                <div className={style.titlestrock}>Программа</div>
                <select>
                    <option>Торум.ФЛ</option>
                    <option>Мобильное приложение "Мобильный подрядчик"</option>
                </select>
                <div className={style.titlestrock}>Наименование
                    потребности</div>
                <input placeholder={'Введите наимнование потребности'}/>
            </div>
            <div className={style.down}>
                <div className={style.more}>Далее</div>
            </div>


        </div>
    )
}

export default NewProject