import style from './NewsPostStyle.module.scss'
import React from "react";
import NewsService from "../../services/NewsService";
import {useState} from "react";
import OpenPost from "./OpenPost";
import BigModal from "../modalwin/BigModal";
import ViewNews from "./ViewNews";
function NewsPost ({post,thisPost,openPost,openPostCreate,setOpenPostCreate,setThisPost,setOpenPost,setDeleted}) {



    const delNewsPost = async (id) => {
        try{
            const {data} = await NewsService.delNewsPost({id})
            if(data){
                setDeleted(data)
            }
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className={style.main}>
            <BigModal data={<ViewNews news={thisPost} width={'900px'}/>} activemodal={openPost} setActivemodal={setOpenPost} setData={setThisPost}/>
            <div className={style.images} onClick={()=>{setOpenPost(true); setThisPost(post)}} style={(post.image.length > 0)?{backgroundImage: `url('${post.image}')`}:{backgroundImage: `url('/files/news/nophoto.svg')`}}></div>
            <div className={style.desc}>
                <div className={style.title}>{post.title}</div>
                <div className={style.description}>{post.desc}</div>
                <div className={style.content}>
                    {(post.text && post.text.join(' ').length > 80)?post.text.join(' ').slice(0,950):post.text}
                </div>
            </div>
            <div className={style.settings} style={{display: 'flex', flexDirection: 'column'}}>
                <i className="fa-solid fa-pen-to-square" onClick={()=>{setThisPost(post);setOpenPostCreate(true)}}/>
                <br/>
                <i className="fa-solid fa-trash-can" onClick={()=>delNewsPost(post.id)}/>
            </div>
        </div>
    )
}

export default NewsPost