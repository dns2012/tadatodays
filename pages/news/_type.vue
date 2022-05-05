<template>
  <p v-if="$fetchState.pending" class="ml-3">Loading Content...</p>
  <p v-else-if="$fetchState.error" class="ml-3">An error occurred :(</p>
  <div v-else>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Breadcrumb :data="breadcrumb" />
        </div>
      </div>
    </div>
    <section class="news-list">
      <NewsList :data="data" />
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
          <p v-if="empty">Semua berita telah dimuat..</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsList from '~/components/partials/NewsList.vue'
import Breadcrumb from '~/components/partials/Breadcrumb.vue'

export default {
  components: { NewsList, Breadcrumb },
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
    const pageInfo = this.pageInfo()
    this.endpoint = this.endpoint
      ? this.endpoint
      : `${process.env.apiURL}/news/${pageInfo.path}`
    this.data = await fetch(this.endpoint).then((res) => res.json())
    this.breadcrumb = pageInfo.breadcrumb
  },
  head() {
    return this.$options.filters.meta({
      title: 'Berita Seputar Daerah Tapal Kuda',
      description: 'Berita Seputar Daerah Tapal Kuda',
      image:
        'https://tadatodays.com/public/assets/mobile/img/tada-square-ungu-new.jpg',
    })
  },
  methods: {
    async loadMore() {
      this.loading = true
      const offset = this.offset + this.data.length
      const endpoint =
        Object.keys(this.$route.query).length > 0
          ? `${this.endpoint}&offset=${offset}`
          : `${this.endpoint}?offset=${offset}`
      const data = await fetch(endpoint).then((res) => res.json())
      this.data = this.data.concat(data)
      if (data.length === 0) {
        this.empty = true
      }
      this.loading = false
    },
    pageInfo() {
      const info = {}
      switch (this.$route.params.type) {
        case 'latest':
          info.path = 'latest'
          info.breadcrumb = [
            {
              title: 'Berita Terbaru',
              url: '#',
            },
          ]
          break
        case 'popular':
          info.path = 'popular'
          info.breadcrumb = [
            {
              title: 'Berita Terpopuler',
              url: '#',
            },
          ]
          break
        case 'tags':
          info.path = `tags?slug=${this.$route.query.slug}`
          info.breadcrumb = [
            {
              title: 'Tags',
              url: '#',
            },
            {
              title: `#${this.$route.query.slug}`,
              url: '#',
            },
          ]
          break
        case 'search':
          info.path = `search?keyword=${this.$route.query.keyword}`
          info.breadcrumb = [
            {
              title: 'Cari',
              url: '#',
            },
            {
              title: `${this.$route.query.keyword}`,
              url: '#',
            },
          ]
          break
        default:
          info.path = 'latest'
          info.breadcrumb = [
            {
              title: 'Berita Terbaru',
              url: '#',
            },
          ]
          break
      }
      return info
    },
  },
}
</script>
