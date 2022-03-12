<template>
  <div class="toggle-area">
    <input
      id="switch"
      v-model="status"
      class="container_toggle"
      type="checkbox"
      name="mode"
      @change="darkToggle()"
    />
    <label for="switch">Toggle</label>
  </div>
</template>

<script>
export default {
  name: 'Knobs',
  data() {
    return {
      status: this.$cookies.get('tada-dark-mode'),
    }
  },
  head() {
    return {
      htmlAttrs: {
        theme: this.$cookies.get('tada-dark-mode') ? 'dark' : 'light',
      },
    }
  },
  methods: {
    darkToggle() {
      if (this.status) {
        this.$cookies.set('tada-dark-mode', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
        })
        this.setTheme('dark')
      } else {
        this.$cookies.remove('tada-dark-mode')
        this.setTheme('light')
      }
    },
    setTheme(theme) {
      document.documentElement.setAttribute('theme', theme)
    },
  },
}
</script>
