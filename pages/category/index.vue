<template>
  <p v-if="$fetchState.pending" class="ml-3">Loading Content...</p>
  <p v-else-if="$fetchState.error" class="ml-3">An error occurred :(</p>
  <div v-else>
    <section class="categories">
      <div class="container">
        <div class="row">
          <div class="col-12" @click="tadaNewsChild = !tadaNewsChild">
            <div class="categories-listing">
              <div class="categories-list">
                <div class="container p-0">
                  <div class="row align-items-center">
                    <div class="col-2 pr-0">
                      <div class="icon-category">
                        <i class="fas fa-newspaper"></i>
                      </div>
                    </div>
                    <div class="col-8 col-md-9 pl-0">
                      <h5 class="mb-0">Tada News</h5>
                    </div>
                    <div class="col-2 col-md-1 pl-0">
                      <i v-if="!tadaNewsChild" class="fas fa-chevron-right"></i>
                      <i v-else class="fas fa-chevron-down"></i>
                    </div>
                  </div>
                </div>
                <div :class="{ 'd-none': !tadaNewsChild }">
                  <NuxtLink
                    v-for="(item, index) in data.category"
                    :key="index"
                    :to="{ path: 'category/' + item.urlcategory }"
                    class="categories-listing__child"
                  >
                    <div class="categories-listing__child-item mt-2 ml-3 pb-2">
                      <div class="container p-0">
                        <div class="row align-items-center">
                          <div class="col-1">
                            <div class="icon-sub-category">-</div>
                          </div>
                          <div class="col-9 col-md-9">
                            <h6 class="mb-0 categories-listing__child-title">
                              {{ item.name }}
                            </h6>
                          </div>
                          <div class="col-2 col-md-1">
                            <i class="fas fa-chevron-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <NuxtLink
              v-for="item in categories"
              :key="item.slug"
              class="categories-listing"
              :to="{
                path:
                  item.slug == 'polling' ? '/polling' : 'category/' + item.slug,
              }"
            >
              <div class="categories-list">
                <div class="container p-0">
                  <div class="row align-items-center">
                    <div class="col-2 pr-0">
                      <div class="icon-category" v-html="item.icon"></div>
                    </div>
                    <div class="col-8 col-md-9 pl-0">
                      <h5 class="mb-0">{{ item.title }}</h5>
                    </div>
                    <div class="col-2 col-md-1 pl-0">
                      <i class="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
          <!-- <div
            v-for="(item, index) in data.category"
            :key="index"
            class="col-12"
          >
            <NuxtLink
              :to="{ path: 'category/' + item.urlcategory }"
              class="categories-listing"
            >
              <div class="categories-list">
                <div class="container p-0">
                  <div class="row align-items-center">
                    <div class="col-2 pr-0">
                      <div class="icon-category">
                        <i class="fas fa-newspaper"></i>
                      </div>
                    </div>
                    <div class="col-8 col-md-9 pl-0">
                      <h5 class="mb-0">{{ item.name }}</h5>
                    </div>
                    <div class="col-2 col-md-1 pl-0">
                      <i class="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  layout: 'category',
  data() {
    return {
      data: {},
      tadaNewsChild: false,
      categories: [
        {
          title: 'Tada TV',
          slug: 'tada-tv',
          icon: '<i class="fas fa-tv"></i>',
        },
        {
          title: 'News Story',
          slug: 'news-story',
          icon: '<i class="fas fa-history"></i>',
        },
        {
          title: 'Depth News',
          slug: 'depth-news',
          icon: '<i class="fab fa-hacker-news"></i>',
        },
        {
          title: 'Q & A',
          slug: 'q-&-a',
          icon: '<i class="fas fa-question"></i>',
        },
        {
          title: 'Journal & Argue',
          slug: 'journal-&-argue',
          icon: '<i class="fas fa-journal-whills"></i>',
        },
        {
          title: 'E Paper',
          slug: 'e-paper',
          icon: '<i class="fas fa-scroll"></i>',
        },
        {
          title: 'Polling',
          slug: 'polling',
          icon: '<i class="fas fa-poll"></i>',
        },
        {
          title: 'Tada Komik',
          slug: 'tada-komik',
          icon: '<i class="fas fa-book-reader"></i>',
        },
      ],
    }
  },
  async fetch() {
    if (this.resources.category) {
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
      title: 'Kategori - Berita Seputar Daerah Tapal Kuda',
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
