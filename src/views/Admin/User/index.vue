<script setup lang="ts">
import {
  RPAAuditDeveloperAPI,
  RPACheckAdminAPI,
  RPADelUserAPI,
  RPAEditUserAPI,
  RPAUserQueryAPI,
} from '@/api/admin/user'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import defaultAvatar from '@/assets/svg/default-avatar.svg'
import EditUserDialog from './EditUserDialog.vue'
import { getUrlPathAfterDomain } from '@/utils/format'
import { fileHostUrl } from '@/views/home'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { generateUniqueNumber, getSplitStrName } from '@/utils/tools'
import { MD5 } from '@ksware/micro-lib-web-temp'
import { RPASendMessageLiteAPI } from '@/api/admin/license'
import { useEnterSubmit } from '@/hooks/useEnterSubmit'

// 回车搜索逻辑
const { onEnter, onCompositionStart, onCompositionEnd } = useEnterSubmit(() => {
  searchTable()
})

interface IFromType {
  /** 昵称 */
  userName: string
  /** 用户手机 */
  phone: string
  /** 是否申请 */
  isApply: string | number
  /** 是否为开发者 */
  isDeveloper: string | number
}

const treeTableRef = ref<any>(null)

const form = reactive<IFromType>({
  userName: '',
  phone: '',
  isApply: '',
  isDeveloper: '',
})

const currentPage = ref(1)
const pageSize = ref(20)
const pageTotal = ref(0)

const tableData = ref<any[]>([])

const paramsValue = computed(() => {
  const params: any = { UserName: form.userName, Phone: form.phone }
  if (form.isApply || form.isDeveloper) {
    params.IsDeveloper = form.isApply
  } else {
    params.IsDeveloper = form.isDeveloper
  }
  params.DeveloperState = form.isDeveloper
  params.PageNum = (currentPage.value - 1) * pageSize.value
  params.PageSize = pageSize.value

  return params
})

const column = ref([
  {
    type: 'checkbox',
    width: '50',
    align: 'center',
  },
  {
    field: 'userIcon',
    title: '头像',
    width: '120',
  },
  {
    field: 'name',
    title: '昵称',
    width: '150',
  },
  {
    field: 'phone',
    title: '手机',
    width: '150',
  },
  {
    field: 'eMail',
    title: '邮箱',
    width: '150',
  },
  {
    field: 'registerTime',
    title: '注册时间',
    width: '180',
  },
  {
    field: 'city',
    title: '地址',
    minWidth: '120',
  },
  {
    field: 'signature',
    title: '签名',
    minWidth: '180',
  },
  {
    field: 'isApply',
    title: '是否申请',
    minWidth: '100',
    align: 'center',
  },
  {
    field: 'marketAdmin',
    title: '市场管理员',
    minWidth: '100',
    align: 'center',
  },
  {
    field: 'cloudDevelopment',
    title: '云开发',
    minWidth: '100',
    align: 'center',
  },
  {
    field: 'isDeveloper',
    title: '是否为开发者',
    minWidth: '100',
    align: 'center',
  },
  {
    field: 'isAdmin',
    title: '是否为管理员',
    minWidth: '100',
    align: 'center',
  },
  {
    field: 'opt',
    title: '操作',
    minWidth: '120',
    fixed: 'right',
  },
])

/** 获取用户数据 */
const getUserList = async () => {
  const { rows, total } = await RPAUserQueryAPI(paramsValue.value)
  tableData.value = rows
  pageTotal.value = total
}
/** 初始化 */
async function initWindow() {
  getUserList()
}
/** 页码变化 */
const pageChange = (page: number) => {
  currentPage.value = page
  getUserList()
}

/** 搜索 */
const searchTable = () => {
  currentPage.value = 1
  getUserList()
}
/** 重置 */
const reset = () => {
  currentPage.value = 1
  form.userName = ''
  form.phone = ''
  form.isApply = ''
  form.isDeveloper = ''
  getUserList()
}

onMounted(() => {
  initWindow()
})

/** 设置市场管理员 */
async function changeMarketAdmin(item: any) {
  const { marketAdmin, id } = item
  const params = { EditID: id, NewAdmin: marketAdmin ? 2 : 0 }
  await RPAEditUserAPI(params)
  item.marketAdmin = marketAdmin
  item.cloudDevelopment = false
  item.isAdmin = false
}
/** 设置云开发 */
async function changeCloudDevelop(item: any) {
  const { cloudDevelopment, id } = item
  const params = { EditID: id, NewAdmin: cloudDevelopment ? 3 : 0 }
  await RPAEditUserAPI(params)
  item.cloudDevelopment = cloudDevelopment
  item.marketAdmin = false
  item.isAdmin = false
}
/** 设置同意成为开发者 */
async function chageDeveloper(item: any) {
  const { isDeveloper, id } = item
  const params = { EditID: id, DeveloperState: isDeveloper ? 1 : 0 }
  await RPAAuditDeveloperAPI(params)
  item.isDeveloper = isDeveloper
}
/** 设置同意成为管理员 */
async function chageAdmin(item: any) {
  const { isAdmin, id } = item
  const params = { EditID: id, NewAdmin: isAdmin ? 1 : 0 }
  await RPAEditUserAPI(params)
  item.isAdmin = isAdmin
  item.marketAdmin = false
  item.cloudDevelopment = false
}

const editUserParams = ref<any>({
  visible: false,
  title: '修改用户信息',
  cancel: () => (editUserParams.value.visible = false),
})

/** 昵称重复,重试次数 */
const retryCount = ref(0)
async function retrySetUserInfo(params: any) {
  try {
    await RPAEditUserAPI(params)
    KMessage.success('修改成功!')
    initWindow()
  } catch (error: any) {
    if (error.sError.includes('当前昵称已被注册')) {
      if (retryCount.value < 5) {
        retryCount.value++
        const Name = params.Name
        const userName = getSplitStrName(Name)
        const suffix = '#' + generateUniqueNumber()
        const data = { ...params, Name: userName + suffix }
        retrySetUserInfo(data)
      }
    }
  }
}

/** 修改弹框 */
function editUser(item: any) {
  editUserParams.value.visible = true
  editUserParams.value.data = item
  editUserParams.value.confirm = async (data: any) => {
    const Icon = getUrlPathAfterDomain(fileHostUrl, data.userIcon)
    const City = data.city.join('/')
    const params = {
      EditID: data.userId,
      Icon,
      Name: data.fullName,
      City,
      Signature: data.signature,
      Reason: data.updateReason,
      ResNum: data.errorCount,
    }
    retrySetUserInfo(params)
  }
}

/** 注销 */
const handleLogOff = async (row: any) => {
  await KMessageBox.confirm(`确定要注销"${row.name}"吗?`, '注销', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
  const { value: pwd } = await KMessageBox.prompt('管理员请输入密码确认', '管理员确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputType: 'password',
    inputPattern: /\S/,
    inputErrorMessage: '密码不能为空',
  })
  const params = { AdminPass: MD5(pwd) }
  await RPACheckAdminAPI(params)
  // 确认完身份
  const delParams = { UserID: row.id }
  await RPADelUserAPI(delParams)
  KMessage.success(`注销用户"${row.name}"成功!`)
  initWindow()
}

/** 消息推送 */
const onMessageSend = async () => {
  if (!treeTableRef.value) return
  const rows = treeTableRef.value.getCheckboxRecords()
  if (rows.length === 0) {
    KMessage.warning('请先选择用户!')
    return
  }
  const ids = rows.map((item: any) => item.id).filter(Boolean)
  const { value } = await KMessageBox.prompt('管理员请输入密码确认', '管理员确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputType: 'textarea',
    inputPattern: /\S/,
    inputErrorMessage: '内容不能为空',
  })
  await KMessageBox.confirm(`是否推送消息"${value.trim()}"给选中的${ids.length}个用户?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'success',
  })
  const params = { Content: value.trim(), ID: ids.join(','), MessageFrom: '' }
  await RPASendMessageLiteAPI(params)
  KMessage.success('推送成功!')
  treeTableRef.value.clearCheckboxRow()
}
</script>

<template>
  <div class="user-index">
    <div class="header-search">
      <KInput
        v-model="form.userName"
        style="width: 180px"
        placeholder="用户昵称"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @keydown.enter="onEnter"
      />
      <KInput
        v-model="form.phone"
        style="width: 180px"
        placeholder="用户手机"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @keydown.enter="onEnter"
      />
      <k-select v-model="form.isApply" clearable placeholder="是否申请" style="width: 180px" @change="searchTable">
        <k-option label="全部" value="" />
        <k-option label="是" value="1" />
        <k-option label="否" value="0" />
      </k-select>
      <k-select
        v-model="form.isDeveloper"
        clearable
        placeholder="是否为开发者"
        style="width: 200px"
        @change="searchTable"
      >
        <k-option label="全部" value="" />
        <k-option label="是" value="1" />
        <k-option label="否" value="0" />
      </k-select>
      <k-button icon-left="IconSearch" main @click="searchTable">搜索</k-button>
      <k-button icon-left="IconRotateClockwise" main @click="reset">重置</k-button>
      <k-button icon-left="IconPaperAirplane" main @click="onMessageSend">消息推送</k-button>
    </div>
    <div class="main-box">
      <div class="table-box">
        <k-tree-table
          ref="treeTableRef"
          :widgets="['refresh', 'transfer', 'sizeControl']"
          :data="tableData"
          :column="column"
          hight="100%"
          :row-style="{ height: 40 + 'px' }"
          @refresh="initWindow"
          :pagination-config="{
            layout: 'total,->, prev, pager, next, jumper',
            pageSize: pageSize,
            total: pageTotal,
            currentPage: currentPage,
            isRemotePaging: true,
          }"
          @page-change="pageChange"
        >
          <template #userIcon="{ row }">
            <k-image
              style="height: 40px; width: 40px; border-radius: 50%; overflow: hidden"
              :src="row.userIcon"
              fit="fill"
            >
              <template #error>
                <div class="image-slot">
                  <k-image
                    style="height: 40px; width: 40px; border-radius: 50%; overflow: hidden"
                    :src="defaultAvatar"
                    fit="fill"
                  />
                </div>
              </template>
            </k-image>
          </template>
          <template #isApply="{ row }">
            <k-tag :type="row.isApply ? 'primary' : 'info'">{{ row.isApply ? '是' : '否' }}</k-tag>
          </template>
          <template #marketAdmin="{ row }">
            <k-checkbox v-model="row.marketAdmin" label="" size="lg" class="mr-4" @change="changeMarketAdmin(row)" />
          </template>
          <template #cloudDevelopment="{ row }">
            <k-checkbox
              v-model="row.cloudDevelopment"
              label=""
              size="lg"
              class="mr-4"
              @change="changeCloudDevelop(row)"
            />
          </template>
          <template #isDeveloper="{ row }">
            <k-checkbox v-model="row.isDeveloper" label="" size="lg" class="mr-4" @change="chageDeveloper(row)" />
          </template>
          <template #isAdmin="{ row }">
            <k-checkbox v-model="row.isAdmin" label="" size="lg" class="mr-4" @change="chageAdmin(row)" />
          </template>
          <template #opt="{ row }">
            <k-button main size="sm" @click="editUser(row)">编辑</k-button>
            <k-button type="danger" main size="sm" @click="handleLogOff(row)">注销</k-button>
          </template>
        </k-tree-table>
      </div>
    </div>
  </div>
  <EditUserDialog v-if="editUserParams.visible" :params="editUserParams" />
</template>

<style lang="scss" scoped>
.user-index {
  width: 100%;
  height: 100%;
  .header-search {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    width: 100%;
    height: 60px;
  }
  .main-box {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: calc(100vh - 130px);
    .table-box {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
