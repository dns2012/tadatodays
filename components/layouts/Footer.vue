<template>
  <section class="footer">
    <div class="footer-area">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-2">
            <NuxtLink
              to="/"
              :class="{ 'nav-active': $nuxt.$route.name == 'index' }"
            >
              <i class="fas fa-home"></i>
              <p>Beranda</p>
            </NuxtLink>
          </div>
          <div class="col-3">
            <NuxtLink
              to="/category"
              :class="{
                'nav-active':
                  $nuxt.$route.name == 'category' ||
                  $nuxt.$route.name == 'category-id',
              }"
            >
              <i class="fas fa-th-large"></i>
              <p>Kategori</p>
            </NuxtLink>
          </div>
          <div class="col-2">
            <NuxtLink
              :to="{ path: '/category/tada-tv' }"
              :class="{
                'nav-active': $nuxt.$route.path == '/category/tada-tv',
              }"
            >
              <i class="fas fa-tv"></i>
              <p>TadaTV</p>
            </NuxtLink>
          </div>
          <!-- <div class="col-4 col-4 px-4 d-flex justify-content-center">
            <div class="center-nav-menu">
              <NuxtLink
                to="/category/e-paper"
                :class="{
                  'nav-active':
                    $nuxt.$route.name == 'category' ||
                    $nuxt.$route.name == 'category-id',
                }"
              >
                <i class="fas fa-file-alt"></i>
                <p>E-Paper</p>
              </NuxtLink>
            </div>
          </div> -->
          <div class="col-3">
            <NuxtLink
              :to="{ path: '/category/e-paper' }"
              :class="{
                'nav-active': $nuxt.$route.path == '/category/e-paper',
              }"
            >
              <i class="fas fa-file-alt"></i>
              <p>E-paper</p>
            </NuxtLink>
          </div>
          <div class="col-2">
            <NuxtLink
              :to="{ path: '/page' }"
              :class="{
                'nav-active': $nuxt.$route.path == '/page',
              }"
            >
              <i class="fas fa-info-circle"></i>
              <p>Info</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      isActive: '',
    }
  },
}
</script>
