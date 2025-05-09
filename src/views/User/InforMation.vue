<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import EditUserDialog from '@/views/User/components/EditUserDialog.vue'
import { useUser } from '@/store/modules/user'
import { storeToRefs } from 'pinia'
import { formatMobile, matchKeywords } from '@/utils/check'
// import UploadAvatar from '@/views/User/components/UploadFile/index.vue'
import UploadAvatar from '@/views/User/components/UploadAvatar/index.vue'
import { CheckPhoneCodeAPI, RPAApplyDeveloperAPI, SetRPAUserInfoAPI, SetRPAUserNewPassAPI } from '@/api/user'
import { KMessage, KMessageBox } from '@ksware/ksw-ux'
import { MD5 } from '@ksware/micro-lib-web-temp'
import { cityList } from '@/utils/city'
import Breadcrumb from '@/component/Breadcrumb/index.vue'
import { useCI18n } from '@/i18n'
import { generateUniqueNumber } from '@/utils/tools'
const { userInfo } = storeToRefs(useUser())
const { setUserInfo } = useUser()
const { t } = useCI18n()

interface RuleForm {
  /** 昵称 */
  userName: string
  /** 旧昵称 */
  oldUserName: string
  /** 姓名 */
  fullName: string
  /** 单位/学校 */
  company: string
  /** 性别 */
  sex: 0 | 1 | 2
  /** 所在城市 */
  city: string[]
  /** 个人简介 */
  signature: string
}
/** 昵称拼接后缀 */
const userNameSuffix = ref()
const { phone, userName, fullName, company, sex, city, avatar, signature, loginId, isDeveloper, userName_suffix } =
  userInfo.value
let cityArr: any = []
if (Array.isArray(city)) {
  cityArr = city
} else {
  cityArr = city.split('/')
}
const env = import.meta.env
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  userName: userName,
  oldUserName: userName,
  fullName: fullName,
  company: company,
  sex: sex,
  city: cityArr,
  signature: signature,
})
const rules = reactive<FormRules<RuleForm>>({
  userName: [
    { required: true, message: '此为必填项', trigger: 'blur' },
    {
      min: 1,
      max: 18,
      message: t('login.max18'),
      trigger: 'blur',
    },
    {
      validator: (rule, value, cb) => {
        const valid = matchKeywords(value)
        if (valid.matches.length > 0) {
          cb(new Error('不能使用"' + valid.matches[0] + '"作为昵称'))
        } else {
          cb()
        }
      },
      trigger: 'blur',
    },
  ],
  fullName: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  company: [{ required: true, message: '此为必填项', trigger: 'blur' }],
  sex: [{ required: true, message: '此为必选项', trigger: 'change' }],
  city: [{ required: true, message: '此为必填项', trigger: 'blur' }],
})

/** 修改弹框验证params */
const editDialogParams = ref<any>({
  visible: false,
  cancel: () => {
    editDialogParams.value.visible = false
  },
})

/** 昵称重复,重试次数 */
const retryCount = ref(0)

/** 重试提交资料 */
async function retrySetUserInfo(params: any, userInfoObj: any) {
  try {
    await SetRPAUserInfoAPI(params)
    KMessage.success('保存资料成功!')
    ruleForm.oldUserName = ruleForm.userName
    setUserInfo(userInfoObj)
  } catch (error: any) {
    if (error.sError.includes('当前昵称已被注册')) {
      if (retryCount.value < 3) {
        retryCount.value++
        const { userName } = ruleForm
        const data = { ...params, NewName: userName + '#' + generateUniqueNumber() }
        retrySetUserInfo(data, { ...userInfoObj, userName_suffix: '#' + generateUniqueNumber() })
      }
    }
  }
}

/** 保存资料 */
const submitForm = async () => {
  try {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate()
    await KMessageBox.confirm('是否确认保存资料?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success',
    })
    const { userName, oldUserName, fullName, company, sex, city, signature } = ruleForm
    const cityStr = city.join('/')
    const params = {
      UserName: oldUserName + userName_suffix,
      NewName: userName + userName_suffix,
      ChangeName: oldUserName !== userName,
      FullName: fullName,
      Sex: sex,
      Company: company,
      City: cityStr,
      Signature: signature,
    }
    const userInfoObj = { userName, fullName, company, sex, city: cityStr, signature }
    retrySetUserInfo(params, userInfoObj)
  } catch (error: any) {
    console.error(error)
  }
}

/** 修改手机号 */
const editPhone = async () => {
  editDialogParams.value.visible = true
  editDialogParams.value.title = '修改手机号'
  editDialogParams.value.desc = `当前登录手机号：${formatMobile(phone)}。你正在修改登录手机号，请输入新手机号完成修改`
  editDialogParams.value.type = 'editPhone'
  editDialogParams.value.confirm = async (data: any) => {
    editDialogParams.value.visible = false
    const { userName, oldUserName, fullName, company, sex, city, signature } = ruleForm
    const params = {
      UserName: oldUserName + userName_suffix,
      NewName: userName + userName_suffix,
      ChangeName: oldUserName !== userName,
      FullName: fullName,
      Sex: sex,
      Company: company,
      City: city,
      Signature: signature,
      Phone: data.phone,
      PhoneCode: data.code,
    }
    const userInfoObj = {
      userName,
      fullName,
      company,
      sex,
      city: city.join('/'),
      signature,
      phone: data.phone,
      userId: data.phone,
    }
    await SetRPAUserInfoAPI(params)
    setUserInfo(userInfoObj)
    KMessage.success('修改手机号成功!')
  }
}

/** 修改手机号--身份确认 */
const handleEditPhone = () => {
  try {
    editDialogParams.value.visible = true
    editDialogParams.value.phone = phone
    editDialogParams.value.title = '身份验证'
    editDialogParams.value.desc = `请输入发送至 ${formatMobile(phone)} 的验证码。`
    editDialogParams.value.type = 'authentication'
    editDialogParams.value.confirm = async (code: any) => {
      const params = { Phone: phone, PhoneCode: code }
      await CheckPhoneCodeAPI(params)
      editPhone()
    }
  } catch (error) {
    console.error(error)
  }
}

/** 修改密码 */
const handleEditPassword = () => {
  editDialogParams.value.visible = true
  editDialogParams.value.title = '修改密码'
  editDialogParams.value.desc = '为了你的账号安全，修改密码前需先验证旧密码。请输入登录“用户名”的旧密码'
  editDialogParams.value.type = 'editPassWord'
  editDialogParams.value.confirm = async (data: any) => {
    editDialogParams.value.visible = false
    const params = { Pass: MD5(data.pastPwd), NewPass: MD5(data.newPwd) }
    await SetRPAUserNewPassAPI(params)
    KMessage.success('修改密码成功!')
  }
}

const isDeveloperMsg = computed(() => {})
/** 提交成为开发者 */
const handleDeveloper = async () => {
  const params = { LoginId: loginId }
  await RPAApplyDeveloperAPI(params)
  KMessage.success('已提交,等待确认!')
}
const props = {
  expandTrigger: 'hover' as const,
  value: 'label',
}
</script>

<template>
  <div class="information-box">
    <div class="information">
      <div class="breadcrumb">
        <Breadcrumb />
      </div>
      <div class="page-title">编辑资料</div>
      <div class="information-card">
        <div class="title">个人资料</div>
        <div class="form-box">
          <div class="form-content">
            <k-form
              ref="ruleFormRef"
              style="width: 100%"
              label-width="100"
              :model="ruleForm"
              :rules="rules"
              class="demo-ruleForm"
              label-position="left"
              status-icon
            >
              <k-form-item label="用户昵称" prop="userName">
                <k-input v-model="ruleForm.userName" placeholder="请输入..." />
              </k-form-item>
              <k-form-item label="用户姓名" prop="fullName">
                <k-input v-model="ruleForm.fullName" placeholder="请输入..." />
              </k-form-item>
              <k-form-item label="单位/学校" prop="company">
                <k-input v-model="ruleForm.company" placeholder="请输入..." />
              </k-form-item>
              <k-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                  <el-radio :value="0">保密</el-radio>
                  <el-radio :value="1">男</el-radio>
                  <el-radio :value="2">女</el-radio>
                </el-radio-group>
              </k-form-item>
              <k-form-item label="所在城市" prop="city">
                <k-cascader
                  v-model="ruleForm.city"
                  placeholder="请选择..."
                  :options="cityList"
                  clearable
                  filterable
                  :props="props"
                  style="width: 100%"
                />
              </k-form-item>
              <k-form-item label="个人简介">
                <k-input
                  v-model="ruleForm.signature"
                  type="textarea"
                  :rows="5"
                  maxlength="500"
                  show-word-limit
                  placeholder="这个人很懒，什么都没留下。"
                />
              </k-form-item>
              <k-form-item>
                <k-button style="width: 100%" main @click="submitForm()">保存资料</k-button>
              </k-form-item>
            </k-form>
          </div>
          <div class="form-avatar-box">
            <UploadAvatar :picture="userInfo.avatar" />
          </div>
        </div>
      </div>
      <div class="account-card-box">
        <div class="card-title">账号与密码</div>
        <div class="row-account">
          <div class="row-name">登录账号</div>
          <div class="row-value">{{ userInfo.userId }}</div>
        </div>
        <div class="row-account">
          <div class="row-name">手机号码</div>
          <div class="row-value">
            <span>{{ userInfo.phone }}</span>
            <k-button text @click="handleEditPhone">修改</k-button>
          </div>
        </div>
        <div class="row-account">
          <div class="row-name">开发者权限</div>
          <div class="row-value">
            <div v-show="isDeveloper === 0" text @click="handleDeveloper">申请成为开发者</div>
            <span v-show="isDeveloper === 1">是开发者</span>
          </div>
        </div>
        <div class="row-account">
          <div class="row-name">密码</div>
          <div class="row-value">
            <span>已设置</span>
            <k-button text @click="handleEditPassword">修改</k-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EditUserDialog v-if="editDialogParams.visible" :params="editDialogParams" />
</template>

<style lang="scss" scoped>
.information-box {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 24px;
  width: 100%;
  min-height: calc(100vh - 70px);
  background: url('@/assets/images/user-bg.png') no-repeat top;
  background-size: 100% 100%;
  padding-top: 40px;
  padding-bottom: 10px;
  .dfc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .djc {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
  .information {
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    min-width: 960px;
    min-height: calc(100vh - 100px);
    margin-bottom: 50px;
    .breadcrumb {
      display: flex;
      align-items: center;
      width: 100%;
      height: 30px;
    }
    .page-title {
      font-size: 20px;
      font-weight: 600;
      height: 28px;
      line-height: 28px;
      color: #38363c;
    }
    .information-card {
      width: 100%;
      height: fit-content;
      box-sizing: border-box;
      padding: 24px 32px;
      border-radius: 12px;
      background-color: #fff;
      .title {
        font-size: 20px;
        font-weight: 600;
        height: 28px;
        line-height: 28px;
        color: #38363c;
      }
      .form-box {
        display: flex;
        justify-content: start;
        gap: 42px;
        margin-top: 16px;
        height: fit-content;
        .form-content {
          width: 540px;
        }
        .form-avatar-box {
          width: 100px;
          height: 134px;
          // border-radius: 8px;
          // border: 1px dotted #dbdbdb;
          overflow: hidden;
        }
      }
    }
    .account-card-box {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: 16px;
      width: 100%;
      height: fit-content;
      box-sizing: border-box;
      padding: 24px 32px;
      background-color: #fff;
      border-radius: 12px;
      .card-title {
        font-size: 20px;
        font-weight: 600;
        height: 28px;
        line-height: 28px;
        color: #38363c;
      }
      .row-account {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 32px;
        .row-name {
          width: 130px;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          font-weight: normal;
          color: #0f0b1c;
        }
        .row-value {
          display: flex;
          align-items: center;
          gap: 16px;
          width: fit-content;
          padding: 0 15px;
          height: 32px;
          font-size: 14px;
          font-weight: normal;
          color: #0f0b1c;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
