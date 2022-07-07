// Import Vue
import { createApp } from 'vue';

// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/app.scss';

// Import App Component
import App from '../components/app.vue';
import store from "./store";
import VuePlyr from 'vue-plyr';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Localization
import { createI18n } from 'vue-i18n'
import ru from '../langs/ru.json'
import en from '../langs/en.json'
const lang = () => {
    if(!localStorage.lang) {
        if(navigator.language === 'ru-RU' || navigator.language === 'ru-ru' || navigator.language === 'ru') {
            localStorage.lang = 'ru'
            return 'ru'
        } else {
            return 'en'
        }
    } else {
        return localStorage.lang
    }
}
console.log('LANGUAGE', lang())
export const i18n = createI18n({
    legacy: true,
    locale: lang(), // set locale
    fallbackLocale: 'ru', // set fallback locale
    messages: { ru, en }, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})

// Init App
const app = createApp(App);
app.use(store)
app.use(i18n)
app.use(VuePlyr)

// Register Framework7 Vue components
registerComponents(app);

// Mount the app
app.mount('#app');