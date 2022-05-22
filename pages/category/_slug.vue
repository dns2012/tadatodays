<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <Breadcrumb
            :data="[
              {
                title: data.category.name,
                url: `/category/${data.category.urlcategory}`,
              },
            ]"
          />
        </div>
      </div>
    </div>
    <section
      v-if="data.category.id == 21 || data.category.id == 28"
      class="e-paper"
    >
      <EpaperList :data="data.articles" :show-all="false" />
    </section>
    <section v-else class="news-list">
      <NewsList :data="data.articles" />
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
  async asyncData({ params }) {
    const data = await fetch(
      `${process.env.apiURL}/category/${params.slug}`
    ).then((res) => res.json())
    return { data }
  },
  data() {
    return {
      offset: 0,
      loading: false,
      empty: false,
      breadcrumb: [],
    }
  },
  head() {
    return this.$options.filters.meta({
      title: `Kategori - ${this.data.category.name}`,
      description: `Berita Seputar ${this.data.category.name}`,
      image:
        'https://tadatodays.com/public/assets/mobile/img/tada-square-ungu-new.jpg',
      url: process.env.baseURL + this.$route.fullPath,
    })
  },
  methods: {
    async loadMore() {
      this.loading = true
      const offset = this.offset + this.data.articles.length
      const endpoint = `${process.env.apiURL}/category/${this.$route.params.slug}?offset=${offset}`
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
