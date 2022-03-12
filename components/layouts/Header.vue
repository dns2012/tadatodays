<template>
  <!-- Header -->
  <header id="header" class="header">
    <div class="header-container">
      <NuxtLink to="/" class="navbar-brand logo">
        <img
          src="~/assets/img/tada-panjang-ungu.png"
          class="img-fluid"
          alt=""
          loading="lazy"
        />
        <img
          src="~/assets/img/tada-square-ungu-new.jpg"
          class="img-fluid"
          alt=""
          loading="lazy"
        />
      </NuxtLink>
      <Search />
    </div>
  </header>
  <!-- end: Header -->
</template>
<script>
import Search from '~/components/partials/Search.vue'
export default {
  name: 'Header',
  components: { Search },
}
</script>
