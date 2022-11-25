<script setup>
const navigationTab = ref('현재 매물 정보')
const navigationTab2 = ref('이전 거래 내역')
const tabItems = ['현재 매물 정보', '이전 거래 내역']
</script>
<template>
  <VCard
    style="position: absolute; width: 30%; margin-top: 50px; z-index: 3; margin-left: 50%"
    color="white"
    elevation="3"
  >
    <VTabs v-model="navigationTab">
      <VTab
        v-for="item in tabItems"
        :key="item"
        :value="item"
      >
        {{ item }}
      </VTab>
    </VTabs>

    <VDivider />
    <VCardItem>
      <VCardTitle>
        <v-img
          height="150"
          class="bg-grey-400"
          src="https://thumb.mt.co.kr/06/2022/07/2022071323233486792_1.jpg/dims/optimize/"
        >
        </v-img>
      </VCardTitle>
      <br />
      <VTable>
        <tr>
          <td class="text-center">
            <h5>건물 일련번호</h5>
          </td>
          <td class="text-center">
            {{ this.selectedInfo.aptCode }}
          </td>
        </tr>
        <tr>
          <td class="text-center bg-grey-200">
            <h5 class="text-green-lighten-1">건물 명</h5>
          </td>
          <td class="text-center">
            {{ this.selectedInfo.aptName }}
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <h5 class="text-green-lighten-1">건축 년도</h5>
          </td>
          <td class="text-center">
            {{ this.selectedInfo.buildYear }}
          </td>
        </tr>
        <tr>
          <td class="text-center bg-grey-200">
            <h5 class="text-green-lighten-1">동</h5>
          </td>
          <td class="text-center">
            {{ this.selectedInfo.dongName }}
          </td>
        </tr>
        <tr>
          <td class="text-center">
            <h5 class="text-green-lighten-1">지번</h5>
          </td>
          <td class="text-center">
            {{ this.selectedInfo.jibun }}
          </td>
        </tr>
      </VTable>
    </VCardItem>

    <!-- tabs content -->
    <VWindow v-model="navigationTab">
      <VWindowItem
        v-for="item in tabItems"
        :key="item"
        :value="item"
      >
        <VCardItem v-if="this.tabContent == '현재 매물 정보'">
          <VTable
            height="300"
            v-if="!this.onsaleInfo.length == 0"
          >
            <thead class="bg-primary">
              <tr>
                <th class="text-uppercase">거래 번호</th>
                <th class="text-center text-uppercase">매매 종류</th>
                <th class="text-center text-uppercase">거래 금액</th>
                <th class="text-center text-uppercase">면적</th>
                <th class="text-center text-uppercase">층수</th>
                <th class="text-center text-uppercase">중개사 이메일</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in onsaleInfo"
                :key="item.no"
              >
                <td>{{ item.no }}</td>
                <td
                  class="text-center"
                  v-if="item.type == 1"
                >
                  매매
                </td>
                <td
                  class="text-center"
                  v-else-if="item.type == 2"
                >
                  전세
                </td>
                <td
                  class="text-center"
                  v-else-if="item.type == 3"
                >
                  월세
                </td>
                <td
                  class="text-center"
                  v-if="item.type == 3"
                >
                  {{ item.rentMoney }}
                </td>
                <td
                  class="text-center"
                  v-else
                >
                  {{ item.dealAmount }}
                </td>
                <td class="text-center">
                  {{ item.area }}
                </td>
                <td class="text-center">
                  {{ item.floor }}
                </td>
                <td class="text-center">
                  {{ item.dealer_email }}
                </td>
              </tr>
            </tbody>
          </VTable>
          <VTable v-else>
            <tr>
              <td>현재 거래 가능한 매물이 없습니다.</td>
            </tr>
          </VTable>
        </VCardItem>
        <VCardItem v-else-if="this.tabContent == '이전 거래 내역'">
          <VTable height="300">
            <thead class="bg-primary">
              <tr>
                <th class="text-uppercase">거래 번호</th>
                <th class="text-center text-uppercase">매매 종류</th>
                <th class="text-center text-uppercase">거래 금액</th>
                <th class="text-center text-uppercase">면적</th>
                <th class="text-center text-uppercase">층수</th>
                <th class="text-center text-uppercase">거래일자</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in dealInfo"
                :key="item.no"
              >
                <td>{{ item.no }}</td>
                <td
                  class="text-center"
                  v-if="item.type == 1"
                >
                  매매
                </td>
                <td
                  class="text-center"
                  v-else-if="item.type == 2"
                >
                  전세
                </td>
                <td
                  class="text-center"
                  v-else-if="item.type == 3"
                >
                  월세
                </td>
                <td
                  class="text-center"
                  v-if="item.type == 3"
                >
                  {{ item.rentMoney }}
                </td>
                <td
                  class="text-center"
                  v-else
                >
                  {{ item.dealAmount }}
                </td>
                <td class="text-center">
                  {{ item.area }}
                </td>
                <td class="text-center">
                  {{ item.floor }}
                </td>
                <td class="text-center">{{ item.dealYear }}. {{ item.dealMonth }}. {{ item.dealDay }}</td>
              </tr>
            </tbody>
          </VTable>
        </VCardItem>
      </VWindowItem>
    </VWindow>
  </VCard>
</template>
<script>
import { default as axios } from 'axios'
export default {
  props: {
    selectedInfo: Object,
  },
  data() {
    return {
      scrollInvoked: 0,
      onsaleInfo: [],
      dealInfo: [],
      tabContent: '현재 매물 정보',
    }
  },
  methods: {
    onScroll() {
      this.scrollInvoked++
    },
    async getInfos(val) {
      console.log('get Info 실행')
      console.log(val)
      const onsaleResult = await axios.get(`http://localhost:8080/onsale/search?key=aptCode&word=${val}`)
      const dealResult = await axios.get(`http://localhost:8080/house/dealsearch?aptcode=${val}`)
      this.onsaleInfo = onsaleResult.data
      this.dealInfo = dealResult.data
      console.log(this.onsaleInfo)
      console.log(this.dealInfo)
    },
  },
  created() {
    console.log(this.selectedInfo)
    this.getInfos(this.selectedInfo.aptCode)
  },
  watch: {
    selectedInfo: function (val) {
      console.log(this.onsaleInfo)
      this.getInfos(val.aptCode)
    },
    navigationTab: function (val) {
      console.log(val)
      if (val == '현재 매물 정보') this.tabContent = '현재 매물 정보'
      else if (val == '이전 거래 내역') this.tabContent = '이전 거래 내역'
    },
  },
}
</script>
