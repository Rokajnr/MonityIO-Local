import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Overrides default translations/labels in the admin panel
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to Monityio!",
        "Auth.form.welcome.subtitle": "Log in to your admin panel",
        "app.components.LeftMenu.navbrand.title": "Monityio Panel",
        "app.components.LeftMenu.navbrand.workplace": "Console",
      },
    },
    // Disable tutorials/release notifications
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap(app: StrapiApp) {
    // Bootstrap code
  },
};
