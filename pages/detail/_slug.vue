<template>
  <div>
    <section class="news-details">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <Breadcrumb
              :data="[
                {
                  title: data.article.categoryname,
                  url: `/category/${data.article.urlcategory}`,
                },
              ]"
            />
            <div class="news-top-info mb-2">
              <h4
                v-if="
                  data.article.urlcategory != 'e-paper' ||
                  data.article.urlcategory != 'tada-komik'
                "
                class="mb-3"
              >
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
                      <h5 class="mb-1">
                        {{ data.article.administratorname }}
                      </h5>
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
                  class="w-100"
                />
              </a>
            </figure>
            <p class="captions">{{ data.article.caption }}</p>
            <div
              v-if="data.article.urlcategory != 'tada-komik'"
              class="news-content"
            >
              <div
                v-for="(item, index) in getDescription(
                  data.article.postsdescription
                )"
                :key="index"
              >
                <div v-if="index == adsParagraph">
                  <MainAds
                    :data="data.ads"
                    position="detail-middle-content"
                    class="mt-2 mb-2"
                  />
                </div>
                <div v-html="item"></div>
              </div>
            </div>
            <div v-if="data.article.urlcategory != 'tada-komik'" class="tags">
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

            <MainAds
              :data="data.ads"
              position="detail-bottom-content"
              class="mb-3"
            />

            <hr />

            <p>Share to</p>
            <AddThis :public-id="`ra-5b74cf95529da98f`" />

            <hr class="mb-0" />

            <FloatingBottomAds
              :data="data.ads"
              position="detail-floating-bottom"
              class="mb-3"
            />
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
import FloatingBottomAds from '~/components/partials/FloatingBottomAds.vue'

export default {
  components: { NewsList, Breadcrumb, AddThis, MainAds, FloatingBottomAds },
  layout: 'detail',
  async asyncData({ params }) {
    const endpoint = `${process.env.apiURL}/detail/${params.slug}`
    const data = await fetch(endpoint).then((res) => res.json())
    return { data }
  },
  data() {
    return {
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
