import axios from "~/axios"
import { queryParams } from "~/composables/util"



export function login(username,password){
    return axios.post("/user/login",{
        username,
        password
    })
}

export function get_userinfo(){
    return axios.post("/user/getuserinfo")
}

export function userquit(){
    return axios.post("/user/userquit")
}


export function updatepassword(data){
    return axios.post("/admin/updatepassword",data)
}

export function getManagerList(page,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/manager/${page}${r}`)
}


export function updateManagerStatus(id,status){
    return axios.post(`/admin/manager/${id}/update_status`,{
        status
    })
}


export function createManager(data){
    return axios.post(`/admin/manager`,data)
}

export function updateManager(id,data){
    return axios.post(`/admin/manager/${id}`,data)
}

export function deleteManager(id){
    return axios.post(`/admin/manager/${id}/delete`)
}