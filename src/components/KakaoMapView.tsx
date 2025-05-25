import React, {useEffect, useRef} from 'react';
import {WebView} from 'react-native-webview';

type KakaoMapViewProps = {
  latitude: number;
  longitude: number;
};

const KakaoMapView = ({latitude, longitude}: KakaoMapViewProps) => {
  const webviewRef = useRef(null);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <style>
        html, body, #map {margin: 0; padding: 0; width: 100%; height: 100%;}
      </style>
      <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=f9b8f669337f6b388e43776684dfa566&autoload=false&libraries=services"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        window.onerror = function(message, source, lineno, colno, error) {
          window.ReactNativeWebView.postMessage("JS ERROR: " + message);
        };

        function loadKakaoMap() {
          if (typeof kakao === "undefined" || !kakao.maps || !kakao.maps.load) {
            setTimeout(loadKakaoMap, 100);
            return;
          }
          kakao.maps.load(function() {
            var mapContainer = document.getElementById('map');
            var mapOption = {
              center: new kakao.maps.LatLng(${latitude}, ${longitude}),
              level: 3
            };
            var map = new kakao.maps.Map(mapContainer, mapOption);
            var marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(${latitude}, ${longitude})
            });
            marker.setMap(map);

            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(${longitude}, ${latitude}, function(result, status) {
              if (status === kakao.maps.services.Status.OK) {
                const region = result.find(r => r.region_type === 'H');
                window.ReactNativeWebView.postMessage(region.region_1depth_name + " " + region.region_2depth_name);
              }
            });
          });
        }
        loadKakaoMap();
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      ref={webviewRef}
      originWhitelist={['*']}
      source={{html}}
      onMessage={event => {
        console.log('Received from map:', event.nativeEvent.data);
      }}
      onError={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
      onHttpError={syntheticEvent => {
        const {nativeEvent} = syntheticEvent;
        console.warn('WebView HTTP error: ', nativeEvent);
      }}
      javaScriptEnabled={true}
      style={{flex: 1}}
    />
  );
};

export default KakaoMapView;
