import style from './EditActivities.module.scss'
import {useEffect, useState} from "react";
import NewsService from "../../services/NewsService";
import {useMessage} from "../../hooks/message.hook";

function EditActivities ({act, setActivemodal}){
    const message = useMessage();
    const [namelist, setNamelist] = useState('')
    const [nameline, setNameLine] = useState('')
    const [descline, setDescLine] = useState('')
    const [urlline, setUrlLine] = useState('')

    const [listplaces, setListPlaces] = useState([])

    const plusPlaces = async ()=>{
        try{
            if(nameline.length>2 && urlline.length>2){
                const {data} = await NewsService.plusPlaces({name: nameline, desc: descline, url: urlline, line: act})
                if(data){
                    getLines()
                    message('Площадка успешно добавлена')
                    setNameLine('')
                    setDescLine('')
                    setUrlLine('')
                }
            }else{
                message('Внимание! \nОбязательные поля: "Наименование площадки" и "Адрес для перенаправления"')
            }
        }catch(e){
            console.log(e)
        }
    }

    const getLines = async () => {
        try{
            const {data} = await NewsService.getPlaces({act})
            setListPlaces(data)
            console.log(data)
        }catch(e){
            console.log(e)
        }
    }

    const delLine = async (id, name) => {
        try{
            const {data} = await NewsService.delPlace({id})
            if(data){
                getLines()
                message(`Площадка ${name} успешно удалена `)
            }
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
        if(act==='radio')setNamelist('Радио площадки')
        if(act==='tv')setNamelist('Телевидение')
        if(act==='cifra')setNamelist('Цифровые платформы')
        if(act==='pr')setNamelist('Реклама и маркетинг')
        if(act==='more')setNamelist('Другие активы')
        getLines()
    }, [act])

    return(
        <div className={style.main}>
            <div className={style.plus}>
                <div className={style.title}>{namelist}</div>
                <input type="text" className={style.name} value={nameline} onChange={(e)=>setNameLine(e.target.value)} placeholder='Наименование площадки'/>
                <input type="text" className={style.desc} value={descline} onChange={(e)=>setDescLine(e.target.value)} placeholder='Описание (для себя)'/>
                <input type="text" className={style.url} value={urlline} onChange={(e)=>setUrlLine(e.target.value)} placeholder='Адрес для перенаправления'/>
                <div className={style.btnplus} onClick={plusPlaces}>Добавить</div>
            </div>
            <div className={style.titleline}>
                <div className={style.line}>
                    <div className={style.line_name}>Название</div>
                    <div className={style.line_desc}>Описание</div>
                    <div className={style.line_url}>Ссылка на площадку</div>
                    <div className={style.del}></div>
                </div>
            </div>
            <div className={style.list}>
                {listplaces.map((line, indexLine) => (
                    <div key={indexLine} className={style.line}>
                        <div className={style.line_name}>{line.name}</div>
                        <div className={style.line_desc}>{line.desc}</div>
                        <div className={style.line_url}>{line.url}</div>
                        <div className={style.del}><i className="fa-solid fa-trash-can" onClick={()=>delLine(line.id, line.name)}/></div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default EditActivities