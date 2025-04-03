import style from './PlusPrice.module.scss'
import {useEffect, useState} from "react";
import {useMessage} from "../../hooks/message.hook";
import NewsService from "../../services/NewsService";
import React, {useRef} from "react";
import imageCompression from "browser-image-compression";

function PlusPrice({com, setActivemodal}){
    const message = useMessage();
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [priceour, setPriceour] = useState('')
    const [priceyour, setPriceyour] = useState('')
    const [timeline, setTimeline] = useState('')
    const [theory, setTheory] = useState('')
    const [practice, setPractice] = useState('')
    const [publicdesc, setPublicdesc] = useState('')
    const [priory, setPriory] = useState(0)
    const [descline, setDescLine] = useState('')
    const [programlist, setProgramlist] = useState([])
    const [ot1, setOt1] = useState(false)
    const [ot2, setOt2] = useState(false)
    const [selectOpt, setSelectOpt] = useState('');
    const [programs, setPrograms] = useState([])
    const [alldiscount, setAllDiscount] = useState([])
    const [discount, setDiscount] = useState('');
    const [descDiscount, setDescDiscount] = useState('');

    const delDiscount = (index) => {
        const newarr = [...alldiscount]
        newarr.splice(index, 1)
        setAllDiscount(newarr)
    }

    const pushDiscount = () => {
        if(discount.length > 0){
            const newarr = [...alldiscount]
            newarr.push([discount, descDiscount])
            setAllDiscount(newarr)
            setDiscount('')
            setDescDiscount('')
        }else{
            message('Введите значение скидки')
        }
    }

    const getPrograms = async () => {
        try{
            const {data} = await NewsService.getProgramsAvia({capter: com})
            setPrograms(data)
        }catch(e){
            console.log(e)
        }

    }

    const delProgramsList = (index)=>{
        const newarr = [...programlist]
        newarr.splice(index, 1)
        setProgramlist(newarr)
    }

    const plusProgram = () => {
        if(selectOpt.length > 2){
            const newarr = [...programlist]
            newarr.push(selectOpt)
            setProgramlist(newarr)
            setSelectOpt('')
        }else{
            message('Не выбрана программа обучения')
        }
    }

    const createPrice = async () => {

        if(name.length > 2){
            try{
                const {data} = await NewsService.createPriceAvia({capter: com, name, description: time, priceour: [ot1, priceour], priceyour: [ot2, priceyour], time: timeline, theory: theory, practice, programs: programlist, discounts: alldiscount})
                if(data){
                    setName('')
                    setTime('')
                    setPriceour('')
                    setPriceyour('')
                    setTimeline('')
                    setTheory('')
                    setPractice('')
                    setProgramlist([])
                    setAllDiscount([])
                    setOt1(false)
                    setOt2(false)
                    setActivemodal(false)
                }
            }catch(e){
                console.log(e)
            }
        }else{
            message(`Не создано! Необходимо минимально заполнить Наименование`)
        }

    }

    useEffect(() => {
        getPrograms()
    }, [])

    return(
        <div className={style.main}>
            <div className={style.left_path}>
                <div className={style.title}>Добавление новой программы</div>
                <div className={style.name}>Наименование</div>
                <input type="text" placeholder='' value={name} onChange={(e)=>setName(e.target.value)}/>
                <div className={style.time}>Описание</div>
                <input type="text" placeholder='' value={time} onChange={(e)=>setTime(e.target.value)}/>
                <div className={style.price} style={(com==='hopefitness')?{}:{display:'none'}}>Подробное описание</div>
                <textarea value={publicdesc} onChange={(e)=>setPublicdesc(e.target.value)}  style={(com==='hopefitness')?{}:{display:'none'}}/>
                <div className={style.price}>Стоимость (наш самолет)</div>
                <div className={style.price_strock}>
                    <div className={style.otdesc}>
                        <div className={style.ot} onClick={(()=>setOt1(!ot1))}>
                            <div className={style.otenter} style={(!ot1)?{opacity:0}:{}}></div>
                        </div>
                        <div className={style.desc_ot}> - (если стоимость от этой суммы и выше)</div>
                    </div>

                    <input type="number" placeholder='' value={priceour} onChange={(e)=>setPriceour(e.target.value)}/>
                </div>
                <div className={style.price}>Стоимость (самолет курсанта)</div>
                <div className={style.price_strock}>
                    <div className={style.otdesc}>
                        <div className={style.ot} onClick={(()=>setOt2(!ot2))}>
                            <div className={style.otenter} style={(!ot2)?{opacity:0}:{}}></div>
                        </div>
                        <div className={style.desc_ot}> - (если стоимость от этой суммы и выше)</div>
                    </div>

                    <input type="number" placeholder='' value={priceyour} onChange={(e)=>setPriceyour(e.target.value)}/>
                </div>

                {/*<div className={style.priory}>*/}
                {/*    Приоритет:*/}
                {/*    <input type="number" value={priory} onChange={(e)=>setPriory(e.target.value)}></input>*/}
                {/*</div>*/}
            </div>
            <div className={style.right_path}>
                <div className={style.linepoint}>
                    <div className={style.namepoint}>Срок программы (дни)</div>
                    <input type="text" placeholder='' value={timeline} onChange={(e)=>setTimeline(e.target.value)}/>
                </div>
                <div className={style.linepoint}>
                    <div className={style.namepoint}>Кол-во теории (часы)</div>
                    <input type="text" placeholder='' value={theory} onChange={(e)=>setTheory(e.target.value)}/>
                </div>
                <div className={style.linepoint}>
                    <div className={style.namepoint}>Кол-во летней практики (часы)</div>
                    <input type="text" placeholder='' value={practice} onChange={(e)=>setPractice(e.target.value)}/>
                </div>
                <div className={style.title}>Варинаты обучения</div>
                <div className={style.desc}>
                    <div className={style.desc_plus}>
                        <select value={selectOpt} onChange={(e)=>setSelectOpt(e.target.value)}>selectOpt
                            setSelectOpt
                            <option></option>
                            {(programs)&&programs.map((opt, indexOpt)=>(
                                <option key={indexOpt} value={opt.name}>{opt.name}</option>
                            ))}
                        </select>
                        <div className={style.plusdesc_btn} onClick={plusProgram}>Добавить</div>
                    </div>
                    <div className={style.list}>
                        {programlist.map((prog, indexProg)=>(
                            <div key={indexProg} className={style.line}><i className="fa-solid fa-trash-can" onClick={()=>delProgramsList(indexProg)}/>{prog}</div>
                        ))}
                    </div>
                </div>
                <div className={style.discount}>
                    <div className={style.discount_name}>
                        Добавить скидку
                    </div>
                    <div className={style.discount_form}>
                        <input type="number" value={discount} onChange={(e)=>setDiscount(e.target.value)} className={style.percent} placeholder="Процент дисконта"/>
                        <input type="text" value={descDiscount} onChange={(e)=>setDescDiscount(e.target.value)} className={style.descpercent} placeholder="Описание"/>
                        <div className={style.btn} onClick={pushDiscount}>Добавить</div>
                    </div>
                    <div className={style.listdiscount}>
                        {(alldiscount)&&alldiscount.map((line, indexDiscount)=>(
                            <div className={style.line}>
                                <div className={style.percent}>{line[0]}%</div>
                                <div className={style.desc}>{line[1]}</div>
                                <div className={style.tools}><i className="fa-solid fa-trash-can" onClick={()=>delDiscount(indexDiscount)}/></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={style.line_btn} onClick={createPrice}>Создать</div>
        </div>
    )
}

export default PlusPrice