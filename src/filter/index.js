import moment from 'moment'
import Vue from 'vue'


Vue.filter('timeFormat', function(time) {
    moment.locale('zh-cn')
    return moment(time).fromNow()
})