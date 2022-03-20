<template>
  <p v-if="$fetchState.pending" class="ml-3">Loading Content...</p>
  <p v-else-if="$fetchState.error" class="ml-3">An error occurred :(</p>
  <div v-else>
    <section v-if="data.tada_tv.length > 0">
      <TadaTvBanner :data="data.tada_tv[0]" />
    </section>

    <section v-if="data.tada_tv.length > 0" class="iklan mt-4">
      <MainAds :data="data.ads" position="home-bottom-tada-tv" />
    </section>

    <section class="banner mt-4">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <MainCarousel :data="data.slider" />
          </div>
        </div>
      </div>
    </section>

    <section class="iklan mt-4">
      <MainAds :data="data.ads" position="home-bottom-slider" />
    </section>

    <section class="news-list">
      <NewsList
        :title="`Berita Terbaru`"
        :data="data.latest"
        :link="`/news/latest`"
      />
    </section>

    <section class="iklan mt-2">
      <MainAds :data="data.ads" position="home-bottom-latest-post" />
    </section>

    <section class="news-list">
      <NewsList
        :title="`Koran Online`"
        :data="data.epaper"
        :link="`category/e-paper`"
      />
    </section>

    <section class="iklan mt-2">
      <MainAds :data="data.ads" position="home-bottom-e-paper" />
    </section>

    <section class="news-list">
      <TadaPolling :data="data.polling" />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MainAds from '~/components/partials/MainAds.vue'
import MainCarousel from '~/components/partials/MainCarousel.vue'
import NewsList from '~/components/partials/NewsList.vue'
import TadaTvBanner from '~/components/partials/TadaTvBanner.vue'
import TadaPolling from '~/components/partials/TadaPolling.vue'

export default {
  components: {
    MainCarousel,
    MainAds,
    NewsList,
    TadaTvBanner,
    TadaPolling,
  },
  data() {
    return {
      data: {},
    }
  },
  async fetch() {
    if (this.resources.latest) {
      this.data = this.resources
    } else {
      this.data = await fetch(process.env.apiURL + '/resources').then((res) =>
        res.json()
      )
      this.setResources(this.data)
    }
  },
  head() {
    return this.$options.filters.meta({
      title: 'Berita Seputar Daerah Tapal Kuda',
      description: 'Berita Seputar Daerah Tapal Kuda',
      image:
        'https://tadatodays.com/public/assets/mobile/img/tada-square-ungu-new.jpg',
    })
  },
  computed: {
    ...mapGetters({
      resources: 'getMainResources',
    }),
  },
  methods: {
    ...mapMutations({
      setResources: 'setMainResources',
    }),
  },
}
</script>
