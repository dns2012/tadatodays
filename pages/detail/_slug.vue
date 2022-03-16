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
              <a :href="data.article | post_image_detail">
                <img
                  :src="data.article | post_image_detail"
                  :alt="data.article.title"
                  loading="lazy"
                  class="img-fluid"
                />
              </a>
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
            {{ post }}
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
  async asyncData({ params, $http }) {
    const endpoint = process.env.apiURL + 'detail/' + params.slug
    const post = await fetch(endpoint).then((res) => res.json())
    return { post }
  },
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
  head() {
    return {
      title: `Tadatodays.com | ${this.post.article.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.post.article.postsdescription
            .replace(/(<([^>]+)>)/gi, '')
            .substr(0, 200)}...`,
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
          hid: 'image',
          name: 'image',
          content: this.$options.filters.post_image_detail(this.post.article),
        },
      ],
    }
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
