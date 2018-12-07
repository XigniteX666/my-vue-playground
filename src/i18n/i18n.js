import Vue from 'vue';
import VueI18n from 'vue-i18n';


Vue.use(VueI18n);

const fallbackLocale = 'en';

function findInitialLocale() {
    const storedLocale = localStorage.getItem('locale');
    return storedLocale || fallbackLocale;
}

function loadMessages() {
    const locales = require.context('@/i18n', true, /[a-z0-9]+\.json$/i);
    const messages = {};
    locales.keys().forEach((key) => {
      const matched = key.match(/([a-z0-9]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales(key);
      }
    });
    return messages;
  }
  

const numberFormats = {
    'en-US': {
      currency: {
        style: 'currency', currency: 'USD'
      }
    },
    'de-DE': {
      currency: {
        style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
      }
    }
  }

const i18n = new VueI18n({
    locale: findInitialLocale(),
    fallbackLocale,
    messages: loadMessages(),
    numberFormats,
  });


export default i18n;