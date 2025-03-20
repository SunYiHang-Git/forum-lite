<script setup>
import { Refresh } from '@element-plus/icons-vue'
import { callServerFunc, SQLTable } from '@ksware/micro-lib-web-temp/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

import UserFormDialog from './dialogs/UserFormDialog.vue'

const tableData = reactive([])
const containerDivRef = ref('')

const userFormDialog = reactive({
  visible: false,
  fromData: {},
  cancel() {
    userFormDialog.visible = false
  },
})

onMounted(() => {
  initWindow()
})

/** 初始化页面 */
function initWindow() {
  tableData.length = 0
  callServerFunc('TUserDM', 'GetUserList', {}, { loadingEl: containerDivRef.value.$el }).then(({ data }) => {
    // 用户目录
    const table = new SQLTable(data.QryGroup)
    table.first()
    while (!table.eof()) {
      const row = {}
      row.id = table.s('ID')
      row.pid = table.s('PID')
      row.name = table.s('Name')
      row.folder = true
      tableData.push(row)
      table.next()
    }

    // 用户
    const useTable = new SQLTable(data.QryUser)
    useTable.first()
    while (!useTable.eof()) {
      const row = {}
      row.id = useTable.s('ID')
      row.pid = useTable.s('PID')
      row.name = useTable.s('UserName')
      row.userId = useTable.s('UserID')
      row.online = useTable.s('Online')
      row.eMail = useTable.s('eMail')
      tableData.push(row)
      useTable.next()
    }
  })
}

/**
 * 删除用户
 *
 * @param row 用户信息
 */
function onDelUser(row) {
  ElMessageBox.confirm(`确定要删除用户“${row.name}”？`, '提示', { type: 'warning' }).then(() => {
    const data = { ID: row.id, Type: 'utUser' }
    callServerFunc('TUserDM', 'DelUser', data).then(() => {
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].id === row.id) {
          tableData.splice(i, 1)
          break
        }
      }
      ElMessage.success('删除成功')
    })
  })
}

/**
 * 增加用户
 *
 * @param row 用户信息
 */
function onAddUser(row) {
  // 弹窗标题
  userFormDialog.title = '增加用户'
  // 用户表单默认值
  userFormDialog.fromData = {}
  // 是否显示弹窗
  userFormDialog.visible = true
  // 是否为新增用户
  userFormDialog.isNew = true
  // 弹窗点击确认后的回调方法
  userFormDialog.confirm = ({ eMail, passEx, passWord, userId, userName }) => {
    // 整理后台需要的参数
    const userInfo = {
      WebJson: true,
      PID: row.id,
      eMail,
      PassWord: passWord,
      Pass: passEx,
      PassEx: passEx,
      UserName: userName,
      UserID: userId,
      // 是否为新增用户, 如果是修改则不用写该参数
      IsNew: true,
    }

    // 调用后台增加用户的接口
    callServerFunc('TUserDM', 'SetUserInfo', userInfo).then(({ data }) => {
      // 新增完成后，整理表格需要的参数
      const cRow = {}
      cRow.id = data.ID
      cRow.pid = row.id
      cRow.name = userName
      cRow.userId = userId
      cRow.eMail = eMail
      cRow.online = false
      // 加入到表格中
      tableData.push(cRow)
      // 弹窗关闭
      userFormDialog.visible = false
    })
  }
}

/**
 * 修改用户
 *
 * @param row 用户信息
 */
function onSetUser(row) {
  userFormDialog.title = '修改用户'
  userFormDialog.fromData = {
    userName: row.name,
    userId: row.userId,
    eMail: row.eMail,
  }
  userFormDialog.isNew = false
  userFormDialog.visible = true
  userFormDialog.confirm = ({ eMail, passEx, passWord, userId, userName }) => {
    const userInfo = {
      ID: row.id,
      WebJson: true,
      PID: row.pid,
      eMail,
      UserName: userName,
      UserID: userId,
    }

    // 如果密码有修改
    if (passWord) {
      userInfo.PassWord = passWord
      userInfo.PassEx = passEx
      userInfo.Pass = passEx
    }
    callServerFunc('TUserDM', 'SetUserInfo', userInfo).then(() => {
      row.name = userName
      row.eMail = eMail
      userFormDialog.visible = false
    })
  }
}
</script>
<template>
  <AppContainer ref="containerDivRef">
    <div class="btn-tool">
      <el-button :icon="Refresh" @click="initWindow">刷新</el-button>
    </div>
    <div class="table-div">
      <vxe-table
        ref="tableRef"
        border
        height="auto"
        :column-config="{ resizable: true }"
        :tree-config="{ transform: true, rowField: 'id', parentField: 'pid', trigger: 'cell' }"
        :data="tableData"
      >
        <vxe-column field="name" title="用户名称" tree-node>
          <template #default="{ $table, row }">
            <div class="td-name-field">
              <svg-icon
                v-if="row.folder"
                :icon-name="$table.isTreeExpandByRow(row) ? 'icon-wenjianer' : 'icon-wenjianyi'"
              ></svg-icon>
              <svg-icon v-else icon-name="icon-yonghu-oa"></svg-icon>
              {{ row.name }}
            </div>
          </template>
        </vxe-column>
        <vxe-column width="180" align="center" field="userId" title="登录ID"></vxe-column>
        <vxe-column width="250" field="eMail" title="eMail"></vxe-column>
        <vxe-column field="onTime" title="最近上线时间"></vxe-column>
        <vxe-column width="200" align="left" field="opt" title="操作">
          <template #default="{ row }">
            <el-button v-if="row.folder" @click="onAddUser(row)">增加</el-button>
            <el-button v-if="!row.folder" type="danger" @click="onDelUser(row)">删除</el-button>
            <el-button v-if="!row.folder" @click="onSetUser(row)">修改</el-button>
          </template>
        </vxe-column>
      </vxe-table>
    </div>

    <!-- 增加、修改用户窗口 -->
    <UserFormDialog
      v-if="userFormDialog.visible"
      :form-data="userFormDialog.fromData"
      :is-new="userFormDialog.isNew"
      :title="userFormDialog.title"
      @confirm="userFormDialog.confirm"
      @cancel="
        () => {
          userFormDialog.visible = false
        }
      "
    />
  </AppContainer>
</template>

<style lang="scss" scoped>
.btn-tool {
  height: 40px;
}

.table-div {
  height: calc(100% - 40px);
}

.td-name-field {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
