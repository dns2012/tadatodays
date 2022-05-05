<template>
  <p v-if="$fetchState.pending" class="ml-3">Loading Content...</p>
  <p v-else-if="$fetchState.error" class="ml-3">An error occurred :(</p>
  <div v-else>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Breadcrumb
            :data="[
              {
                title: 'Polling',
                url: '/polling',
              },
            ]"
          />
        </div>
      </div>
      <section class="news-list">
        <TadaPollingItem :data="data" />
      </section>
      <div class="container mb-5">
        <div class="row">
          <div class="col-12 text-center">
            <button
              v-if="!loading && !empty"
              class="btn btn-sm btn-primary"
              @click="loadMore()"
            >
              Lebih Banyak
            </button>
            <button v-if="loading" class="btn btn-sm btn-primary" disabled>
              <i class="fas fa-spinner"></i> Loading
            </button>
            <p v-if="empty">Semua polling telah dimuat..</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TadaPollingItem from '~/components/partials/TadaPollingItem.vue'
import Breadcrumb from '~/components/partials/Breadcrumb.vue'

export default {
  components: { TadaPollingItem, Breadcrumb },
  data() {
    return {
      endpoint: '',
      data: {},
      offset: 0,
      loading: false,
      empty: false,
      breadcrumb: [],
    }
  },
  async fetch() {
    this.endpoint = this.endpoint
      ? this.endpoint
      : `${process.env.apiURL}/polling`
    this.data = await fetch(this.endpoint).then((res) => res.json())
  },
  methods: {
    async loadMore() {
      this.loading = true
      const offset = this.offset + this.data.length
      const endpoint = `${this.endpoint}?offset=${offset}`
      const data = await fetch(endpoint).then((res) => res.json())
      this.data = this.data.concat(data)
      if (data.length === 0) {
        this.empty = true
      }
      this.loading = false
    },
  },
}
</script>
