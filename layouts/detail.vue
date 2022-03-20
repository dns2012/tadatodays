<template>
  <div>
    <main class="main-area details">
      <!-- Header -->
      <header id="header" class="header">
        <div class="header-container">
          <a
            href="javascript:void(0)"
            class="navbar-brand logo details"
            @click="$router.back()"
          >
            <i class="fas fa-arrow-left"></i> <span>Kembali</span>
          </a>
        </div>
      </header>
      <!-- end: Header -->
      <Nuxt />
    </main>
    <Knobs />
  </div>
</template>

<script>
import Knobs from '~/components/layouts/Knobs.vue'
export default {
  name: 'Detail',
  components: { Knobs },
}
</script>
