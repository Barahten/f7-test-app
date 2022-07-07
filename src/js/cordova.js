import { f7 } from 'framework7-vue';
import {i18n} from "./app";
import store from "./store";

let cordovaApp = {
    init: function () {
        this.detectTheme()
        this.pushHandler()
        this.backbuttonHandler()
        //if(localStorage.welcome && localStorage.welcome === 'false') {
            //this.geolocationPermissionRequest()
        //}

        console.log('INITIALIZED')
        // let db = window.sqlitePlugin.openDatabase({
        //     name: 'database.db',
        //     location: 'default',
        //     createFromLocation: 1
        // })
        // console.log(db)
        this.hideSplashScreen()

    },
    detectTheme: function() {
        cordova.plugins.ThemeDetection.isAvailable(available => {
            if(available.value) {
                cordova.plugins.ThemeDetection.isDarkModeEnabled(enable => {
                    if(enable.value) {
                        localStorage.theme = 'dark'
                    }
                })
            }
        })
    },
    hideSplashScreen: function() {
        setTimeout(() => {
            navigator.splashscreen.hide();
            console.log('SPLASH WAS HIDDEN')
        }, 5000);
    },
    smsPermissionRequest: function() {
        return new Promise((resolve) => {
            window.sms.requestPermission((hasPermission) => {
                if(hasPermission) {
                    resolve()
                }
            })
        })
    },
    smsSendHandler: function(message) {
        f7.dialog.progress(i18n.global.t('dialog.progress.text'));

        let options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: '' // send SMS without opening any other app, require : android.permission.SEND_SMS and android.permission.READ_PHONE_STATE
            }
        };
        window.sms.hasPermission(hasPermission => {
            if(hasPermission) {
                window.sms.send('+79999204165', message, options, () => {
                    f7.dialog.close()
                    f7.popup.get('.popup-sms').close(true)
                    f7.toast.create({
                        text: i18n.global.t('toast.sms_send'),
                        closeTimeout: 5000,
                        closeButton: true,
                        closeButtonColor: 'white'
                    }).open(true);
                    console.log('SMS SENT')
                }, error => {console.log('SMS ERROR', error)})
            } else {
                window.sms.requestPermission(() => {
                    window.sms.send('+79999204165', message, options, () => {
                        f7.dialog.close()
                        f7.popup.get('.popup-sms').close(true)
                        f7.toast.create({
                            text: i18n.global.t('toast.sms_send'),
                            closeTimeout: 5000,
                            closeButton: true,
                            closeButtonColor: 'white'
                        }).open(true);
                    }, error => {console.log('SMS ERROR', error)})
                }, () => {
                    console.log('SMS PERMISSION DENIED')
                })
            }

        }, () => {
            console.log('SMS PERMISSION DENIED')
        })
    },
    pushPermissionRequest: function() {
        return new Promise((resolve, reject) => {
            FirebasePlugin.hasPermission(hasPermission => {
                if(hasPermission) {
                    console.log('PERMISSION GRANTED')
                    if(!localStorage.fcm) {
                        FirebasePlugin.getToken((token) => {
                            localStorage.fcm = token
                            window.FirebasePlugin.subscribe('ALL')
                        })
                    }

                } else if(!hasPermission) {
                    console.log("Requesting remote notifications permission");
                    FirebasePlugin.grantPermission(granted => {
                        FirebasePlugin.getToken((token) => {
                            localStorage.fcm = token
                            window.FirebasePlugin.subscribe('ALL')
                        })

                    }, error => {
                        console.log('PERMISSION DENIED')
                    });
                }
                resolve()
            }, error => {
                console.log('NO PERMISSION')
            })
        })

    },
    geolocationPermissionRequest: function() {
        return new Promise((resolve, reject) => {
            //let watchPositionTimer = null

           cordova.plugins.locationServices.geolocation.getCurrentPosition(position => {
                console.log('LATITUDE ' + position.coords.latitude);
                console.log('LONGITUDE ' + position.coords.longitude);
                store.commit('COORDINATES', {"latitude" : position.coords.latitude, "longitude" : position.coords.longitude})
                // axios.get(
                //     'https://api.mapbox.com/geocoding/v5/mapbox.places/'
                //     + position.coords.longitude + ',' + position.coords.latitude
                //     + '.json?types=region&access_token=pk.eyJ1IjoiYmFyYWh0ZW4iLCJhIjoiY2wzbW14dnJ6MDY5NzNibW91ampmeTdudCJ9.A_92L5VpMCRpgRWPcLIYLw')
                //     .then(response => {
                //         console.log('GEOLOCATION DATA: ', response.data.features[0]);
                //
                //     })
                //     .catch(error => {
                //         console.log('getPositionGeocode error response: ', error.response);
                //     });
                //cordova.plugins.locationServices.geolocation.clearWatch(watchPositionTimer);
                resolve()
            }, error => {
                console.log('Geolocation error', error)
                reject()
            }, {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true, priority: 100, interval: 6000, fastInterval: 1000});
        })

    },
    pushHandler: function() {
        FirebasePlugin.onMessageReceived(function(notification) {
            console.log('PUSH RECEIVED', notification)
            if(notification) {
                if('tap' in notification) {
                    console.log('PUSH TAPPED', notification)
                    f7.popup.create({
                        content: `<div class="popup">
                            <div class="page">
                              <div class="navbar">
                                <div class="navbar-bg"></div>
                                <div class="navbar-inner">
                                  <div class="title">${ notification.title }</div>
                                  <div class="right"><a href="#" class="link popup-close"><i class="icon f7-icons">multiply</i></a></div>
                                </div>
                              </div>
                              <div class="page-content">
                                <div class="block">${ notification.long_description }</div>
                              </div>
                            </div>
                          </div>`,
                        swipeToClose: true,
                        // Events
                        on: {
                            open: function (popup) {
                                console.log('SENT ANALYTICS API');
                            }
                        }
                    }).open(true);
                }
            }
        }, function(error) {
            console.error(error);
        });
    },
    backbuttonHandler: function(){
        let pressed = 0;
        document.addEventListener('backbutton', function(e) {
            e.preventDefault()
            if(pressed >= 1){
                navigator.app.exitApp();
            }
            pressed++;
            f7.toast.create({
                text: i18n.global.t('toast.exit'),
                closeTimeout: 2000,
                closeButton: false,
            }).open(true);
            setTimeout(() => {
                pressed = 0;
            },2000)
        }, false)
    }


}
export default cordovaApp;