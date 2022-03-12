<template>
  <p v-if="$fetchState.pending" class="ml-3">Loading Content...</p>
  <p v-else-if="$fetchState.error" class="ml-3">An error occurred :(</p>
  <div v-else>
    <section class="categories">
      <div class="container">
        <div class="row">
          <div
            v-for="(item, index) in data.category"
            :key="index"
            class="col-12"
          >
            <NuxtLink
              :to="{ path: 'category/' + item.urlcategory }"
              class="categories-listing"
            >
              <div class="categories-list">
                <div class="container p-0">
                  <div class="row align-items-center">
                    <div class="col-2 pr-0">
                      <div class="icon-category">
                        <i class="fas fa-newspaper"></i>
                      </div>
                    </div>
                    <div class="col-8 col-md-9 pl-0">
                      <h5 class="mb-0">{{ item.name }}</h5>
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
import { mapGetters, mapMutations } from 'vuex'
export default {
  layout: 'category',
  data() {
    return {
      data: {},
    }
  },
  async fetch() {
    if (this.resources.category) {
      this.data = this.resources
    } else {
      this.data = await fetch(process.env.apiURL + 'resources').then((res) =>
        res.json()
      )
      this.setResources(this.data)
    }
  },
  fetchOnServer: false,
  computed: {
    ...mapGetters({
      resources: 'getMainResources',
    }),
  },
  methods: {
    ...mapMutations({
      setResources: 'setMainResources',
    }),
  },
}
</script>
