<template>
  <div class="container">
    <div v-if="title" class="row">
      <div class="col-12">
        <div class="epaper-categories-title">
          <h4>{{ title }}</h4>
          <NuxtLink v-if="link" :to="{ path: link }">
            <b>
              <span> Lihat semua </span>
            </b>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="col-6"
        :class="index % 2 == 0 ? 'pr-2 pr-m-3' : 'pl-2 pl-m-3'"
      >
        <EpaperListItem :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import EpaperListItem from './EpaperListItem.vue'
export default {
  name: 'EpaperList',
  components: { EpaperListItem },
  props: {
    title: {
      default: '',
      type: String,
    },
    data: {
      default: () => [],
      type: Array,
    },
    link: {
      default: () => '',
      type: String,
    },
  },
}
</script>
