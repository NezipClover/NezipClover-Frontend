<template>
  <div>
    <map-input></map-input>
    <map-info
     :selectedInfo="selectedInfo"
     v-if="isInfo"></map-info>
    <div id="map" class="map"></div>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
import MapInput from '@/views/map/MapInput.vue';
import MapInfo from '@/views/map/MapInfo.vue';

const MAP_APP_KEY = import.meta.env.VITE_MAP_APP_KEY;


export default {
  components: { MapInput, MapInfo },
 
  data() {
    return {
      map: null,
      markers: [],
      ps: null,
      isInfo: false,
      resultVisible: false,
      selectedInfo: {},
      resultSearch: [],
      
    };
  },
 
  mounted() {
    
    window.kakao && window.kakao.maps ? this.initMap() : this.addMapScript();
  },
  computed: {
    ...mapGetters('houseStore',['getHouses']),
  },

  watch: {
    getHouses: function(val){
      this.updateMap(val);
    }
  },

  methods: {
    

    addMapScript() {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=' +
        MAP_APP_KEY +
        '&libraries=services';
      document.head.appendChild(script);
    },

    initMap() {
      var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.5665734, 126.978179), //지도의 중심좌표.
        level: 4, //지도의 레벨(확대, 축소 정도)
        maxLevel: 7,
      };

      this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체

      var mapTypeControl = new kakao.maps.MapTypeControl();
      this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, 'tilesloaded', this.moveMap);
      kakao.maps.event.addListener(this.map, 'click', this.clickMap);
      this.ps = new kakao.maps.services.Places();
    },

    searchQuery(query) {
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      this.ps.keywordSearch(query, this.placesSearchCB);
    },

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // mapinput에 보내기
        this.resultSearch = {
          data,
          pagination,
        };
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        this.resultSearch = '';
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    },

    moveMap() {
      // 지도 영역정보를 얻어옵니다
      var bounds = this.map.getBounds();
      // 영역정보의 남서쪽 정보를 얻어옵니다
      var swLatlng = bounds.getSouthWest();
      // 영역정보의 북동쪽 정보를 얻어옵니다
      var neLatlng = bounds.getNorthEast();

      
    },

    moveMapToPosition(position) {
      this.resultVisible = false;
      this.map.panTo(new kakao.maps.LatLng(position.lat, position.lng));
      this.moveMap();
    },

    updateMap(houses) {
      this.clearMarkers(null);
      // this.clusterer.clear();
      var level = this.map.getLevel();
      console.log('현재 지도의 레벨 : ' + this.map.getLevel());


      for (let i = 0; i < houses.length; i++) {
        const position = new kakao.maps.LatLng(
          houses[i].lat,
          houses[i].lng
        );
        this.addMarker(this.map, position, houses[i]);
        this.map.setCenter(position)
      }
    },

    // 마커를 생성하고 지도위에 표시하는 함수입니다
    addMarker(map, position, data) {
      console.log("마커 생성~~~~~")
      
      var MARKER_SRC = 
        'https://cdn-icons-png.flaticon.com/512/1552/1552146.png';
      var imageSize = new kakao.maps.Size(42, 42);
      var imageOption = { offset: new kakao.maps.Point(27, 69) };

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        MARKER_SRC,
        imageSize,
        imageOption
      );

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);
      
      // 생성된 마커를 배열에 추가합니다
      this.markers.push(marker);

      var open = this.openSidebar;
      var select = this.selectInfo;
      kakao.maps.event.addListener(marker, 'click', function() {
        select(data);
        open();
      });
    },

    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    setMarkers(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
        
      }
    },

    clearMarkers() {
      this.setMarkers(null);
      this.markers = [];
    },

    openSidebar() {
      this.isInfo = true;
    },

    selectInfo(data) {
      this.selectedInfo = data;
    },

    clickMap() {
      this.isSidebarOpen = false;
      this.resultVisible = false;
    },

    changeResultVisible(bool) {
      this.resultVisible = bool;
    },

    modifyFilter(filter) {
      this.rangeDeal = filter.deal;
      this.rangeInfra = filter.infra;
      this.moveMap();
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  min-height: 100vh;
}
</style>
