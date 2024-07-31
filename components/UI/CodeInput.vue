<template>
  <div
    :class="{
      'code-input-container': true,
      [className]: !!className,
    }"
  >
    <div :class="['code-input', { 'error' : isError }]">
      <template v-for="(v, index) in values" :key="index">
        <input
          :ref="
            (el) => {
              if (el) inputs[index + 1] = el;
            }
          "
          :type="type === 'number' ? 'tel' : type"
          :pattern="type === 'number' ? '[0-9]' : null"
          :autoFocus="autoFocus && !loading && index === autoFocusIndex"
          :style="{
            width: `${props.fieldWidth}px`,
            height: `${props.fieldHeight}px`,
          }"
          :data-id="index"
          :value="v"
          :required="props.required"
          :disabled="props.disabled"
          maxlength="1"
          @input="onValueChange"
          @focus="onFocus"
          @keydown="onKeyDown"
        >
      </template>
    </div>
    <div v-if="loading" class="loading" :style="{lineHeight: `${fieldHeight}px`}">
      <div class="blur" />
      <svg
        class="spin"
        viewBox="0 0 1024 1024"
        data-icon="loading"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill="#006fff"
          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'number',
  },
  className: {
    type: String,
    default: '',
  },
  fields: {
    type: Number,
    default: 3,
  },
  fieldWidth: {
    type: Number,
    default: 56,
  },
  fieldHeight: {
    type: Number,
    default: 56,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change', 'complete'])

const KEY_CODE = {
  backspace: 8,
  delete: 46,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}
const values = ref([])
const iRefs = ref([])
const inputs = ref([])
const fields = toRef(props, 'fields')
const autoFocusIndex = ref(0)
const autoFocus = true

const initVals = () => {
  let vals
  if (values.value && values.value.length) {
    vals = []
    for (let i = 0; i < fields.value; i++) {
      vals.push(values.value[i] || '')
    }
    autoFocusIndex.value =
      values.value.length >= fields.value ? 0 : values.value.length
  } else {
    vals = Array(fields.value).fill('')
  }
  iRefs.value = []
  for (let i = 0; i < fields.value; i++) {
    iRefs.value.push(i + 1)
  }
  values.value = vals
}

const onFocus = (e) => {
  e.target.select(e)
}

const onValueChange = (e) => {
  const index = parseInt(e.target.dataset.id)
  e.target.value = e.target.value.replace(/[^\d]/gi, '')
  // this.handleKeys[index] = false;
  if (e.target.value === '' || !e.target.validity.valid) {
    return
  }
  let next
  const value = e.target.value
  values.value = Object.assign([], values.value)
  if (value.length > 1) {
    let nextIndex = value.length + index - 1
    if (nextIndex >= fields.value) {
      nextIndex = fields.value - 1
    }
    next = iRefs.value[nextIndex]
    const split = value.split('')
    split.forEach((item, i) => {
      const cursor = index + i
      if (cursor < fields.value) {
        values.value[cursor] = item
      }
    })
  } else {
    next = iRefs.value[index + 1]
    values.value[index] = value
  }
  if (next) {
    const element = inputs.value[next]
    element.focus()
    element.select()
  }
  triggerChange(values.value)
}

const onKeyDown = (e) => {
  const index = parseInt(e.target.dataset.id)
  const prevIndex = index - 1
  const nextIndex = index + 1
  const prev = iRefs.value[prevIndex]
  const next = iRefs.value[nextIndex]
  switch (e.keyCode) {
    case KEY_CODE.backspace: {
      e.preventDefault()
      const vals = [...values.value]
      if (values.value[index]) {
        vals[index] = ''
        values.value = vals
        triggerChange(vals)
      } else if (prev) {
        vals[prevIndex] = ''
        inputs.value[prev].focus()
        values.value = vals
        triggerChange(vals)
      }
      break
    }
    case KEY_CODE.delete: {
      e.preventDefault()
      const vals = [...values.value]
      if (values.value[index]) {
        vals[index] = ''
        values.value = vals
        triggerChange(vals)
      } else if (next) {
        vals[nextIndex] = ''
        inputs.value[next].focus()
        values.value = vals
        triggerChange(vals)
      }
      break
    }
    case KEY_CODE.left:
      e.preventDefault()
      if (prev) {
        inputs.value[prev].focus()
      }
      break
    case KEY_CODE.right:
      e.preventDefault()
      if (next) {
        inputs.value[next].focus()
      }
      break
    case KEY_CODE.up:
    case KEY_CODE.down:
      e.preventDefault()
      break
    default:
      // this.handleKeys[index] = true;
      break
  }
}

const triggerChange = (vals = values.value) => {
  const val = vals.join('')

  emit('change', val)
  if (val.length >= fields.value) {
    emit('complete', val)
  }
}

initVals()

onBeforeUpdate(() => {
  inputs.value = []
})
</script>

<style scoped lang="scss">
.code-input-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}
.code-input {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;

  &.error {
    & > input {
      border: 2px solid var(--red);
    }
  }
}

.code-input > input {
  padding: 12px 15px;

  @include text_normal;
  font-weight: 500;
  color: var(--blackText2);

  background: var(--grayBg2);
  border: 0;
  border-radius: 14px;
  text-align: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
}

.code-input > input:disabled {
  // background: rgba(255, 255, 255, 0.1);
  opacity: 0.5;
}

.code-input > input:focus {
  outline: none;
  border: 2px solid var(--yellow);
  // caret-color: #006fff;
}

.loading {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
.blur {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  opacity: 0.5;
  filter: blur(0.5px);
  transition: opacity 0.3s;
}

.spin {
  display: inline-block;
  animation: loadingCircle 1s infinite linear;
}
@keyframes loadingCircle {
  100% {
    transform: rotate(360deg);
  }
}
</style>
