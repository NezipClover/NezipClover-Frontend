<script setup>
const firstName = ref('')
const email = ref('')
const mobile = ref()
const password = ref()
const checkbox = ref(false)
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="house.aptName"
          label="건물 명"
          type="text"
          placeholder="건물 명"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="house.dongName"
          label="동 이름"
          type="text"
          placeholder="동 이름"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="house.buildYear"
          label="건축 년도"
          type="text"
          placeholder="건축 년도"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="house.jibun"
          label="지번"
          type="text"
          placeholder="지번"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="house.lat"
          label="위도"
          type="text"
          placeholder="위도"
        />
      </VCol>
      <VCol cols="12">
        <VTextField
          v-model="house.lng"
          label="경도"
          type="text"
          placeholder="경도"
        />
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn
          type="submit"
          @click="checkHandler"
        >
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
<script>
import { default as axios } from 'axios'

export default {
  data: () => ({
    house: {
      aptCode: '',
      aptName: '',
      dongCode: '',
      dongName: '',
      buildYear: '',
      jibun: '',
      lat: '',
      lng: '',
    },
  }),
  methods: {
    moveHandler() {
      console.log('moveHandler...........')
      this.$router.push({ name: 'onsale' })
    },
    async checkHandler() {
      console.log('checkHandler..........')
      let err = true
      let msg = ''
      !this.house.aptName && ((msg = '건물명을 입력해주세요'), (err = false), this.$refs.title.focus())
      err && !this.house.dongName && ((msg = '동 이름을 입력해주세요'), (err = false), this.$refs.author.focus())
      err && !this.house.buildYear && ((msg = '건축년도를 입력해주세요'), (err = false), this.$refs.content.focus())
      err && !this.house.jibun && ((msg = '지번을 입력해주세요'), (err = false), this.$refs.content.focus())
      err && !this.house.lat && ((msg = '위도를 입력해주세요'), (err = false), this.$refs.content.focus())
      err && !this.house.lng && ((msg = '경도를 입력해주세요'), (err = false), this.$refs.content.focus())
      if (!err) alert(msg)
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else {
        try {
          const dongCode = await axios.get(`http://localhost:8080/house/getdongname?dongname=${this.house.dongName}`)
          const aptCode = await axios.get(`http://localhost:8080/house/getaptcode`)
          console.log(dongCode)
          console.log(aptCode)
          this.house.aptCode = aptCode.data
          this.house.dongCode = dongCode.data.dongCode
          this.house.dongName = dongCode.data.dongName
          console.log(this.house)
          this.createHandler()
        } catch (error) {
          console.log('Error >>', error)
        }
      }
    },
    createHandler() {
      console.log('createHandler........')
      console.log(this.house)
      const url = 'http://localhost:8080/house/regist'
      axios.post(url, this.house).then(({ data }) => {
        console.log(data)
        let msg = '등록 처리시 문제가 발생했습니다.'
        if (data === 'success') msg = '건물 등록이 완료되었습니다.'
        alert(msg)
        this.moveHandler()
      })
    },
  },
}
</script>
