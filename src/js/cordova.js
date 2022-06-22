let cordovaApp = {
    init: function () {
        this.detectTheme()

        console.log('INITIALIZED')
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
            console.log('AVAILABLE', available)
        })
    },
    hideSplashScreen: function() {
        setTimeout(() => {
            navigator.splashscreen.hide();
            console.log('SPLASH WAS HIDDEN')
        }, 5000);
    },
    smsPermissionRequest: function() {
        window.sms.requestPermission()
    }
}
export default cordovaApp;