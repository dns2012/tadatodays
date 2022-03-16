export default {
  head() {
    const head = {
      title: this.meta.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description,
        },
        // OGP
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.meta.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.meta.description,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: this.meta.type || 'website',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.meta.image,
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: 'en_US',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://thenextbit.de' + this.$route.path,
        },
      ],
    }

    return head
  },
}
