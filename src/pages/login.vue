<template>
  <el-row  class="min-h-screen bg-indigo-600 ">

    <el-col :lg="16" :md="12" class="flex items-center justify-center">
        <div>
            <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
            <div class="text-gray-200 text-sm">此站点是AIG测试部门后台管理系统</div>
        </div>
    </el-col>

    <el-col :lg="8" :md="12" class="bg-light-50  flex items-center justify-center flex-col">
        <h2 class="font-bold text-3xl text-gray-800">欢迎登录</h2>
        <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
            <span class="h-[1px] w-16 bg-gray-200"></span>
            <span>账号密码登录</span>
            <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <el-form ref="formRef" :rules="rules" :model="form"  class="w-[250px]">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder-shown="请输入用户名">
                    <template #prefix>
                        <el-icon class="el-input__icon"><User /></el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" placeholder-shown="请输入密码" show-password>
                    <template #prefix>
                        <el-icon><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit">登 录</el-button>  
            </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>

<script setup>

import { ref,reactive,onMounted,onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { 
    toast,
    showFullLoding,
    hideFullLoding
 } from "~/composables/util"
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const form = reactive({
  username: '',
  password: ''
})



const rules = {

    username:[
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        },
    ],

    password:[
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        },
    ]
}

const loading = ref(false)
const formRef = ref(null)

const open2 = () => {
  ElNotification({
    title: 'Warning',
    message: 'This is a warning message',
    type: 'warning',
  })
}


const onSubmit = () => {

    formRef.value.validate((valid)=>{
    if(!valid){
        return false
    }
    loading.value = true

    store.dispatch("login",form).then(res=>{
        toast("登录成功")
        router.push("/")
    }).finally(()=>{
            loading.value = false
        })
    })
}


// 回车确定
function onKeyUp(e){

    if(e.key == "Enter") onSubmit()
}

onMounted(()=>{
    document.addEventListener("keyup", onKeyUp)
})

onBeforeUnmount(()=>{
    document.removeEventListener("keyup", onKeyUp)
})

</script>


<style scoped>

</style>