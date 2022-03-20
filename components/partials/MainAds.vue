<template>
  <div class="container">
    <div v-if="filterAds.length > 0" class="row">
      <div
        v-for="(item, index) in filterAds"
        :key="index"
        class="col-12"
        :class="{ 'mt-2': index }"
      >
        <img :src="item | ads_image" class="img-fluid" loading="lazy" />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <img
          src="~/assets/img/IKLAN AGAK PANJANG2 BARU.jpg"
          class="img-fluid"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainAds',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    position: {
      type: String,
      default: null,
    },
  },
  computed: {
    filterAds() {
      const result = this.data.filter((item) => item.position === this.position)
      return result
    },
  },
}
</script>
