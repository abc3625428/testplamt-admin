<template>
    <div>
        <el-row :gutter="20"> 

            <template v-if="panels.len == 0">
                <el-col :span="6" v-for="i in 4" :key="i">
                    <el-skeleton style="width: 100%;" animated loading>
                        <template #template>
                            <el-card shadow="always" :body-style="{ padding: '20px' }">
                                <template #header >
                                <div class="flex justify-between">
                                    <el-skeleton-item variant="text" style="width: 50%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                                </template>
                                <span class="text-3xl font-bold text-gray-500">
                                    <!-- <CounTo :value="item.value" /> -->
                                    <el-skeleton-item variant="h3" style="width: 80%" />
                                </span>
                                <el-divider/>
                                <div class="flex justify-between text-sm text-gray-500">
                                    <el-skeleton-item variant="text" style="width: 50%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-col>
            </template>


            <el-col :span="6" :offset="0" v-for="(item,index) in panels" :key="index">
                <el-card shadow="always" :body-style="{ padding: '20px' }">
                    <template #header >
                    <div class="flex justify-between">
                        <span class="text-sm font-bold">{{item.title}}</span>
                        <el-tag type="item.unitColor" effect="plain">
                            {{item.unit}}
                        </el-tag>
                    </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        <CountTo :value="item.value"></CountTo>
                    </span>
                    <el-divider/>
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{item.subTitle}}</span>
                        <span>{{item.subValue}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <IndexNavs />

        <div style="height: 20px;"></div>

        <el-row :gutter="20">
            <el-col :span="12" :offset="0">
                <IndexChart/>
            </el-col>
            <el-col :span="12" :offset="0">
                <IndexCard title="待解决"  tip="问题提示" :btns="goods" class="mb-3"/>
                <IndexCard title="已解决"  tip="错误统计" :btns="order"/>
            </el-col>
        </el-row>
        
    </div>
</template>

 
<script setup>

    import { ref } from "vue"
    import { 
        getStatistics1,
        getStatistics2
    } from "~/api/index.js"
    import CountTo from "~/components/CountTo.vue"
    import IndexNavs from "~/components/IndexNavs.vue"
    import IndexChart from "~/components/IndexChart.vue"
    import IndexCard from "~/components/IndexCard.vue"


    const panels = ref([])

    getStatistics1().then(res=>{
        panels.value = res.panels
    })

    const goods = ref([])
    const order = ref([])

    getStatistics2().then(res=>{
        goods.value = res.goods
        order.value = res.order
    })


</script>