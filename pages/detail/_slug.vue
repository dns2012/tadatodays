<template>
  <div>
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
import { parse } from 'node-html-parser'
import NewsList from '~/components/partials/NewsList.vue'
import Breadcrumb from '~/components/partials/Breadcrumb.vue'
import MainAds from '~/components/partials/MainAds.vue'

export default {
  components: { NewsList, Breadcrumb, AddThis, MainAds },
  layout: 'detail',
  async asyncData({ params, $http }) {
    const endpoint = `${process.env.apiURL}/detail/${params.slug}`
    const data = await fetch(endpoint).then((res) => res.json())
    return { data }
  },
  data() {
    return {
      breadcrumb: [],
      adsParagraph: 3,
    }
  },
  head() {
    return this.$options.filters.meta({
      title: this.data.article.title,
      description: this.data.article.postsdescription,
      image: this.$options.filters.post_image_detail(this.data.article),
      url: process.env.baseURL + this.$route.fullPath,
    })
  },
  fetchOnServer: false,
  methods: {
    getDescription(data) {
      const root = parse(data)
      const HTMLArray = []
      for (const i in root.childNodes) {
        if (root.childNodes[i].outerHTML) {
          HTMLArray.push(root.childNodes[i].outerHTML)
        }
      }
      this.adsParagraph = Math.ceil(HTMLArray.length / 2)
      return HTMLArray
    },
  },
}
</script>
