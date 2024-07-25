<template>

    <el-row :gutter="20" class="mt-5">
        <el-col :span="3" :offset="0" v-for="(item, index) in iconNavs" :key="index">
            <el-card shadow="hover" @click="$router.push(item.path)">
                <div class="flex flex-col items-center justify-center cursor-pointer">
                    <el-icon :size="15" class="text-purple-500">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span class="text-sm mt-2">{{item.title}}</span>
                </div>
            </el-card>
       
        </el-col>
    </el-row>
</template>

<script setup>

const iconNavs = [
        {
            icon:"user",
            color:"text-light-blue-500",
            title:"用户表",
            path:"/userCentre"
        },
        {
            icon:"promotion",
            color:"text-violet-500",
            title:"数据中心",
            path:"/dataCentre"
        },
        {
            icon:"tickets",
            color:"text-fuchsia-500",
            title:"--",
            path:"/order/list"
        },
        {
            icon:"chat-dot-square",
            color:"text-teal-500",
            title:"--",
            path:"/comment/list"
        },
        {
            icon:"picture",
            color:"text-rose-500",
            title:"图库",
            path:"/materialCentre"
        },
        {
            icon:"bell",
            color:"text-green-500",
            title:"公告",
            path:"/set/show"
        },
        {
            icon:"set-up",
            color:"text-grey-500",
            title:"--",
            path:"/setting/base"
        },
        {
            icon:"files",
            color:"text-yellow-500",
            title:"--",
            path:"/coupon/list"
        }
    ]

</script>