import { router, addRoutes } from "~/route"
import { getToken } from "~/composables/auth"
import { 
    toast,
    showFullLoding,
    hideFullLoding
 } from "~/composables/util"
 import store  from "./store"


let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
    
    showFullLoding()
    
    const token = getToken()

    //没有登录 强制跳转回登录页
    if(!token && to.path !="/login"){
        toast("请先登录","error")
        return next({path:"/login"})
    }

    if(token && to.path == "/login"){
        toast("请勿重复登录","error")
        return next({path:from.path ? from.path : "/"})
    }

    // 如果用户登录了，自动获取用户信息，并存储在vuex当中
    let hasNewRoutes = false
    if(token && !hasGetInfo){
        let { menus } = await store.dispatch("get_userinfo")
        hasGetInfo = true
        // 动态添加路由
        hasNewRoutes = addRoutes(menus)
    }

    let title = (to.meta.title ? to.meta.title:"") + "-AIG测试平台"
    document.title = title

    hasNewRoutes ? next(to.fullPath) :next()
})

//全局后置守卫
router.afterEach((to, from) => hideFullLoding())
