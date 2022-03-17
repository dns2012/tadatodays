<template>
  <p v-if="$fetchState.pending" class="ml-3">Loading Content...</p>
  <p v-else-if="$fetchState.error" class="ml-3">An error occurred :(</p>
  <div v-else>
    <section>
      <div class="col-12">
        <div class="video">
          <div class="video__content-image">
            <img
              src="https://cdn.tadatodays.com/posts/2022/03/13/20220313115148.jpg"
              loading="lazy"
              alt="Optimizing Google Ads to Boost Revenue"
              width="363"
              height="auto"
            />
            <div class="video__content-image-overlay"></div>
          </div>
          <div class="news-description mt-2">
            <h5>
              <a href="javascript:void(0)" class="">
                Imbas Bentrokan Dua Perguruan Silat, Bupati Banyuwangi Imbau
                Masyarakat Tenang
              </a>
            </h5>
            <div class="news-info">
              <a href="javascript:void(0)" class=""><span> Tada TV </span></a>
              <span> • </span> <span> 2 hours ago </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="iklan mt-4">
      <MainAds />
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
      <MainAds />
    </section>

    <section class="news-list">
      <NewsList
        :title="`Berita Terbaru`"
        :data="data.latest"
        :link="`/news/latest`"
      />
    </section>

    <section class="iklan mt-2">
      <MainAds />
    </section>

    <section class="news-list">
      <NewsList
        :title="`Koran Online`"
        :data="data.epaper"
        :link="`category/e-paper`"
      />
    </section>

    <section class="iklan mt-2">
      <MainAds />
    </section>

    <section class="news-list">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="news-categories-title">
              <h4>Tada Polling</h4>
              <a href="/news/popular" class=""
                ><b><span> Lihat semua </span></b></a
              >
            </div>
            <div v-for="i in 5" :key="i" class="news mb-4">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div class="news-description">
                      <h5>
                        <a href="javascript:void(0)" class="">
                          Apakah Anda setuju dengan periode jabatan 3 kali ?
                        </a>
                      </h5>
                      <div class="news-info">
                        <span> 24 minutes ago </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MainAds from '~/components/partials/MainAds.vue'
import MainCarousel from '~/components/partials/MainCarousel.vue'
import NewsList from '~/components/partials/NewsList.vue'

export default {
  components: {
    MainCarousel,
    MainAds,
    NewsList,
  },
  data() {
    return {
      data: {},
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
