import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";

export default class Store {
    user = {}
    isAuth = false
    isLoading = false
    constructor() {
        makeAutoObservable(this)
    }
    setAuth(bool){
        this.isAuth = bool
    }
    setUser(user){
        this.user = user
        if(!this.user.avatar) this.user.avatar = 'face.png'
    }
    setLoading(bool){
        this.isLoading = bool
    }
    async login(login,password) {
        try{
            const response = await AuthService.login(login,password)
            localStorage.setItem('token',response.data.accessToken)
            localStorage.setItem('user',response.data.user.name)
            localStorage.setItem('admin',response.data.user.admin)
            localStorage.setItem('avatar',response.data.user.avatar)
            localStorage.setItem('login',response.data.user.login)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch (e){
            return e
        }
    }
    async registration(login,password,tn,full_name,email,inn,moderator,account,unit) {
        try{
            const response = await AuthService.registration(login,password,tn,full_name,email,inn,moderator,account,unit)
            localStorage.setItem('token',response.data.accessToken)
            localStorage.setItem('user',response.data.user.name)
            localStorage.setItem('admin',response.data.user.admin)
            localStorage.setItem('avatar',response.data.user.avatar)
            localStorage.setItem('login',response.data.user.login)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }
    async logout() {
        try{
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('admin')
            localStorage.removeItem('avatar')
            localStorage.removeItem('login')
            this.setAuth(false)
            this.setUser({})
        }catch (e){
            console.log(e.response?.data?.message)
        }
    }
    async checkAuth(){
        this.setLoading(true)
        try{
            const response = await axios.get(`${API_URL}/auth/refresh`,{withCredentials:true})
            localStorage.setItem('token',response.data.accessToken)
            localStorage.setItem('user',response.data.user.name)
            localStorage.setItem('admin',response.data.user.admin)
            localStorage.setItem('avatar',response.data.user.avatar)
            localStorage.setItem('login',response.data.user.login)
            this.setAuth(true)
            this.setUser(response.data.user)
        }catch (e){
            console.log(e.response?.data?.message)
        }finally {
            this.setLoading(false)
        }
    }
}
