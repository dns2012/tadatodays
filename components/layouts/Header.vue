<template>
  <!-- Header -->
  <header id="header" class="header">
    <div class="header-container">
      <NuxtLink to="/" class="logo" :class="{ 'd-none': searchFocused }">
        <img
          src="~/assets/img/tada-panjang-ungu.png"
          class="img-fluid"
          alt=""
          loading="lazy"
        />
        <!-- <img
          src="~/assets/img/tada-square-ungu-new.jpg"
          class="img-fluid"
          alt=""
          loading="lazy"
        /> -->
      </NuxtLink>
      <Search @searchFocus="(val) => (searchFocused = val)" />
    </div>
  </header>
  <!-- end: Header -->
</template>
<script>
import Search from '~/components/partials/Search.vue'
export default {
  name: 'Header',
  components: { Search },
  data() {
    return {
      searchFocused: false,
    }
  },
  methods: {
    searchFocus(val) {
      console.log(val)
    },
  },
}
</script>
