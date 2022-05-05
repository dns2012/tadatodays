<template>
  <div class="col-12">
    <div class="video">
      <NuxtLink :to="{ path: '/detail/video/' + data.urltitle }">
        <div class="video__content-image">
          <img
            :src="data | post_image"
            loading="lazy"
            alt="Optimizing Google Ads to Boost Revenue"
            width="363"
            height="auto"
          />
          <div class="video__content-image-overlay"></div>
        </div>
      </NuxtLink>
      <div class="news-description mt-2">
        <h5>
          <NuxtLink :to="{ path: '/detail/video/' + data.urltitle }">
            {{ data.title }}
          </NuxtLink>
        </h5>
        <div class="news-info">
          <NuxtLink :to="{ path: '/category/tada-tv/' }"
            ><span> Tada TV </span></NuxtLink
          >
          <span> • </span> <span> {{ data.postdate | time_ago }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TadaTvBanner',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
