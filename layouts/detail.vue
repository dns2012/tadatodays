<template>
  <div>
    <main class="main-area details">
      <!-- Header -->
      <header id="header" class="header">
        <div class="header-container">
          <NuxtLink to="/" class="navbar-brand logo details">
            <i class="fas fa-arrow-left"></i> <span>Back</span>
          </NuxtLink>
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
