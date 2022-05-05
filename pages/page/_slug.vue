<template>
  <div>
    <section class="news-details">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <Breadcrumb
              :data="[
                {
                  title: data.title,
                  url: `/page/${data.urlpage}`,
                },
              ]"
            />
            <div class="news-top-info mb-2">
              <h4 class="mb-3">
                {{ data.title }}
              </h4>
            </div>
            <div class="news-content" v-html="data.description"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Breadcrumb from '~/components/partials/Breadcrumb.vue'

export default {
  components: { Breadcrumb },
  layout: 'detail',
  async asyncData({ params }) {
    const endpoint = `${process.env.apiURL}/page/${params.slug}`
    const data = await fetch(endpoint).then((res) => res.json())
    return { data }
  },
  head() {
    return this.$options.filters.meta({
      title: this.data.title,
      description: this.data.description,
      image:
        'https://tadatodays.com/public/assets/mobile/img/tada-square-ungu-new.jpg',
      url: process.env.baseURL + this.$route.fullPath,
    })
  },
}
</script>
