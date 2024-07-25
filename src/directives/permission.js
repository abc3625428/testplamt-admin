import { Store } from "vuex"


function hasPermission(value, el=false){
    if(!Array.isArray(value)){
        throw new Error('需要配置权限，例如 v-permission="["get,GET"]"')

    }
    const hasAuth = value.findIndex(v=>Store.state.ruleNames.includes(v)) != -1
    if(el && !hasAuth){
        el.parentNode && el.parentNode.remove 
    }
}
export default{
    install(app){
        app.directive("permission",{
            mounted(el,binding) {
                binding.value
            },
        })
    }
}