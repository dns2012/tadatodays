<template>
  <nav class="breadcrumb">
    <NuxtLink to="/" class="breadcrumb-item">Beranda</NuxtLink>
    <NuxtLink
      v-for="(item, index) in data"
      :key="index"
      :to="{ path: item.url }"
      class="breadcrumb-item"
      >{{ item.title }}</NuxtLink
    >
  </nav>
</template>
<script>
export default {
  name: 'Breadcrumb',
  props: {
    data: {
      default: () => [],
      type: Array,
    },
  },
}
</script>
