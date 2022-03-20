<template>
  <div>
    <div v-for="(item, index) in data" :key="index" class="news mb-4">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="news-description">
              <h5>
                <NuxtLink :to="{ path: `/polling/${item.slug}` }">
                  {{ item.question }}
                </NuxtLink>
              </h5>
              <div class="news-info">
                <span> {{ item.start_at | time_ago }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TadaPollingItem',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
