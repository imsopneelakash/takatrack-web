/* TakaTrack ads: shows an AdMob banner ONLY inside the Android app.
   On the website (browser) nothing is loaded, so AdSense/web rules stay safe.
   TEST = true  -> Google sample (test) ads, safe for development.
   TEST = false -> your real ad unit (switch only for the final release). */
(function () {
  var TEST = true;
  var UNIT_TEST = 'ca-app-pub-3940256099942544/6300978111';
  var UNIT_REAL = 'ca-app-pub-9612096979718972/7266736524';

  var cap = window.Capacitor;
  if (!cap || !cap.isNativePlatform || !cap.isNativePlatform()) return; // website: no ads

  function setAdHeight(h) {
    document.documentElement.style.setProperty('--ad', h + 'px');
    // pages without their own bottom bar (e.g. landing page) just get bottom padding
    if (!document.getElementById('n')) document.body.style.paddingBottom = h + 'px';
  }

  async function start() {
    try {
      var AdMob = cap.Plugins && cap.Plugins.AdMob;
      if (!AdMob) return;
      await AdMob.initialize({ initializeForTesting: TEST });
      AdMob.addListener('bannerAdSizeChanged', function (size) {
        setAdHeight(size && size.height ? size.height : 0);
      });
      await AdMob.showBanner({
        adId: TEST ? UNIT_TEST : UNIT_REAL,
        adSize: 'ADAPTIVE_BANNER',
        position: 'BOTTOM_CENTER',
        margin: 0,
        isTesting: TEST
      });
    } catch (e) {
      console.log('ads error', e);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
