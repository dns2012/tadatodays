<template>
  <div class="container">
    <div v-if="title" class="row">
      <div class="col-12">
        <div class="news-categories-title">
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
      <div class="col-12">
        <div v-for="(item, index) in data" :key="index" class="news mb-4">
          <div class="container">
            <NewsListItem :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsListItem from '~/components/partials/NewsListItem.vue'

export default {
  name: 'NewsList',
  components: { NewsListItem },
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
