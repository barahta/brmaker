import style from './Bear.module.scss'

function Bear (){
    return(
        <div className={style.bear}>
            <div className={style.btn}>Жми здесь</div>
        </div>
    )
}

export default Bear