<template>
  <div v-if="data && data.polling && data.polling.title" class="polling">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tada Polling</h5>
          <button
            v-if="!data.is_participated"
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="skipPolling"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body text-center">
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
            <button class="btn btn-outline-primary" @click="vote(1)">Ya</button>
          </div>
          <div>
            <div class="d-flex align-items-baseline justify-content-center">
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
          <span class="badge badge-danger">YA : {{ data.polling_agree }}</span>
          <div class="mt-2 mb-3">
            <p v-if="data.is_open && data.is_participated">
              Terima kasih, polling akan ditutup dalam
              <strong>{{ counter }}</strong> ...
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <a href="javascript:void(0)" @click="skipPolling">Lain Kali</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TadaPollingModal',
  data() {
    return {
      data: {},
      counter: 5,
    }
  },
  async fetch() {
    if (!this.$cookies.get('tada-skip-polling')) {
      const endpoint = `${
        process.env.apiURL
      }/polling/active/current?user_id=${this.$cookies.get('tada-uid')}`
      const data = await fetch(endpoint).then((res) => res.json())
      if (data && !data.polling) {
        this.$cookies.set('tada-skip-polling', true, {
          path: '/',
          maxAge: 60 * 60 * 24,
        })
      }
      this.data = data
    }
  },
  fetchOnServer: false,
  methods: {
    getAgreePercentage() {
      return this.data.polling_total > 0
        ? 100 - this.data.polling_percentage
        : 50
    },
    async vote(answer) {
      this.data.is_participated = true
      const endpoint = `${process.env.apiURL}/polling/vote/${
        this.data.polling.slug
      }?user_id=${this.$cookies.get('tada-uid')}&answer=${answer}`
      const result = await fetch(endpoint).then((res) => res.json())
      if (result.status) {
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
        setInterval(() => {
          if (this.counter > 0) {
            this.counter = this.counter - 1
          } else {
            this.skipPolling()
          }
        }, 1000)
      }
    },
    async skipPolling() {
      await this.$cookies.set('tada-skip-polling', true, {
        path: '/',
        maxAge: 60 * 60 * 24,
      })
      window.location.reload()
    },
  },
}
</script>
