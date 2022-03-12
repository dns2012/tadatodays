<template>
  <div class="input-search">
    <input
      v-model="keyword"
      type="text"
      class="form-control form-search"
      aria-describedby="helpId"
      placeholder="Cari berita terkini"
      @keyup.enter="search()"
    />
  </div>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      keyword: this.$route.query.keyword,
    }
  },
  methods: {
    search() {
      window.location.href = `/news/search?keyword=${this.keyword}`
    },
  },
}
</script>
