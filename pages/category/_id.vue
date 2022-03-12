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
    <section v-if="data.category.id != 21" class="news-list">
      <NewsList :data="data.articles" />
    </section>
    <section v-else class="e-paper">
      <EpaperList :data="data.articles" :show-all="false" />
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
import EpaperList from '~/components/partials/EpaperList.vue'
import Breadcrumb from '~/components/partials/Breadcrumb.vue'

export default {
  components: { NewsList, EpaperList, Breadcrumb },
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
      : process.env.apiURL + 'category/' + this.$route.params.id
    this.data = await fetch(this.endpoint).then((res) => res.json())
    this.breadcrumb = [
      {
        title: this.data.category.name,
        url: `/category/${this.data.category.urlcategory}`,
      },
    ]
  },
  fetchOnServer: false,
  methods: {
    async loadMore() {
      this.loading = true
      const offset = this.offset + this.data.articles.length
      const endpoint = `${this.endpoint}?offset=${offset}`
      const data = await fetch(endpoint).then((res) => res.json())
      this.data.articles = this.data.articles.concat(data.articles)
      if (data.articles.length === 0) {
        this.empty = true
      }
      this.loading = false
    },
  },
}
</script>
