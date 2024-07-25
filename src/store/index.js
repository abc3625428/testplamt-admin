import { createStore } from 'vuex'
import { login,get_userinfo } from '~/api/manager'

import {
  setToken,
  removeToken
} from '~/composables/auth'

const store = createStore({
    state () {
      return {
        user:{},
        menus:[],
        ruleNames:[],

        asideWidth:"180px"

      }
    },

    mutations:{

      //记录用户信息
      SET_USERINFO(state,user){
        state.user = user
      },
      
      //侧边宽度
      handleAsideWidth(state){
        state.asideWidth= state.asideWidth == "180px" ? "49px" : "180px"
      },

      //菜单导航
      SET_MENUS(state,menus){
        state.menus = menus
      },

      //权限
      SET_RELENAMES(state,ruleNames){
        state.ruleNames = ruleNames
      }

       
    },

    actions:{
      // 登录
      login({ commit }, { username,password }){
          return new Promise((resolve,reject)=>{
              login(username,password).then(res=>{
                  setToken(res.token)

                  resolve(res)
              }).catch(err=>reject(err))
          })
      },

      // 获取当前登录用户信息
      get_userinfo({ commit }){
        return new Promise((resolve,reject)=>{
          get_userinfo().then(res=>{
                commit("SET_USERINFO",res)
                commit("SET_MENUS",res.menus)
                commit("SET_RULENAMES",res.ruleNames)
                resolve(res)
            }).catch(err=>reject(err))
        })
    },
    
      // 退出登录
      logout({ commit }){

          removeToken()

          commit("SET_USERINFO",{})
      }
    }

  })

export default store