import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar, faCodeBranch, faCode, faLaptopCode, faCopyright, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faInstagram, faTiktok, faMedium, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub, faLinkedin, faInstagram, faTiktok, faMedium, faYoutube, faXTwitter, faStar, faCodeBranch, faCode, faLaptopCode, faCopyright, faDownload)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')