import {useCallback} from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useMessage = () => {
    return useCallback(text => {
        setTimeout(()=>{
            if(text){
                toast(text,{
                    theme: "dark",
                    style: {
                        zIndex: '10000000000',
                        boxShadow: '0px 0px 2px 0px rgba(255, 255, 255, 0.7)'
                    }
                });
            }
        },0)

    },[])
}