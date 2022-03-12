<template>
  <div class="epaper-item">
    <NuxtLink :to="{ path: '/detail/' + data.urltitle }" class="news-title">
      <figure>
        <img
          :src="data | post_image"
          class="img-fluid"
          :alt="data.title"
          loading="lazy"
        />
      </figure>
      <div class="news-description">
        <h5>{{ data.title }}</h5>
        <div class="news-info">
          <NuxtLink :to="{ path: '/category/' + data.urlcategory }">
            <span> {{ data.name }} </span>
          </NuxtLink>
          <span> &bull; </span>
          <span> {{ data.postdate | time_ago }} </span>
        </div>
      </div>
    </NuxtLink>
  </div>
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
