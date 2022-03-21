<template>
  <NuxtLink :to="{ path: '/detail/' + data.urltitle }" class="news-title">
    <div class="epaper-item">
      <figure>
        <img
          :src="data | post_image"
          class="img-fluid"
          :alt="data.title"
          loading="lazy"
        />
      </figure>
      <div class="news-description">
        <!-- <h5>{{ data.title }}</h5> -->
        <div class="news-info">
          <!-- <NuxtLink :to="{ path: '/category/' + data.urlcategory }">
            <span> {{ data.name }} </span>
          </NuxtLink>
          <span> &bull; </span> -->
          <span> {{ data.postdate | time_ago }} </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'EpaperListItem',
  props: {
    data: {
      default: () => {},
      type: Object,
    },
  },
}
</script>
