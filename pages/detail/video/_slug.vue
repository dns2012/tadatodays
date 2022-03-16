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
                  <div class="col-1">
                    <figure class="profile">
                      <img
                        :src="data.article | admin_image"
                        :alt="data.article.administratorname"
                        loading="lazy"
                      />
                    </figure>
                  </div>
                  <div class="col-10 pl-3 pl-m-1">
                    <div class="news-info">
                      <a href="#">
                        <h5 class="mb-1">
                          {{ data.article.administratorname }}
                        </h5>
                      </a>
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
            <figure class="mb-1">
              <iframe
                class="w-100"
                height="250"
                src="https://www.youtube.com/embed/mclNsmBr-bU?autoplay=1&enablejsapi=1"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </figure>
            <p class="captions">{{ data.article.caption }}</p>
            <div class="news-content">
              <div
                v-for="(item, index) in getDescription(
                  data.article.postsdescription
                )"
                :key="index"
              >
                <div v-if="index == adsParagraph">
                  <div v-html="item"></div>
                  <MainAds class="mb-3" />
                </div>
                <div v-html="item"></div>
              </div>
            </div>
            <MainAds class="mb-3" />
            <div class="tags">
              <ul class="nav">
                <li
                  v-for="(item, index) in data.tags"
                  :key="index"
                  class="nav-item"
                >
                  <NuxtLink
                    :to="{ path: `/news/tags?slug=${item.urltags}` }"
                    class="nav-link"
                    >{{ item.name }}</NuxtLink
                  >
                </li>
              </ul>
            </div>
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

    <section v-if="data.related.length > 0" class="news-list">
      <NewsList :title="`Berita Terkait`" :data="data.related" />
    </section>
  </div>
</template>

<script>
import AddThis from 'vue-simple-addthis-share'
import NewsList from '~/components/partials/NewsList.vue'
import Breadcrumb from '~/components/partials/Breadcrumb.vue'
import MainAds from '~/components/partials/MainAds.vue'

export default {
  components: { NewsList, Breadcrumb, AddThis, MainAds },
  layout: 'detail',
  data() {
    return {
      data: {},
      breadcrumb: [],
      adsParagraph: 3,
    }
  },
  async fetch() {
    const endpoint = process.env.apiURL + 'detail/' + this.$route.params.slug
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
