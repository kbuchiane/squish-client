import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import BrowserUnsupported from './BrowserUnsupported';

Vue.config.productionTip = false;

const browserCheck = require("./utils/browserCheck");
var message = "";
var browserSupported = browserCheck.isBrowserSupported();

if (browserSupported) {
  browserSupported = browserCheck.isBrowserVersionSupported();

  if (!browserSupported) {
    message = "Squish does not support this version of " + browserCheck.getName() + ", please update to version " + browserCheck.getSupportedVersion() + " or later";
  }
}
else {
  message = "Squish does not support " + browserCheck.getName() + ", please try using a different browser";
}

if (browserSupported) {
  new Vue({
    vuetify,
    router,
    render: h => h(App)
  }).$mount('#app')
}
else {
  new Vue({
    render: h => h(BrowserUnsupported,
      {
        props:
          { reason: message }
      })
  }).$mount("#app");
}

