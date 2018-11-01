import Vue from 'vue'
import app from './app.vue'
import './assets/styles/test.css'
import './assets/images/github.jpg'
import './assets/styles/test-stylus.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:(h) => h(app)
}).$mount(root)