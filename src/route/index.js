import {
    createRouter,
    createWebHashHistory
}from 'vue-router'

import Index from '~/pages/index.vue'
import NotFound from '~/pages/404.vue'
import Login from '~/pages/login.vue'
import Admin from '~/layouts/admin.vue'
import GoodList from '~/pages/goods/list.vue'
import UserList from '~/pages/userCentre/userCentre.vue'
import CategoryList from '~/pages/materialCentre/materialCentre.vue'
import NoticeList from '~/pages/notice/list.vue'
import Manager from '~/pages/manager/list.vue'
import InterfaceAuto from '~/pages/interfaceAuto/result.vue'



//默认路由
const routes = [
{
    path: '/',
    name:'admin',
    component: Admin,
    
},
{
    path:'/:pathMatch(.*)*',
    name:'NotFound',
    component:NotFound
},
{
    path:'/login',
    name:'Login',
    component:Login
}
]

//动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [{
    path:"/",
    name:"/",
    component:Index,
    meta:{
        title:"主控台"
    }
}
,{
    path:"/dataCentre",
    name:"/dataCentre",
    component:GoodList,
    meta:{
        title:"数据中心"
    }
}
,{
    path:"/materialCentre",
    name:"/materialCentre",
    component:CategoryList,
    meta:{
        title:"物料中心"
    }
}
,{
    path:"/userCentre",
    name:"/userCentre",
    component:Manager,
    meta:{
        title:"用户中心"
    }
}
,{
    path:"/set/show",
    name:"/set/show",
    component:NoticeList,
    meta:{
        title:"公告列表"
    }
}
,{
    path:"/interface/result",
    name:"/interface/result",
    component:InterfaceAuto,
    meta:{
        title:"InterfaceAuto"
    }
}

]


export const router = createRouter(
    {
        history:createWebHashHistory(),
        routes
    }
)

//动态路由添加方法
export function addRoutes(menus){
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) =>{
        arr.forEach(e=>{
            let item = asyncRoutes.find(o=>o.path == e.frontpath)
            if(item && !router.hasRoute(e.frontpath)){
                router.addRoute("admin", item)
                hasNewRoutes = true
            }
            if(e.child && e.child.length >0){
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    console.log(router.getRoutes());
    return hasNewRoutes
}
