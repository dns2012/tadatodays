<template>
  <div>
    <main class="main-area details">
      <!-- Header -->
      <header id="header" class="header">
        <div class="header-container">
          <NuxtLink to="/" class="navbar-brand logo details">
            <i class="fas fa-arrow-left"></i> <span>Kembali</span>
          </NuxtLink>
        </div>
      </header>
      <!-- end: Header -->
      <Nuxt />
      <Footer />
    </main>
    <Knobs />
  </div>
</template>

<script>
import Footer from '~/components/layouts/Footer.vue'
import Knobs from '~/components/layouts/Knobs.vue'
export default {
  components: { Footer, Knobs },
}
</script>
