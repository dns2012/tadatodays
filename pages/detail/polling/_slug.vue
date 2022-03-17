<template>
  <p v-if="$fetchState.pending" class="ml-3">Loading Content...</p>
  <p v-else-if="$fetchState.error" class="ml-3">An error occurred :(</p>
  <div v-else>
    <section class="news-details">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <Breadcrumb :data="breadcrumb" />
            <div class="news-top-info mb-2">
              <h4 class="mb-3">
                {{ data.article.title }}
              </h4>
              <div class="container pl-0">
                <div class="row justify-content-between align-items-center">
                  <div class="col-12 pl-3 pl-m-1">
                    <div class="news-info">
                      <p>
                        {{
                          data.article.publish_date
                            | publish_date
                            | indo_day_parser
                        }}
                        WIB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="news-content polling-detail mb-4">
              <div class="text-center">
                <h6 class="mb-4">
                  Apakah Anda setuju pilpres 2024 diundur 3 tahun mendatang ?
                </h6>
                <div class="d-flex justify-content-center mb-3">
                  <button class="btn btn-outline-primary mr-3">Tidak</button>
                  <button class="btn btn-outline-primary">Ya</button>
                </div>
                <div>
                  <div
                    class="d-flex align-items-baseline justify-content-center"
                  >
                    <h6>TIDAK</h6>
                    <div>&nbsp;&nbsp; | &nbsp;&nbsp;</div>
                    <h6>YA</h6>
                  </div>
                  <div class="d-flex text-center align-items-center">
                    <div><strong>20%</strong></div>
                    <div class="progress w-100 mr-2 ml-2">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 20%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div><strong>80%</strong></div>
                  </div>
                </div>
              </div>
            </div>
            <MainAds class="mb-3" />
            <hr />

            <p>Share to</p>
            <AddThis :public-id="`ra-5b74cf95529da98f`" />
            <hr class="mb-0" />

            <div class="ads-floating">
              <img
                src="~/assets/img/IKLAN AGAK PANJANG2 BARU.jpg"
                class="img-fluid mb-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="news-list">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="news-categories-title">
              <h4>Polling Lainnya</h4>
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
import AddThis from 'vue-simple-addthis-share'
import Breadcrumb from '~/components/partials/Breadcrumb.vue'
import MainAds from '~/components/partials/MainAds.vue'

export default {
  components: { Breadcrumb, AddThis, MainAds },
  layout: 'detail',
  data() {
    return {
      data: {},
      breadcrumb: [],
      adsParagraph: 3,
    }
  },
  async fetch() {
    const endpoint = process.env.apiURL + '/detail/' + this.$route.params.slug
    this.data = await fetch(endpoint).then((res) => res.json())
    this.breadcrumb = [
      {
        title: this.data.article.categoryname,
        url: `/category/${this.data.article.urlcategory}`,
      },
    ]
  },
  head: {
    title: 'Tadatodays.com | Berita Seputar Daerah Tapal Kuda',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Berita Seputar Daerah Tapal Kuda',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Berita pasuruan, Berita probolinggo, Berita Daerah Bangil, Berita Daerah Pandaan, Berita Daerah Pasuruan, Berita Daerah Probolinggo, Berita Daerah Kraksaan, Portal Berita, Berita Teraktual, Berita Terpercaya, Tapal Kuda, Tadatodays, Berita Daerah Tapal Kuda, Berita Jember, Berita Situbondo',
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'index, follow, noodp',
      },
      {
        hid: 'alt_image',
        name: 'alt_image',
        content:
          'https://tadatodays.com/public/assets/mobile/img/tada-square-ungu-new.jpg',
      },
      {
        hid: 'title_image',
        name: 'title_image',
        content: 'Berita Seputar Daerah Tapal Kuda',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: '/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Berita Seputar Daerah Tapal Kuda',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Berita Seputar Daerah Tapal Kuda',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://tadatodays.com/public/assets/mobile/img/tada-square-ungu-new.jpg',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Tadatodays',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
    ],
  },
  fetchOnServer: false,
  methods: {
    getDescription(data) {
      const doc = new DOMParser().parseFromString(data, 'text/html')
      const HTMLArray = [...doc.body.children].map((el) => el.outerHTML)
      this.adsParagraph = Math.ceil(HTMLArray.length / 2)
      return HTMLArray
    },
  },
}
</script>
