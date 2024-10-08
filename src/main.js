import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import gtag from 'vue-gtag';
import 'devicon/devicon.min.css';
import './assets/bg.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar, faCodeBranch, faCode, faLaptopCode, faCopyright, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faInstagram, faTiktok, faMedium, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faLinkedin, faInstagram, faTiktok, faMedium, faYoutube, faXTwitter, faStar, faCodeBranch, faCode, faLaptopCode, faCopyright, faDownload)

const app = createApp(App)

app.use(router) // Use the router
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(gtag, {
  property: {
    id: import.meta.env.VITE_GA_ID,
  },
})
app.mount('#app')
