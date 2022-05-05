<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="news-categories-title">
          <h4>Tada Polling</h4>
          <NuxtLink :to="{ path: '/polling' }">
            <b><span> Lihat semua </span></b>
          </NuxtLink>
        </div>
        <TadaPollingItem :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import TadaPollingItem from '~/components/partials/TadaPollingItem.vue'

export default {
  name: 'TadaPolling',
  components: {
    TadaPollingItem,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
