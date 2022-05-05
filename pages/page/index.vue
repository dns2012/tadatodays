<template>
  <div>
    <section class="categories">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <NuxtLink
              v-for="item in categories"
              :key="item.slug"
              class="categories-listing"
              :to="{
                path: `page/${item.slug}`,
              }"
            >
              <div class="categories-list">
                <div class="container p-0">
                  <div class="row align-items-center">
                    <div class="col-2 pr-0">
                      <div class="icon-category" v-html="item.icon"></div>
                    </div>
                    <div class="col-8 col-md-9 pl-0">
                      <h5 class="mb-0">{{ item.title }}</h5>
                    </div>
                    <div class="col-2 col-md-1 pl-0">
                      <i class="fas fa-chevron-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'category',
  data() {
    return {
      data: {},
      tadaNewsChild: false,
      categories: [
        {
          title: 'Tentang Kami',
          slug: 'tentang-kami',
          icon: '<i class="fas fa-address-card"></i>',
        },
        {
          title: 'Redaksi',
          slug: 'redaksi',
          icon: '<i class="fas fa-compass"></i>',
        },
        {
          title: 'Karir',
          slug: 'karir',
          icon: '<i class="fas fa-handshake"></i>',
        },
        {
          title: 'Iklan',
          slug: 'iklan',
          icon: '<i class="fab fa-adversal"></i>',
        },
        {
          title: 'Pedoman Media Siber',
          slug: 'pedoman-media-siber',
          icon: '<i class="fab fa-staylinked"></i>',
        },
      ],
    }
  },
  head() {
    return this.$options.filters.meta({
      title: 'Berita Seputar Daerah Tapal Kuda',
      description: 'Berita Seputar Daerah Tapal Kuda',
      image:
        'https://tadatodays.com/public/assets/mobile/img/tada-square-ungu-new.jpg',
    })
  },
}
</script>
