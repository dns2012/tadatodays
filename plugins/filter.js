import Vue from 'vue'
import moment from 'moment'

Vue.filter('time_ago', function (date) {
  return moment(date).fromNow()
})

Vue.filter('post_image', function (data) {
  const postDate = data.postdate.split(' ')
  const postDatePath = postDate[0].replace(/-/g, '/')
  return process.env.cdnPostURL + postDatePath + '/' + data.photo
})

Vue.filter('post_image_detail', function (data) {
  const postDate = data.postdate.split(' ')
  const postDatePath = postDate[0].replace(/-/g, '/')
  return process.env.cdnPostURL + postDatePath + '/' + data.postphoto
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
  return process.env.cdnAdminURL + '/' + data.administratorphoto
})
