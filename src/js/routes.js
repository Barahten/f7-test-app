
import Home from '../pages/home.vue';
import About from '../pages/about.vue';
import Feedback from '../pages/feedback.vue'
import Settings from '../pages/settings.vue'
import Map from '../pages/map.vue'
import Articles from "../pages/articles.vue";
import WhatToDo from "../pages/what-to-do.vue"


import FormPage from '../pages/form.vue';
import LeftPage1 from '../pages/left-page-1.vue';
import LeftPage2 from '../pages/left-page-2.vue';
import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: "/about/",
    component: About,
    name: 'About',
    options: {
      transition: "f7-parallax",
    },
  },
  {
    path: "/feedback/",
    component: Feedback,
    name: 'Feedback',
    options: {
      transition: "f7-parallax",
    },
  },
  {
    path: "/settings/",
    component: Settings,
    name: 'Settings',
    options: {
      transition: "f7-parallax",
    },
  },
  {
    path: "/map/",
    component: Map,
    name: 'Map',
    options: {
      transition: "f7-parallax",
    },
  },
  {
    path: "/article-page/:uniqid",
    component: Articles,
    name: 'Articles',
    options: {
      transition: "f7-parallax",
    },
  },
  {
    path: "/what-to-do/",
    component: WhatToDo,
    options: {
      transition: "f7-parallax",
    },
  },








  {
    path: '/left-page-1/',
    component: LeftPage1,
  },
  {
    path: '/left-page-2/',
    component: LeftPage2,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({router, to, resolve}) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
            {
              component: RequestAndLoad,
            },
            {
              props: {
                user: user,
              }
            }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
