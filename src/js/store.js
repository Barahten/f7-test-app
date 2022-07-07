
import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      fontsize: localStorage.fontsize || 14,
      coordinates: {longitude: 37.6025325, latitude: 55.6121792},
      //coordinates: null,
      mapbox_token: 'pk.eyJ1IjoiYmFyYWh0ZW4iLCJhIjoiY2wzbW14dnJ6MDY5NzNibW91ampmeTdudCJ9.A_92L5VpMCRpgRWPcLIYLw',
      articles : [
        {'title' : 'COVID-19', 'page' : 'corona', 'uniqid' : 'coronavirus', 'header' : 'Rules of prevention', actual: true, 'text' : '<p><b>RULE 1. WASH YOUR HANDS FREQUENTLY WITH SOAP AND WATER </b></p><p>Clean and disinfect surfaces using household detergents. </p><p>Hand hygiene is an important measure to prevent the spread of flu and coronavirus infection. Washing with soap removes viruses. If you can’t wash your hands with soap, use alcohol-containing or disinfecting wipes. </p><p>Cleaning and regular disinfection of surfaces (tables, door handles, chairs, gadgets, etc.) remove viruses. </p>'},
        {'title' : 'Summer snake attack: how to protect yourself from a bite', 'page' : 'recommendations', 'uniqid' : 'zmei', 'header' : '', actual: true, 'text' : '<p>The bite of a venomous snake is dangerous for humans. Therefore, when you meet a snake, you do not need to show aggression. In most cases, it will creep away very soon.<br />Snakes are active from May to September, and in the cold season they hide in burrows. In summer, they like to bask in the sun, you may stumble on them on rocks, stumps, paths. Snakes often hide between rocks, in haystack, in a pile of building materials. Being attracted by the heat and light, they can creep to the fire at night. The most common snake in our regions is the common Viper. It can be found in the forest and in the steppe.</p><p><b>When the snake attacks</b></p>', 'links' : [{"uniqid":"snakeBite","type":"article","title":"Snake bite"}], 'tags' : ["Hiking in the woods","Country house","To go mushrooming"]},
        {'title' : 'Thunderstorm (lightning and thunder)', 'page' : 'what-to-do', 'uniqid' : 'storm', 'header' : 'Lightning is dangerous when the flash is followed by a thunderclap. In this case, take immediate precautions.', 'text' : '', 'children' : [{"title":"In rural areas:","uniqid":"storm1","header":"","text":"<p>close windows, doors, chimneys and air vents. Do not heat the stove as the high temperature gases coming out of the chimney have low resistance. Do not talk on the phone: lightning sometimes gets into the wires stretched between the poles.<\/p><p>During lightning strikes, do not come close to the wiring, lightning rod, roof drains, antenna, do not stand near the window, if it\u2019s possible, turn off the TV, radio and other household appliances.<\/p>"},{"title":"In the forest:","header":"","uniqid":"storm2","text":"<p>take cover in a <nobr>low-growing<\/nobr> area of the forest. Do not hide near tall trees, especially pines, oaks and poplars.<\/p><p>Don\u2019t stay in a water bodies or on its shore. Move away from the shore, go down from an elevated place in the lowlands.<\/p>"},{"title":"In the steppe, field or in the absence of shelter (buildings): ","header":"","unqid":"storm3","text":"<p>do not lie down on the ground, exposing your whole body to the electric current, but squat in a hollow, ravine, or other natural depression, with your legs clasped in your hands.<\/p><p>If a storm front overtakes you during sports, then immediately stop them. Metal objects (motorcycle, Bicycle, ice axe, etc.) put aside, move away from them for 20&ndash;30 m.<\/p>"},{"title":"In the car (automobile):","uniqid":"storm4","header":"","text":"<p>do not leave it, at the same time close the Windows and lower the radio antenna.<\/p>"}]},
      ],
      current_article: null,
      // current_actual_article: null,
      // what_to_do_articles: [
      //
      // ],
      // current_what_to_do_article: null,
    }
  },
  getters: {
    FONTSIZE: (state) => {
      return state.fontsize
    },
    COORDINATES: (state) => {
      return state.coordinates
    },
    MAPBOX_TOKEN: (state) => {
      return state.mapbox_token
    },
    ACTUAL_ARTICLES: (state) => {
        return state.articles.filter(item => item.actual === true)
    },
    WHAT_TO_DO_ARTICLES: (state) => {
        return state.articles.filter(item => item.page === 'what-to-do')
    },
    CURRENT_ARTICLE: (state) => {
      return state.current_article
    }
    // CURRENT_ACTUAL_ARTICLES: (state) => {
    //   return state.current_actual_article
    // },
    // WHAT_TO_DO_ARTICLES: (state) => {
    //   return state.what_to_do_articles
    // },
    // CURRENT_WHAT_TO_DO_ARTICLES: (state) => {
    //   return state.current_what_to_do_article
    // }
  },
  mutations: {
    FONTSIZE (state, size) {
      state.fontsize = size
    },
    COORDINATES (state, coords) {
      this.state.coordinates = coords
    },
    CURRENT_ARTICLE (state, uniqid) {
      state.current_article = state.articles.find(item => {
        return item.uniqid === uniqid;
      })
    },
    // CURRENT_WHAT_TO_DO_ARTICLES (state, page) {
    //   state.current_what_to_do_article = state.what_to_do_articles.find(item => {
    //     return item.page === page;
    //   })
    //   console.log()
    // }
  }
})
export default store;
