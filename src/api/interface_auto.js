import axios from "~/axios"
import { queryParams } from "~/composables/util"


export function getReportList(page,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/getreportdata/${page}${r}`
    )
}


export function updateManagerStatus(id,status){
    return axios.post(`/admin/manager/${id}/update_status`,{
        status
    })
}


export function createReportList(data){
    return axios.post(`/admin/addreportdata`,data)
}

export function updateManager(id,data){
    return axios.post(`/admin/manager/${id}`,data)
}

export function deleteReport(id){
    return axios.post(`/admin/deletereport/${id}/delete`)
}