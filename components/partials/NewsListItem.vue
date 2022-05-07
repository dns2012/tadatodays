<template>
  <div class="row">
    <div class="col-8">
      <div class="news-description">
        <h5>
          <NuxtLink
            :to="{
              path:
                data.urlcategory == 'tada-tv'
                  ? '/detail/video/' + data.urltitle
                  : '/detail/' + data.urltitle,
            }"
          >
            {{ data.title }}
          </NuxtLink>
        </h5>
        <div class="news-info">
          <NuxtLink :to="{ path: '/category/' + data.urlcategory }">
            <span> {{ data.name }} </span>
          </NuxtLink>
          <span> &bull; </span>
          <span> {{ data.postdate | time_ago }} </span>
        </div>
      </div>
    </div>
    <div class="col">
      <figure>
        <NuxtLink
          :to="{
            path:
              data.urlcategory == 'tada-tv'
                ? '/detail/video/' + data.urltitle
                : '/detail/' + data.urltitle,
          }"
        >
          <img
            :src="data | post_image"
            class="img-fluid"
            loading="lazy"
            :alt="data.title"
          />
        </NuxtLink>
      </figure>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewsListItem',
  props: {
    data: {
      default: () => {},
      type: Object,
    },
  },
}
</script>
