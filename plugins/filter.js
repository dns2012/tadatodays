import Vue from 'vue'
import moment from 'moment'

Vue.filter('time_ago', function (date) {
  return moment(date).fromNow()
})

Vue.filter('post_image', function (data) {
  const postDate = data.postdate.split(' ')
  const postDatePath = postDate[0].replace(/-/g, '/')
  return `${process.env.cdnPostURL}/${postDatePath}/${data.photo}`
})

Vue.filter('post_image_detail', function (data) {
  const postDate = data.postdate.split(' ')
  const postDatePath = postDate[0].replace(/-/g, '/')
  return `${process.env.cdnPostURL}/${postDatePath}/${data.postphoto}`
})

Vue.filter('ads_image', function (data) {
  return `${process.env.cdnAdsURL}/${data.image}`
})

Vue.filter('publish_date', function (date) {
  return moment(date).format('dddd, DD MMM YYYY HH:mm')
})

Vue.filter('indo_day_parser', function (date) {
  const days = {
    Sunday: 'Minggu',
    Monday: 'Senin',
    Tuesday: 'Selasa',
    Wednesday: 'Rabu',
    Thursday: 'Kamis',
    Friday: 'Jumat',
    Saturday: 'Sabtu',
  }
  let parsedDate = ''
  for (const i in days) {
    parsedDate = date.replace(i, days[i])
  }
  return parsedDate
})

Vue.filter('admin_image', function (data) {
  return `${process.env.cdnAdminURL}/${data.administratorphoto}`
})

Vue.filter('meta', function (data) {
  const description = `${data.description
    .replace(/(<([^>]+)>)/gi, '')
    .substr(0, 160)}...`
  return {
    title: `Tadatodays.com | ${data.title}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'Berita pasuruan, Berita probolinggo, Berita Daerah Bangil, Berita Daerah Pandaan, Berita Daerah Pasuruan, Berita Daerah Probolinggo, Berita Daerah Kraksaan, Portal Berita, Berita Teraktual, Berita Terpercaya, Tapal Kuda, Tadatodays, Berita Daerah Tapal Kuda, Berita Jember, Berita Situbondo',
      },
      {
        hid: 'image',
        name: 'image',
        content: data.image,
      },
      {
        hid: 'alt_image',
        name: 'alt_image',
        content: data.image,
      },
      {
        hid: 'title_image',
        name: 'title_image',
        content: data.title,
      },
      {
        hid: 'language',
        name: 'language',
        content: 'bahasa',
      },
      {
        hid: 'geo.country',
        name: 'geo.country',
        content: 'id',
      },
      {
        hid: 'geo.placename',
        name: 'geo.placename',
        content: 'Indonesia',
      },
      {
        hid: 'googlebot-news',
        name: 'googlebot-news',
        content: 'index, follow, noodp',
      },
      {
        hid: 'googlebot',
        name: 'googlebot',
        content: 'index, follow, noodp',
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'index, follow, noodp',
      },
      {
        hid: 'author',
        name: 'author',
        content: 'tadatodays.com',
      },
      {
        hid: 'og:locale',
        property: 'og:locale',
        content: 'id_ID',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: data.title,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        itemprop: 'image',
        content: data.image,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: data.url ? data.url : 'https://tadatodays.com',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'tadatodays.com',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@tadatodays.com',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: data.title,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: data.image,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: data.url ? data.url : 'https://tadatodays.com',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: data.url ? data.url : 'https://tadatodays.com',
      },
    ],
  }
})
