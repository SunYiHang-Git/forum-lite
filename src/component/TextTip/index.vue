<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue'

const str =
  //   '工商银行推出的一款综合金融服务应用工商银行推出的一款综12一款综合金融服务应用工商银行推出的一款综合金融服务应用工商银行推出的一款综合金融服务应用工商银行推出的一款综合金融服务应用'
  '个金拓客维客"是工商银行推出的一款综合金融服务应用,个金拓客维客"是工商银行推出的一款综合金融服务应用。这款应用旨在提供一站式的金融解决方案，满足用户的多元化需求。首先，它提供了全面的在线银行业务，包括查询余额、转账、支付账单等功能，使得用户可以随时随地进行金融交易，无需前往实体银行，大大提高了银行业务的便捷性。其次，个金拓客维客还提供了投资和理财服务。用户可以在应用中购买和管理各种投资产品，如基金、股票和债券等，这使得用户可以更加轻松地进行资金管理和增值。此外，个金拓客维客还提供了在线客户服务，包括答疑解惑、投诉处理等，以确保用户在使用过程中遇到任何问题都能得到及时解决。总的来说，个金拓客维客是一款全方位的金融服务应用，它将银行业务、投资理财和客户服务等功能集于一身，为用户提供了一种方便、高效的金融服务方式。然而，具体的功能和服务可能会有所不同，建议用户直接查阅工商银行的官方资源以安装最准确的信息。'

type IProps = {
  /** 显示文字 */
  text: string | undefined
  /** 宽度 数字 */
  tWidth?: string | number
  /** 行高 -倍数 */
  tLineH?: number
  /** 字体颜色 */
  tColor?: string
  /** 字体尺寸 */
  tSize?: string | number
  /** 背景色 */
  tBg?: string
  /** 行数 */
  lineNumber?: number
  /** 标识文字 -- 查看更多 */
  signText?: string
  /** 标识文字颜色 */
  signColor?: string
  /** 标识字体尺寸不能大于文本尺寸 */
  singSize?: string | number
  /** 标识位置 */
  signPosition?: 'bottom' | 'right-bottom'
}
const { text, tWidth, tColor, tSize, tBg, tLineH, lineNumber, singSize, signText, signColor, signPosition } =
  defineProps<IProps>()

const showText = computed(() => {
  return text ? text : '无'
})
const defaultSizeValue = 14 + 'px'
const defaultWidthValue = '100%'

const showMoreText = ref(signText ?? '查看更多')

const defaultLineNum = ref(lineNumber ?? 1)

const textRef = useTemplateRef('textRef')

const factLine = ref(1)

/** 处理传入的数据是字符型或数字型 */
function handleDataProps(value: string | number | undefined) {
  if (typeof value === 'number') return value + 'px'
  return value
}
const showTextHeight = computed(() => {
  const size = parseInt(handleDataProps(tSize) ?? defaultSizeValue)
  return size * defaultLineNum.value * 1.5
})
const signSize = computed(() => {
  const s1 = handleDataProps(singSize) ?? defaultSizeValue
  const s2 = handleDataProps(tSize) ?? defaultSizeValue
  return Math.min(parseInt(s1), parseInt(s2))
})
const styleText = ref({
  width: handleDataProps(tWidth) ?? defaultWidthValue,
  height: showTextHeight.value + 'px',
  fontSize: handleDataProps(tSize) ?? defaultSizeValue,
  lineHeight: tLineH ?? 1.5,
  color: tColor,
  backgroundColor: tBg,
  webkitLineClamp: lineNumber ?? defaultLineNum.value,
  overflow: 'hidden',
  webkitBoxOrient: 'vertical',
})

const styleSign = ref<any>({
  height: signSize.value * 1.5,
  color: signColor ?? '#2882FF',
  fontSize: handleDataProps(singSize) ?? defaultSizeValue,
})

const isAll = ref(false)
const showMore = () => {
  if (isAll.value) {
    isAll.value = !isAll.value
    defaultLineNum.value = lineNumber ?? 1
    styleText.value.overflow = 'hidden'
    styleText.value.height = showTextHeight.value + 'px'
    styleText.value.webkitBoxOrient = 'vertical'
    showMoreText.value = signText ?? '查看更多'
    return
  }
  isAll.value = !isAll.value
  const h = getLinesCount(textRef.value)
  const moreLine = h - (lineNumber ?? 1)
  if (moreLine < 5) {
    defaultLineNum.value = h
    styleText.value.height = showTextHeight.value + 'px'
  } else {
    styleText.value.height =
      parseInt(styleText.value.height) + parseInt(styleText.value.fontSize) * 5 * (tLineH ?? 1.5) + 'px'
  }
  styleText.value.overflow = 'auto'
  styleText.value.webkitBoxOrient = 'horizontal'
  showMoreText.value = '收起'
}

function getLinesCount(element: any) {
  if (!element) return 1
  const range = document.createRange()
  range?.setStart?.(element.firstChild, 0)
  range?.setEnd?.(element.lastChild, element.lastChild ? element.lastChild.textContent.length : 0)
  const lines = range?.getClientRects()
  return lines.length ?? 1
}

/** 处理查看更多位置 */
const handleMorePosition = () => {
  if (!signPosition || signPosition === 'bottom') return
  if (signPosition === 'right-bottom') {
    styleSign.value.position = 'absolute'
    styleSign.value.right = '0'
    styleSign.value.bottom = '0'
    styleSign.value.background =
      'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 20%, rgb(255, 255, 255) 100%)'
  }
}

onMounted(async () => {
  handleMorePosition()
  await nextTick()
  factLine.value = getLinesCount(textRef.value)
})
</script>

<template>
  <div class="text-tip" :style="{ width: handleDataProps(tWidth) ?? defaultWidthValue }">
    <div ref="textRef" class="text" :style="styleText">{{ showText }}</div>
    <div v-if="factLine > (lineNumber ?? 1)" class="sign" :style="styleSign" @click="showMore">
      {{ showMoreText ?? '查看更多' }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-tip {
  position: relative;
  .text {
    display: -webkit-box;
  }
  .sign {
    // position: absolute;
    // right: 0;
    // bottom: 0;
    // line-height: 1.5;
    // background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 20%, rgb(255, 255, 255) 100%);
    // width: fit-content;
    cursor: pointer;
  }
}
</style>
