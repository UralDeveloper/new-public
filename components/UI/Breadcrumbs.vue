<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link :to="'/'">Главная</router-link>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index + 1" class="breadcrumb-item">
        <router-link 
          v-if="crumb.to && index !== breadcrumbs.length - 1" 
          :to="crumb.to" 
          v-bind:aria-current="(index === breadcrumbs.length - 1) ? 'page' : null"
        >
          {{ crumb.text }}
        </router-link>
        <span v-else class="current">{{ crumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>



<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';


const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
    default: () => [],
    validator(breadcrumbs) {
      return breadcrumbs.every(crumb => typeof crumb.text === 'string');
    }
  }
});
</script>

<style scoped lang="scss">
.breadcrumb {
  background: none; 
  padding: 0;       
}

.breadcrumb-item {
  display: inline-block; 
}

.breadcrumb-item {
  display: inline-block;

  & + .breadcrumb-item::before {
    content: " / "; 
    padding: 0 5px;
  }
}

.current {
    color: var(--grayText);
}

</style>
