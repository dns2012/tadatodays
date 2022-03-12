<template>
  <p v-if="$fetchState.pending" class="ml-3">Loading Content...</p>
  <p v-else-if="$fetchState.error" class="ml-3">An error occurred :(</p>
  <div v-else>
    <section class="banner">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <MainCarousel :data="data.slider" />
          </div>
        </div>
      </div>
    </section>

    <section class="iklan mt-4">
      <MainAds />
    </section>

    <section class="news-list">
      <NewsList
        :title="`Berita Terbaru`"
        :data="data.latest"
        :link="`/news/latest`"
      />
    </section>

    <section class="e-paper">
      <EpaperList
        :title="`Koran Online`"
        :data="data.epaper"
        :link="`category/e-paper`"
      />
    </section>

    <section class="news-list">
      <NewsList
        :title="`Berita Terpopuler`"
        :data="data.popular"
        :link="`/news/popular`"
      />
    </section>

    <section class="pariwisata">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="epaper-categories-title">
              <h4>Pariwisata</h4>
              <a href="#">
                <b>
                  <span> Lihat semua </span>
                </b>
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <MainCarousel />
          </div>
        </div>
      </div>
    </section>

    <section class="iklan mt-4">
      <MainAds />
    </section>

    <section class="news-list">
      <NewsList
        :title="`Probolinggo`"
        :data="data.probolinggo"
        :link="`category/probolinggo`"
      />
    </section>

    <section class="iklan">
      <MainAds />
    </section>

    <section class="news-list">
      <NewsList
        :title="`Pasuruan`"
        :data="data.pasuruan"
        :link="`category/pasuruan`"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import EpaperList from '~/components/partials/EpaperList.vue'
import MainAds from '~/components/partials/MainAds.vue'
import MainCarousel from '~/components/partials/MainCarousel.vue'
import NewsList from '~/components/partials/NewsList.vue'
import meta from '~/plugins/helper'

export default {
  components: {
    EpaperList,
    MainCarousel,
    MainAds,
    NewsList,
  },
  mixins: [meta],
  data() {
    return {
      data: {},
      seo: {
        title: 'Blog | thenextbit',
        description: 'Blog about web design, jamstack & marketing',
        image: 'https://...',
      },
    }
  },
  async fetch() {
    if (this.resources.latest) {
      this.data = this.resources
    } else {
      this.data = await fetch(process.env.apiURL + 'resources').then((res) =>
        res.json()
      )
      this.setResources(this.data)
    }
  },
  fetchOnServer: false,
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
