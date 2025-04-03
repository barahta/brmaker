import style from './styles/Packets.module.scss'
import HeaderMain from "../components/header/HeaderMain";
import Navigation from "../components/nav/Nav";
import {useEffect, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import BigModal from "../components/modalwin/BigModal";
import EditActivities from "../components/forms/EditActivities";
import PlusPack from "../components/forms/PlusPack";
import {useMessage} from "../hooks/message.hook";
import NewsService from "../services/NewsService";
import EditPack from "../components/forms/EditPack";
import PlusPrice from "../components/forms/PlusPrice";
import EditPrice from "../components/forms/EditPrice";


function Prices () {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('com');
    const message = useMessage();
    const [data, setData] = useState('')
    const [editact, setEditact] = useState(false)
    const [plusPack, setPlusPack] = useState(false)
    const [editPack, setEditPack] = useState(false)
    const [list, setList] = useState([])

    const changePriory = async (value, line) => {
        const newarr = [...list]
        if(newarr[line].priory !== value){
            newarr[line].priory = value
            setList(newarr)
            try{
                const {data} = await NewsService.editPrioryPrice({id: newarr[line].id, priory: value})

            }catch(e){
                console.log(e)
            }
        }

    }

    const getPrices = async () => {
        try{
            const {data} = await NewsService.getAllPticesAvia({capter: company})
            if(data){
                data.reverse()
                console.log(data)
                setList(data)
            }
        }catch(e){
            console.log(e)
        }
    }

    const delPrice = async (id, name) =>{
        try{
            const {data} = await NewsService.delPrice({id})
            if(data){
                message('Программа "' + name + '" удалена')
                getPrices()
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getPrices()
    },[plusPack, editPack])
    return (
        <div className={style.bodymain}>
            <BigModal data={<PlusPrice com={company} setActivemodal={setPlusPack}/>} activemodal={plusPack} setActivemodal={setPlusPack} setData={setData}/>
            <BigModal data={<EditPrice pack={data} setPack={setData} com={company} setActivemodal={setEditPack}/>} activemodal={editPack} setActivemodal={setEditPack} setData={setData}/>
            <HeaderMain page={`./${company}`}/>
            <div className={style.main}>
                <div className={style.leftpath}>
                    <Navigation />
                </div>
                <div className={style.centerpath}>
                    <div className={style.nav}>
                        <Link to={`/company?com=${company}`} className={style.back}>
                            <i className="fa-solid fa-rotate-left"/>
                            <div className={style.namebtn}>Назад</div>
                        </Link>
                        <div className={style.pluspost} onClick={()=>setPlusPack(true)}>
                            <i className="fa-solid fa-plus"/>
                            <div className={style.namebtn}>Добавить Программу</div>
                        </div>
                    </div>
                    <div className={style.packs}>
                        <div className={style.title}>
                            <div className={style.title_num}>№</div>
                            <div className={style.title_name}>Наименование</div>
                            <div className={style.title_time}>Время</div>
                            <div className={style.title_price}>Стоимость</div>
                            <div className={style.title_desc}>Описание</div>
                            <div className={style.title_priory}>Показ (приоритет)</div>
                            <div className={style.title_multi}></div>
                        </div>
                        {(list)&&list.map((line, indexLine)=>(
                            <div key={indexLine} className={style.line}>
                                <div className={style.line_num}>{indexLine+1}</div>
                                <div className={style.line_name}>{line.name}</div>
                                <div className={style.line_time}>
                                    <p>Срок: {line.time} (дни)</p>
                                    <p>Теория: {line.theory} (часы)</p>
                                    <p>Практика: {line.practice} (часы)</p>
                                </div>
                                <div className={style.line_price}>
                                    <p>На нашем: {(line.priceour[0])&&'от'} {line.priceour[1]}</p>
                                    <p>На личном: {(line.priceyour[0])&&'от'} {line.priceyour[1]}</p>
                                </div>
                                <div className={style.line_desc}>
                                        <div className={style.line_desc_param}>{line.description}</div>
                                    {(line.programs)&&line.programs.map((prog, indexProg)=>(
                                        <div key={indexProg} className={style.line_desc_param}>{prog}</div>
                                    ))}
                                    {(line.discounts)&&line.discounts.map((discount, indexDisc)=>(
                                        <div key={indexDisc} className={style.line_desc_param}>{discount[0]+'% - '+discount[1]}</div>
                                    ))}

                                </div>
                                <div className={style.line_priory}>
                                    <input type="number" value={+line.priory} onChange={(e)=>changePriory(e.target.value, indexLine)}></input>
                                </div>
                                <div className={style.line_multi}>
                                    <div className={style.line_edit} onClick={()=>{setData(line); setEditPack(true)}}><i className="fa-solid fa-pen-to-square"/></div>
                                    <div className={style.line_del} onClick={()=>delPrice(line.id, line.name)}><i className="fa-solid fa-trash-can"/></div>
                                </div>
                            </div>
                        ))}


                    </div>


                </div>
            </div>


        </div>
    )
}

export default Prices