<template>
  <div>
    <main class="main-area">
      <Header />
      <Nuxt />
      <Footer />
    </main>
    <Knobs />
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
