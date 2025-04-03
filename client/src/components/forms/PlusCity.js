import style from './PlusCity.module.scss'
import {useEffect, useState} from "react";
import NewsService from "../../services/NewsService";
import {useMessage} from "../../hooks/message.hook";

function PlusCity({com, setCity, setActivemodal}){
    const message = useMessage();
    const [cities, setCities] = useState([])
    const [newcity, setNewCity] = useState('')

    const createCity = async () => {
        try{
            if(newcity.length>3){
                const {data} = await NewsService.createCity({capter: com, city: newcity})

                if(data === 'exists'){
                    message('Такой город уже существует')
                }else{
                    message('Город успешно добавлен')
                    setCity(newcity)
                    setActivemodal(false)
                    setNewCity('')
                }
            }else{
                message('Введите полное название города (более 3х знаков)')
            }
        }catch(e){
            console.log(e)
        }
    }

    const getCities = async () => {
        try{
            const {data} = await NewsService.getCities({capter: com})
            setCities(data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getCities()
    }, [com])
    return(
        <div className={style.main}>
            <div className={style.mycities}>
                <div className={style.title}>Ваши города</div>
                <div className={style.list}>
                    {(cities)&&cities.map((contact, indexContact)=>(
                        <div key={indexContact} className={style.cityname}>- {contact.city}</div>
                    ))}

                </div>
            </div>
            <div className={style.newcity}>
                <div className={style.title}>Добавить новый город</div>
                <input type="text" placeholder='Введите название города' value={newcity} onChange={(e)=>setNewCity(e.target.value)}/>
                <div className={style.btn} onClick={createCity}>Добавить</div>
            </div>
        </div>
    )
}

export default PlusCity