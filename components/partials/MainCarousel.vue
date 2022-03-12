<template>
  <div v-if="data.length > 0">
    <VueSlickCarousel :autoplay="true" :arrows="false" :dots="true">
      <div v-for="(item, index) in data" :key="index" class="item">
        <div class="news-item">
          <NuxtLink
            :to="{ path: 'detail/' + item.urltitle }"
            class="news-title"
          >
            <figure>
              <img
                :src="item | post_image"
                class="img-fluid"
                :alt="item.title"
                loading="lazy"
              />
            </figure>
            <div class="news-description">
              <h5>{{ item.title }}</h5>
              <div class="news-info">
                <NuxtLink :to="{ path: 'category/' + item.urlcategory }">
                  <span> {{ item.name }} </span>
                </NuxtLink>
                <span> &bull; </span>
                <span> {{ item.postdate | time_ago }} </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'MainCarousel',
  components: { VueSlickCarousel },
  props: {
    data: {
      default: () => [],
      type: Array,
    },
  },
  methods: {},
}
</script>
