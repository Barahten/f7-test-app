<template>
  <f7-page class="map" name="map">
    <f7-navbar back-link @back-click="onMapRemove">
      <f7-nav-title>{{ $t('page.map.title') }}</f7-nav-title>
    </f7-navbar>
    <div id="map"></div>
    <f7-list class="layer-on">
      <f7-list-item class="hide-element">
        <span>{{ $t('page.map.form.forecast') }}</span>
        <f7-toggle class="toggle forecast" v-model:checked="forecast" @change="toggleForecast"></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>{{ coords.latitude}}, {{ coords.longitude}}</span>
        <textarea style="" ref="copy" class="copy">{{ coords.latitude}}, {{ coords.longitude}}</textarea>
        <div class="item-after">
          <f7-button @click="copyCoords" class="btnCopy" small>
            <f7-icon size="24px" f7="square_on_square"></f7-icon>
          </f7-button>
        </div>
      </f7-list-item>
    </f7-list>

    <div v-if="forecast" class="map-overlay" id="legend">
      <div class="legend-container-child-title">
        <span class="legend-font-title">{{ $t('page.map.legend.title') }}</span>
      </div>
      <div class="legend-container">
        <span class="legend-key" style="background-color: #3BEB2F;"></span>
        <span class="legend-key" style="background-color: #b4eb67;"></span>
        <span class="legend-key" style="background-color: #ebea72;"></span>
        <span class="legend-key" style="background-color: #eb9854;"></span>
        <span class="legend-key" style="background-color: #eb4335;"></span>
        <span class="legend-key" style="background-color: #eb0025;"></span>
      </div>
      <div class="legend-container-child">
        <span class="legend-font">{{ $t('page.map.legend.low') }}</span>
        <span class="legend-font">{{ $t('page.map.legend.high') }}</span>
      </div>
    </div>


  </f7-page>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../css/mapbox.scss';
import {f7} from "framework7-vue";
import moment from 'moment';
import "moment/dist/locale/ru";
import 'moment/dist/locale/en-gb'
import {i18n} from "../js/app";


export default {
  data() {
    return {
      forecast: false,
      map: null,
    };
  },
  computed: {
    coords() {
      return this.$store.getters.COORDINATES;
    },
    toggleForecast() {
      this.forecast ? this.showForecastLayer() : this.hideForecastLayer()
    }
  },
  methods: {
    showForecastLayer() {
      if(this.map && this.map.getLayer('forecast-layer')){
        this.map.setLayoutProperty('forecast-layer', 'visibility', 'visible');
      }

    },
    hideForecastLayer() {
        if(this.map && this.map.getLayer('forecast-layer')){
          this.map.setLayoutProperty('forecast-layer', 'visibility', 'none');
        }
    },
    addForecastLayer() {
      this.map.addLayer({
        'id': 'forecast-layer',
        'type': 'fill',
        'source': {
          type: 'vector',
          tiles: [
            'https://rest.atlas.mchs.gov.ru/api/v1/operational-forecasts/layer/{x}/{y}/{z}?date=2022-06-24'
          ]
        },
        'source-layer': 'forecast-layer',
        'crossOrigin':'null',
        paint: {
          "fill-color": {
            property: "risk_level",
            stops: [[0, "#3BEB2F"], [1, "#b4eb67"], [2, "#ebea72"], [3, "#eb9854"], [4, "#eb4335"], [6, "#eb0025"]]
          },
          "fill-opacity": 0.5
        },
      });
      this.map.setLayoutProperty('forecast-layer', 'visibility', 'none');

    },
    onMapRemove() {
      f7.toast.close()
      //this.map.remove();
    },
    copyCoords() {
      let copy = f7.toast.create({
        text: 'Copied',
        closeTimeout: 1000,
      })
      let text = this.$refs.copy;
     text.select();
      text.setSelectionRange(0, 99999);
      document.execCommand("copy");
      text.blur();
      copy.open()
    }
  },
  mounted() {
    moment.locale(this.$i18n.locale)

    mapboxgl.accessToken = this.$store.getters.MAPBOX_TOKEN;
    let style = (localStorage.theme && localStorage.theme === 'dark') ? 'mapbox://styles/romaverne/ck6g8msbz32qz1imtldkk6saf' : 'mapbox://styles/romaverne/ck3jxl7nw38q21cnz2kcxfbpx'
    let map = new mapboxgl.Map({
      container: 'map',
      style: style,
      zoom: 15,
      center: [this.coords.longitude, this.coords.latitude],
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-right');

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: false,
      },
      trackUserLocation: true,
    });
    map.addControl(geolocate, 'bottom-right');
    const lang = new MapboxLanguage({defaultLanguage : this.$i18n.locale})
    map.addControl(lang);

    const size = 120
    const pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },
      render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2
        );
        context.fillStyle = `rgba(29, 161, 242, ${1 - t})`;
        context.fill();

        context.beginPath();
        context.arc(this.width / 2,  this.height / 2, radius, 0, Math.PI * 2 );
        context.fillStyle = 'rgba(29, 161, 242, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        this.data = context.getImageData(0,0, this.width, this.height).data;

        map.triggerRepaint();

        return true;
      }
    };

    map.on('load', () => {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      map.addSource('dot-point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [this.coords.longitude, this.coords.latitude] // icon position [lng, lat]
              }
            }
          ]
        }
      });
      map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
          'icon-image': 'pulsing-dot'
        }
      });
      this.addForecastLayer()

    });
    let toast = f7.toast.create({
      text: this.$t('toast.loading'),
    })
    map.on('sourcedata', (e)=> {
        toast.open(true)
    });
    map.on('idle', (e) => {
      toast.close()
    })
    map.once('error', () => {
      f7.dialog.alert('no_conneсtion');
    });

    map.on('click', 'forecast-layer', function(e) {

      let data = e.features[0].properties

      let htmlContent = `<div class="sheet-modal my-sheet-swipe-to-close">
                            <div class="sheet-modal-inner">
                                <div class="swipe-handler"></div>
                                <div class="page-content">
                                    <div class="block-title block-title-large">${e.features[0].properties.regionname}</div>
                                    <div class="block">
                                        <p>${i18n.global.t('page.map.as_date')} ${moment(e.features[0].properties.date).format('LLL')}</p>
                                        <small>${i18n.global.t('page.map.forecast_copyright')}</small>
                                    </div>
                                </div>
                            </div>
                          </div>`;

      // Create sheet modal
      f7.sheet.create({
        swipeToClose: true,
        closeByOutsideClick: true,
        backdrop: true,
        content: htmlContent.trim(),
      }).open();
    });



    this.map = map
  },
  unmounted() {
    f7.toast.close()
    this.map.remove()
  }
}
</script>
<style>
  #map {
    position: absolute;
    top: calc(var(--f7-navbar-height) + var(--f7-safe-area-top));
    bottom: 0;
    width: 100%;
  }
  .dark .layer-on {
    background-color: #000;
  }
   .layer-on {
     margin: 0 auto;
     border: 0 !important;
     background: #fff;
     padding: 15px 0;
     transition: 0.25s;
     transform: translateY(0);
   }
   .mapboxgl-ctrl-attrib.mapboxgl-compact {
     display: none !important;
   }
   .copy {
     position: absolute;
     left: -9999px;
     width: 0;
     height: 0;
     z-index: -1;
     opacity: 0;
     visibility: hidden;
   }




</style>