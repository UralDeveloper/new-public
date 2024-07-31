<template>
  <component :is="'h' + level" :class="`heading-${level}`" :style="`color:${isColor}`">
    {{ title }}
  </component>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    validator: (value) => value >= 1 && value <= 6,
  },
  color: {
    type: String,
  },
});

const level = ref(props.level);

const isColor = computed(() => {
  switch (props.color) {
    case "grey":
      return "#969696";
  }
});
</script>

<style scoped lang="scss">
.heading-1,
.heading-2,
.heading-3,
.heading-4,
.heading-5,
.heading-6 {
  font-weight: 700;
  color: #141414;
}
.heading-1 {
  font-size: 36px;
  line-height: 41px;
  @include bp($point_2) {
    font-size: 24px;
    line-height: 115%;
  }
}
.heading-2 {
  font-size: 36px;
  line-height: 41px;
  @include bp($point_2) {
    font-size: 24px;
    line-height: 115%;
  }
}
.heading-3 {
  font-size: 24px;
  line-height: 115%;
  @include bp($point_2) {
    font-size: 22px;
    line-height: 115%;
  }
}
.heading-4 {
  font-size: 36px;
  line-height: 41px;
}
.heading-5 {
  font-size: 36px;
  line-height: 41px;
}
.heading-6 {
  font-size: 36px;
  line-height: 41px;
}
</style>
