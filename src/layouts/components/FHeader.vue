<template>
    <div class="f-header">
        
        <span class="logo mr-5">
            <el-icon class="mr-3"><Sugar /></el-icon>
            AIG测试中心
        </span>
        <el-icon class="mr-1 icon-btn" @click="$store.commit('handleAsideWidth')">
            <fold v-if="$store.state.asideWidth == '180px'"/>
            <Expand v-else/>
        </el-icon>
        
        <div>
            <el-tooltip effect="dark" content="刷新" placement="bottom">
                <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
            </el-tooltip>
        </div>

        <div class="flex items-center ml-auto" style="margin-left: auto;">
            <el-icon class="mr-5 icon-btn" @click="toggle">
                <full-screen v-if="!isFullscreen"/>
                <aim v-else/>
            </el-icon>
            <el-dropdown class="dropdown" @command="handConmmand">
            <span class="flex items-center el-dropdown-link text-light-100 mr-3">
                <el-avatar :size="25" class="mr-2" />
                御弟哥哥
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu >
                <el-dropdown-item command="repassword">修改密码</el-dropdown-item>
                <el-dropdown-item command="logout" @click="userQuit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
            </el-dropdown>
        </div>
    </div>
</template>


<script setup>

import { useRouter } from 'vue-router'
import { userquit } from '~/api/manager'
import { useCookies } from '@vueuse/integrations/useCookies'
import { useFullscreen } from '@vueuse/core'
import {
  removeToken
} from '~/composables/auth'

const router = useRouter()
const { isFullscreen, toggle} = useFullscreen()

const handConmmand = (c)=>{
    switch(c){
        case "logout":
            
            break;
        case "repassword":
            console.log('213')
            break;
    }
}

const handleRefresh=()=>location.reload()

const userQuit = ()=>{
    removeToken()
    userquit()
    handleRefresh()
}


</script>


<style scoped>

.f-header{
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 right-0 left-0;
    height: 35px;
    z-index: 1000;
}
.logo{
    @apply flex items-center
}

.icon-btn{
    @apply flex justify-center items-center text-xl font-thin;
    width: auto;
    height: 35px;
    cursor: pointer;
}
.icon-btn:hover{
    @apply bg-indigo-500;
}
.f-header .dropdown{
    @apply bg-indigo-500;
}
.f-header .dropdown:hover{
    @apply bg-indigo-500;
}

</style>