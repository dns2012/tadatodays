<template>
  <div>
    <section class="news-details">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <Breadcrumb
              :data="[
                {
                  title: 'Polling',
                  url: '/polling',
                },
              ]"
            />
            <div class="news-top-info mb-2">
              <h4 class="mb-3">
                {{ data.polling.title }}
              </h4>
              <div class="container pl-0">
                <div class="row justify-content-between align-items-center">
                  <div class="col-12 pl-3 pl-m-1">
                    <div class="news-info">
                      <p>
                        {{
                          data.polling.start_at | publish_date | indo_day_parser
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
                  {{ data.polling.question }}
                </h6>
                <div
                  v-if="!data.is_participated && data.is_open"
                  class="d-flex justify-content-center mb-3"
                >
                  <button class="btn btn-outline-primary mr-3" @click="vote(0)">
                    Tidak
                  </button>
                  <button class="btn btn-outline-primary" @click="vote(1)">
                    Ya
                  </button>
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
                    <div>
                      <strong>{{ getAgreePercentage() }}%</strong>
                    </div>
                    <div class="progress w-100 mr-2 ml-2">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="`width: ${getAgreePercentage()}%`"
                        :aria-valuenow="getAgreePercentage()"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div>
                      <strong
                        >{{
                          data.polling_total > 0 ? data.polling_percentage : 50
                        }}%</strong
                      >
                    </div>
                  </div>
                </div>
                <span class="badge badge-dark"
                  >PARTISIPAN : {{ data.polling_total }}</span
                >
                <span class="badge badge-success"
                  >TIDAK : {{ data.polling_disagree }}</span
                >
                <span class="badge badge-danger"
                  >YA : {{ data.polling_agree }}</span
                >
                <div class="mt-2 mb-3">
                  <p v-if="data.is_open && data.is_participated">
                    Anda telah melakukan voting
                  </p>
                  <p v-if="!data.is_open">Polling telah ditutup</p>
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

    <!-- <section class="news-list">
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
    </section> -->
  </div>
</template>

<script>
import AddThis from 'vue-simple-addthis-share'
import Breadcrumb from '~/components/partials/Breadcrumb.vue'
import MainAds from '~/components/partials/MainAds.vue'

export default {
  components: { Breadcrumb, AddThis, MainAds },
  layout: 'detail',
  async asyncData({ params, app }) {
    const endpoint = `${process.env.apiURL}/polling/${
      params.slug
    }?user_id=${app.$cookies.get('tada-uid')}`
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
      title: this.data.polling.title,
      description: this.data.polling.question,
      image:
        'https://tadatodays.com/public/assets/mobile/img/tada-square-ungu-new.jpg',
      url: process.env.baseURL + this.$route.fullPath,
    })
  },
  methods: {
    getAgreePercentage() {
      return this.data.polling_total > 0
        ? 100 - this.data.polling_percentage
        : 50
    },
    async vote(answer) {
      const endpoint = `${process.env.apiURL}/polling/vote/${
        this.$route.params.slug
      }?user_id=${this.$cookies.get('tada-uid')}&answer=${answer}`
      const result = await fetch(endpoint).then((res) => res.json())
      if (result.status) {
        this.data.is_participated = true
        this.data.polling_total = this.data.polling_total + 1
        if (answer) {
          this.data.polling_agree = this.data.polling_agree + 1
        } else {
          this.data.polling_disagree = this.data.polling_disagree + 1
        }
        this.data.polling_percentage = Math.ceil(
          (this.data.polling_agree / this.data.polling_total) * 100
        )
        this.$cookies.set('tada-uid', result.user_id)
      }
    },
  },
}
</script>
