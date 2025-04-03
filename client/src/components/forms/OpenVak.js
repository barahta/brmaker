import style from './CreateVakStyle.module.scss'
import NewsService from "../../services/NewsService";
import {useEffect, useState} from "react";
import {useMessage} from "../../hooks/message.hook";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {useLocation} from "react-router-dom";

const ITEM_TYPE = 'POINT';

function DraggablePoint({ point, index, movePoint, listType, RedataText, delParams }) {
    const [{ isDragging }, ref] = useDrag({
        type: ITEM_TYPE,
        item: { index, listType },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
        hover(item) {
            if (item.listType === listType && item.index !== index) {
                movePoint(item.index, index);
                item.index = index; // Обновляем индекс после перемещения
            }
        },
    });

    return (
        <div
            ref={(node) => ref(drop(node))}
            className={style.point}
            style={{ backgroundColor: isDragging ? '#f1f1f1' : 'transparent' }}
        >
            <div className={style.coma}></div>
            <textarea
                value={point}
                onChange={(e) => RedataText(listType, e.target.value, index)}
                className={style.text}
            />
            <div className={style.trash}>
                <i className="fa-solid fa-trash" onClick={() => delParams(listType, index)} />
            </div>
        </div>
    );
}

function OpenVak({thisvak,setThisvak,setActivemodal}){

    const message = useMessage();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchcompany = params.get('com');
    const [mainName, setMainName] = useState('')
    const [allcoms, setAllcoms] = useState([])
    const [respon, setRespon] = useState('')
    const [allrespon, setAllRespon] = useState([])
    const [requierments, setRequierments] = useState('')
    const [allrequierments, setAllRequierments] = useState([])
    const [conditions, setConditions] = useState('')
    const [allconditions, setAllConditions] = useState([])
    const [keyskills, setKeyskills] = useState('')
    const [allkeyskills, setAllKeyskills] = useState([])
    const [company, setCompany] = useState( 'Omedia')
    const [email, setEmail] = useState('')

    useEffect(()=>{
        if(thisvak){
            setMainName(thisvak.name)
            setCompany(thisvak.company)
            setAllRespon(thisvak.respon)
            setAllRequierments(thisvak.requierments)
            setEmail(thisvak.email)
            setAllConditions(thisvak.conditions)
            setAllKeyskills(thisvak.keyskills)
        }

    },[thisvak])
    const createVak = async () => {
        try {
            if(mainName.length<2){
                message('Введите название вакансии')
            }else if(email.length<2){
                message('Укажите эл.почту на которую будет приходить Отклик')
            }else{
                const {data} = await NewsService.createVak({name: mainName, respon:allrespon, requierments:allrequierments, conditions:allconditions, keyskills:allkeyskills, company:company, email:email})
                if(data){
                    setActivemodal(false)
                    message(`О! Вакансия "${mainName}" успешно добавлена`)
                    setMainName('')
                    setRespon('')
                    setAllRespon([])
                    setRequierments('')
                    setAllRequierments([])
                    setConditions('')
                    setAllConditions([])
                    setKeyskills('')
                    setAllKeyskills([])
                    setCompany('')
                    setEmail('')
                }else{
                    message('Что-то пошло не так... Попробуйте еще раз')
                }
            }
        }catch(e){
            console.log(e)
        }
    }

    const movePoint = (listType, fromIndex, toIndex) => {
        let updatedList;
        if (listType === 'allrespon') {
            updatedList = [...allrespon];
            const [movedItem] = updatedList.splice(fromIndex, 1);
            updatedList.splice(toIndex, 0, movedItem);
            setAllRespon(updatedList);
        }
        if (listType === 'allrequierments') {
            updatedList = [...allrequierments];
            const [movedItem] = updatedList.splice(fromIndex, 1);
            updatedList.splice(toIndex, 0, movedItem);
            setAllRequierments(updatedList);
        }
        if (listType === 'allconditions') {
            updatedList = [...allconditions];
            const [movedItem] = updatedList.splice(fromIndex, 1);
            updatedList.splice(toIndex, 0, movedItem);
            setAllConditions(updatedList);
        }
        if (listType === 'allkeyskills') {
            updatedList = [...allkeyskills];
            const [movedItem] = updatedList.splice(fromIndex, 1);
            updatedList.splice(toIndex, 0, movedItem);
            setAllKeyskills(updatedList);
        }
    };
    const editVak = async () => {
        try{
            const {data} = await NewsService.editVak({id: thisvak.id, name: mainName, respon:allrespon, requierments:allrequierments, conditions:allconditions, keyskills:allkeyskills, company:company, email:email})

                setActivemodal(false)
                setThisvak(false)

        }catch(e){

        }
    }

    const delParams = (column, index) =>{
        let newarr
        if(column === 'respon'){
            newarr = [...allrespon]
            newarr.splice(index, 1);
            setAllRespon(newarr)
            message('Требование Удалено')
        }
        if(column === 'requierments'){
            newarr = [...allrequierments]
            newarr.splice(index, 1);
            setAllRequierments(newarr)
            message('Обязанность Удалена')
        }
        if(column === 'conditions'){
            newarr = [...allconditions]
            newarr.splice(index, 1);
            setAllConditions(newarr)
            message('Условие Удалено')
        }
        if(column === 'keyskills'){
            newarr = [...allkeyskills]
            newarr.splice(index, 1);
            setAllKeyskills(newarr)
            message('Ключевой навык Удален')
        }
    }

    const plusParams = (column)=>{
        let newarr
        if(column === 'respon' && respon.length > 2){
            newarr = [...allrespon]
            newarr.push(respon)
            setAllRespon(newarr)
            message('О! Требование добавлено')
            setRespon('')
        }else if(column === 'respon' && respon.length <= 2){
            message('Вы не ввели требование')
        }
        if(column === 'requierments' && requierments.length > 2){
            newarr = [...allrequierments]
            newarr.push(requierments)
            setAllRequierments(newarr)
            message('О! Обязанность добавлена')
            setRequierments('')
        }else if(column === 'requierments' && requierments.length <= 2){
            message('Вы не ввели обязанность')
        }
        if(column === 'conditions' && conditions.length > 2){
            newarr = [...allconditions]
            newarr.push(conditions)
            setAllConditions(newarr)
            message('О! Условие добавлено')
            setConditions('')
        }else if(column === 'conditions' && conditions.length <= 2){
            message('Вы не ввели условие')
        }
        if(column === 'keyskills' && keyskills.length > 2){
            newarr = [...allkeyskills]
            newarr.push(keyskills)
            setAllKeyskills(newarr)
            message('О! Ключевой навык добавлен')
            setKeyskills('')
        }else if(column === 'keyskills' && keyskills.length <= 2){
            message('Вы не ввели ключевой навык')
        }
    }

    const RedataText = (list, value, index) => {
        let arr
        if(list === 'allrespon'){
            arr = [...allrespon]
            arr[index] = value
            setAllRespon(arr)
        }
        if(list === 'allrequierments'){
            arr = [...allrequierments]
            arr[index] = value
            setAllRequierments(arr)
        }
        if(list === 'allconditions'){
            arr = [...allconditions]
            arr[index] = value
            setAllConditions(arr)
        }
        if(list === 'allkeyskills'){
            arr = [...allkeyskills]
            arr[index] = value
            setAllKeyskills(arr)
        }
    }

    const getVakCompany = async()=>{
        try {
            const {data}=await NewsService.getComVak({com: searchcompany})
            setAllcoms(data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getVakCompany()
    }, [])

    return(
        <DndProvider backend={HTML5Backend}>
        <div className={style.main}>
            <div className={style.title}>Укажите название новой вакансии</div>
            <div className={style.standart}>
                <input className={style.name} value={mainName} onChange={(e)=>setMainName(e.target.value)} placeholder='Наименование вакансии'/>
                <select value={company} onChange={(e) => setCompany(e.target.value)}>
                    {allcoms.map((com, indexcom)=>(
                        <option key={indexcom}>{com.name}</option>
                    ))}

                </select>
            </div>

            <div className={style.columns}>
                <div className={style.tab}>
                    <div className={style.titletab}>Требования</div>
                    <input className={style.name} value={respon} onChange={(e)=>setRespon(e.target.value)}/>
                    <div className={style.btntab} onClick={()=>plusParams('respon')}>Добавить</div>
                    <div className={style.points}>
                        {/*{allrespon.map((respon, indexres)=>(*/}
                        {/*    <div key={indexres} className={style.point}>*/}
                        {/*        <div className={style.coma}></div>*/}
                        {/*        <textarea value={respon} onChange={(e)=>RedataText('allrespon', e.target.value, indexres)} className={style.text}></textarea>*/}
                        {/*        /!*<div className={style.text}>{respon}</div>*!/*/}
                        {/*        <div className={style.trash}><i className="fa-solid fa-trash" onClick={()=>delParams('respon', indexres)}/></div>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                        {allrespon.map((respon, index) => (
                            <DraggablePoint
                                key={index}
                                index={index}
                                point={respon}
                                movePoint={(fromIndex, toIndex) => movePoint('allrespon', fromIndex, toIndex)}
                                listType="allrespon"
                                RedataText={RedataText}
                                delParams={delParams}
                            />
                        ))}
                    </div>
                </div>
                <div className={style.tab}>
                    <div className={style.titletab}>Обязанности</div>
                    <input className={style.name} value={requierments} onChange={(e)=>setRequierments(e.target.value)}/>
                    <div className={style.btntab} onClick={()=>plusParams('requierments')}>Добавить</div>
                    <div className={style.points}>
                        {/*{allrequierments.map((requier, indexreq)=>(*/}
                        {/*    <div key={indexreq} className={style.point}>*/}
                        {/*        <div className={style.coma}></div>*/}
                        {/*        <textarea value={requier} onChange={(e)=>RedataText('allrequierments', e.target.value, indexreq)} className={style.text}></textarea>*/}
                        {/*        /!*<div className={style.text}>{requier}</div>*!/*/}
                        {/*        <div className={style.trash}><i className="fa-solid fa-trash" onClick={()=>delParams('requierments', indexreq)}/></div>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                        {allrequierments.map((requier, index) => (
                            <DraggablePoint
                                key={index}
                                index={index}
                                point={requier}
                                movePoint={(fromIndex, toIndex) => movePoint('allrequierments', fromIndex, toIndex)}
                                listType="allrequierments"
                                RedataText={RedataText}
                                delParams={delParams}
                            />
                        ))}
                    </div>
                </div>
                <div className={style.tab}>
                    <div className={style.titletab}>Условия</div>
                    <input className={style.name} value={conditions} onChange={(e)=>setConditions(e.target.value)}/>
                    <div className={style.btntab} onClick={()=>plusParams('conditions')}>Добавить</div>
                    <div className={style.points}>
                        {/*{allconditions.map((cond, indexcond)=>(*/}
                        {/*    <div key={indexcond} className={style.point}>*/}
                        {/*        <div className={style.coma}></div>*/}
                        {/*        <textarea value={cond} onChange={(e)=>RedataText('allconditions', e.target.value, indexcond)} className={style.text}></textarea>*/}
                        {/*        /!*<div className={style.text}>{cond}</div>*!/*/}
                        {/*        <div className={style.trash}><i className="fa-solid fa-trash" onClick={()=>delParams('conditions', indexcond)}/></div>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                        {allconditions.map((cond, index) => (
                            <DraggablePoint
                                key={index}
                                index={index}
                                point={cond}
                                movePoint={(fromIndex, toIndex) => movePoint('allconditions', fromIndex, toIndex)}
                                listType="allconditions"
                                RedataText={RedataText}
                                delParams={delParams}
                            />
                        ))}
                    </div>
                </div>
                <div className={style.tab}>
                    <div className={style.titletab}>Ключевые навыки</div>
                    <input className={style.name} value={keyskills} onChange={(e)=>setKeyskills(e.target.value)}/>
                    <div className={style.btntab} onClick={()=>plusParams('keyskills')}>Добавить</div>
                    <div className={style.points}>
                        {/*{allkeyskills.map((skill, indexskill)=>(*/}
                        {/*    <div key={indexskill} className={style.point}>*/}
                        {/*        <div className={style.coma}></div>*/}
                        {/*        <textarea value={skill} onChange={(e)=>RedataText('allkeyskills', e.target.value, indexskill)} className={style.text}></textarea>*/}
                        {/*        /!*<div className={style.text}>{skill}</div>*!/*/}
                        {/*        <div className={style.trash}><i className="fa-solid fa-trash" onClick={()=>delParams('keyskills', indexskill)}/></div>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                        {allkeyskills.map((skill, index) => (
                            <DraggablePoint
                                key={index}
                                index={index}
                                point={skill}
                                movePoint={(fromIndex, toIndex) => movePoint('allkeyskills', fromIndex, toIndex)}
                                listType="allkeyskills"
                                RedataText={RedataText}
                                delParams={delParams}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={style.btns}>
                <div className={style.emailtitle}>Email для откликов: </div>
                <input className={style.email} value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Введите email'/>
                <div className={style.btn} onClick={editVak}>Сохранить</div>
            </div>
        </div>
        </DndProvider>
    )
}

export default OpenVak