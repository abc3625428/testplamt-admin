<template>
    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
          <SearchItem label="关键词">
            <el-input v-model="searchForm.keyword" placeholder="请输入报告名" clearable></el-input>
          </SearchItem>
      </Search>
  
      <!-- 新增|刷新 -->
      <ListHeader @create="handleCreate" @refresh="getData"/>
  
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column label="报告名" width="200">
          <template #default="{ row }">
            <div class="flex items-center">
               <el-avatar :size="40" :src="row.avatar">
                  <img
                    src="https://img2.baidu.com/it/u=1177353373,4029348358&fm=253&fmt=auto&app=138&f=JPEG?w=660&h=372"
                  />
                </el-avatar>
                <div class="ml-3">
                  <h6>{{ row.report_name }}</h6>
                  <small>ID:{{ row.id }}</small>
                </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="全部执行用例" align="center">
          <template #default="{ row }">
            {{ row?.report_all || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="通过用例" align="center">
          <template #default="{ row }">
            {{ row?.report_pass || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="失败用例" align="center">
          <template #default="{ row }">
            {{ row?.report_fail || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="跳过用例" align="center">
          <template #default="{ row }">
            {{ row.report_skip || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="错误用例" align="center">
          <template #default="{ row }">
            {{ row.report_error || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="故障用例" align="center">
          <template #default="{ row }">
            {{ row?.report_failure || "-" }}
          </template>
        </el-table-column>
        <el-table-column label="执行完成时间" align="center">
          <template #default="{ row }">
            {{ row?.report_execution_time || "-" }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">

            <div>

              <el-button type="primary" size="small" text >

                  <a href=  {{scope.row.report_url}} target="_blank">查看报告</a>

              </el-button>
  
            <el-popconfirm title="是否要删除该报告？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
                  <template #reference>
                      <el-button text type="primary" size="small">删除</el-button>
                  </template>
              </el-popconfirm>
    
            </div>

          </template>
        </el-table-column>
      </el-table>

      <div style="height: 20px;"></div>
  
      <div class="flex items-center justify-end mt-5">
          <el-pagination background layout="prev, pager ,next" :total="total" :current-page="currentPage" :page-size="limit" @current-change="getData"/>
      </div>
  
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <ChooseImage v-model="form.avatar"/>
          </el-form-item>
          <el-form-item label="所属角色" prop="role_id">
            <el-select v-model="form.role_id" placeholder="选择所属角色">
              <el-option v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="content">
            <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
            </el-switch>
          </el-form-item>
        </el-form>
      </FormDrawer>
  
    </el-card>
  </template>
  <script setup>
  import { ref } from "vue"
  import ListHeader from "~/components/ListHeader.vue";
  import FormDrawer from "~/components/FormDrawer.vue";
  import ChooseImage from "~/components/ChooseImage.vue";
  import Search from "~/components/Search.vue";
  import SearchItem from "~/components/SearchItem.vue";
  
  import {
    getManagerList,
    updateManagerStatus,
    createManager,
    updateManager,
    deleteManager
  } from "~/api/manager"

  import {
    getReportList,
    deleteReport

  } from "~/api/interface_auto"
  
  import { useInitTable,useInitForm } from '~/composables/useCommon.js'
  
  const roles = ref([])
  
  const {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange
  } = useInitTable({
    searchForm:{
      keyword:""
    },
    getList:getReportList,
    onGetListSuccess:(res)=>{
      tableData.value = res.list.map(o => {
          o.statusLoading = false
          return o
      })
      total.value = res.totalCount
      roles.value = res.roles
    },
    delete:deleteReport,
    updateStatus:updateManagerStatus
  })
  
  const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handleCreate,
    handleEdit
  } = useInitForm({
    form:{
        username: "",
        password: "",
        role_id: null,
        status: 1,
        avatar: ""
    },
    getData,
    update:updateManager,
    create:createManager
  })
  
  
  </script>