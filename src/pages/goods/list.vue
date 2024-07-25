
<template>
    <div>

      <DynamicData/>
      <div style="height: 10px;"></div>

      <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <dataMapTwo/>
          </el-col>
          <el-col :span="12" :offset="0">
            <dataMapThree/>
          </el-col>
      </el-row>


    </div>
</template>
  
<script setup>

import dataMapTwo from "~/components/dataMapTwo.vue"
import dataMapThree from "~/components/dataMapThree.vue"
import DynamicData from "~/components/DynamicData.vue"


</script>

