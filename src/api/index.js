import axios from "~/axios";

export function getStatistics1(){
    return axios.get("/admin/getStatistics1")
} 

export function getStatistics3(type){
    return axios.get("/admin/getStatistics3?type="+type)
} 

export function getStatistics2(){
    return axios.get("/admin/getStatistics2")
}