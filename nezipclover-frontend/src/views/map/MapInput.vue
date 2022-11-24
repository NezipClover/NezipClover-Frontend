


<template>
 
    <VCard style="position: absolute; width : 30% ; margin-top : 80px; z-index: 2; margin-left : 10px"
  color="white"
  elevation="3"
  height="150"
  
  
>
<VCardItem>
          <VCardTitle ><h4 class="bg-primary">원하는 지역을 선택하고 매물 정보를 확인하세요!</h4></VCardTitle>
        </VCardItem>
    <v-row class="text-center"
    style="padding-top : 20px; padding-left : 20px; padding-right : 20px;">
      <v-col class="sm-3">
      <v-select v-model="sidoCode" :items="this.sidos" item-title="text" item-value="value" label="시/도"  @update:modelValue="gugunList" ></v-select>
    </v-col>
    <v-col class="sm-3">
      <v-select v-model="gugunCode" :items="this.guguns" item-title="text" label ="구/군" @update:modelValue="dongList"></v-select>
    </v-col>
    <v-col class="sm-3">
      <v-select v-model="dongCode" :items="this.dongs" item-title="text" label ="동" @update:modelValue="searchApt"></v-select>
    </v-col>

    </v-row>
</VCard>

    
    <!--시도 구군 검색 부분-->

    <!-- <b-container id="search-result" class="p-1" v-show="resultVisible">
      <b-list-group>
        <b-list-group-item v-if="resultSearch == ''">
          <b-row class="px-2 pb-1" align-h="center"
            ><b-icon-emoji-expressionless></b-icon-emoji-expressionless
          ></b-row>
          <b-row class="px-2" style="font-size:12px" align-h="center">
            검색 결과가 없습니다.
          </b-row>
        </b-list-group-item>
        <b-list-group-item
          v-show="resultSearch"
          v-for="(item, index) in resultSearch.data"
          :key="index"
          button
          @click="resultClick(item)"
        >
          <b-row class="px-2">{{ item.place_name }}</b-row>
          <b-row class="px-2" style="color:grey; font-size:12px">{{
            item.address_name
          }}</b-row>
        </b-list-group-item>
      </b-list-group>
    </b-container> -->
  <!-- </b-container> -->
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  
   
  name: "HouseSearchBar",
  props: {
    resultSearch: Object,
    resultVisible: Boolean,
  },
  data() {
    return {
      overlay: false,
      query: '',
      rangeDeal: 20,
      rangeInfra: 0,
      sidoCode:null,
      gugunCode:null,
      dongCode:null,
    };
  },
   computed: {
    ...mapState('houseStore', ["sidos", "guguns","dongs", "houses"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    // $store.CLEAR_SIDO_LIST();
    // this.$store.CLEAR_APT_LIST();
    this.$store.commit('houseStore/CLEAR_SIDO_LIST')
    this.$store.commit('houseStore/CLEAR_APT_LIST')
    // this.$store.getSido();
    this.$store.dispatch("houseStore/getSido")
  },
  // watch: {
  //   rangeDeal: function() {
  //     this.modifyFilter(this.rangeDeal, this.rangeInfra);
  //   },
  //   rangeInfra: function() {
  //     this.modifyFilter(this.rangeDeal, this.rangeInfra);
  //   },
  // },
  methods: {
    ...mapActions('houseStore', ["getSido", "getGugun","getDong", "getHouseList"]),
    ...mapMutations('houseStore', ["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST","CLEAR_DONG_LIST", "CLEAR_APT_LIST"]),
    gugunList() {
      console.log("hi")
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList(){
      this.CLEAR_DONG_LIST();
      this.dongCode=null;
      if(this.gugunCode) this.getDong(this.gugunCode);
    },
    searchApt() {
      if (this.dongCode) this.getHouseList(this.dongCode);
    },
    searchQuery() {
      
      if (this.query == '') {
        this.resultSearch = '';
      }
      this.$emit('result-visible', true);
      this.$emit('search-query', this.query);
    },
    resultClick(position) {
      console.log('click!!!');
      this.query = position.place_name;
      this.$emit('result-click', {
        lat: position.y,
        lng: position.x,
      });
    },
    searchEnter() {
      if (this.resultSearch == '') return;
      this.$emit('result-click', {
        lat: this.resultSearch.data[0].y,
        lng: this.resultSearch.data[0].x,
      });
    },
    inputFocus() {
      this.$emit('result-visible', true);
      this.query = '';
    },
    inputBlur() {
      this.$emit('result-visible', false);
    },
    
    
    main() {
      window.location.href = '/';
    },
  },
};
</script>

<style scoped>
#search-box {
  z-index: 1000;
  max-width: 370px;
  background: white;
}
#search-result {
  max-height: 300px;
  overflow: auto;
}
.mouseover-cursor {
  cursor: pointer;
}
</style>
