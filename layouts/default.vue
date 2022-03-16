<template>
  <div>
    <main class="main-area">
      <Header />
      <Nuxt />
      <Footer />
    </main>
    <Knobs />
    <div class="polling d-none">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tada Polling</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <h6><strong>Polling Pilpres 2024</strong></h6>
            <p>Apakah Anda setuju pilpres 2024 diundur 3 tahun mendatang ?</p>
            <div class="d-flex justify-content-center mb-3">
              <button class="btn btn-outline-primary mr-3">Tidak</button>
              <button class="btn btn-outline-primary">Ya</button>
            </div>
            <div>
              <div class="d-flex align-items-baseline justify-content-center">
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
            <div class="mt-2 mb-3">
              Terima kasih, polling akan ditutup dalam <strong>5</strong> ...
            </div>
          </div>
          <!-- <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from '~/components/layouts/Footer.vue'
import Header from '~/components/layouts/Header.vue'
import Knobs from '~/components/layouts/Knobs.vue'
export default {
  components: { Header, Footer, Knobs },
}
</script>
