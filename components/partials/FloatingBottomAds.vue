<template>
  <div v-if="filterAds.length > 0" class="ads-floating">
    <img
      v-for="(item, index) in filterAds"
      :key="index"
      :src="item | ads_image"
      class="img-fluid"
      :class="{ 'mt-2': index }"
    />
  </div>
  <div v-else class="ads-floating">
    <img src="~/assets/img/IKLAN AGAK PANJANG2 BARU.jpg" class="img-fluid" />
  </div>
</template>

<script>
export default {
  name: 'FloatingBottomAds',
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
