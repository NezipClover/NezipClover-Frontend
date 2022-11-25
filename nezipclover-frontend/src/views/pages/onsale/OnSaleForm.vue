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
        <v-autocomplete
          v-model="model"
          v-model:search="search"
          :items="items"
          :loading="isLoading"
          hide-selected
          item-title="aptName"
          item-value="dongName"
          label="건물 명"
          placeholder="건물 명을 검색해주세요"
          return-object
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                검색 결과가 없을 경우
                <router-link to="house/regist">이곳</router-link>
                을 눌러 건물을 등록해주세요
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>

        <v-divider></v-divider>

        <v-expand-transition>
          <div v-if="model">
            <v-list color="red-lighten-3">
              <v-list-item
                v-for="(field, i) in fields"
                :key="i"
              >
                <v-list-item-header>
                  <v-list-item-title>{{ field.value }}</v-list-item-title>

                  <v-list-item-subtitle>{{ field.key }}</v-list-item-subtitle>
                </v-list-item-header>
              </v-list-item>
            </v-list>
          </div>
        </v-expand-transition>

        <v-divider v-if="model"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :disabled="!model"
            variant="outlined"
            @click="model = null"
          >
            Clear

            <v-icon end> mdi-close-circle </v-icon>
          </v-btn>
        </v-card-actions>
      </VCol>

      <VCol cols="12">
        <VTextField
          ref="r1"
          v-model="onsale.area"
          label="면적"
          type="text"
          placeholder="면적"
        />
      </VCol>
      <VCol cols="12">
        <VTextField
          ref="r2"
          v-model="onsale.floor"
          label="층"
          type="text"
          placeholder="층"
        />
      </VCol>

      <VCol cols="12">
        <v-select
          v-model="select"
          :items="this.dealtypes"
          item-title="type"
          item-value="val"
          label="거래 구분"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </VCol>

      <VCol
        cols="12"
        v-if="this.select.val == 3"
      >
        <VTextField
          ref="r3"
          v-model="onsale.rentMoney"
          label="월세"
          type="text"
          placeholder="월세"
        />
      </VCol>
      <VCol
        cols="12"
        v-else
      >
        <VTextField
          ref="r3"
          v-model="onsale.dealAmount"
          label="전세/매매금액"
          type="text"
          placeholder="전세/매매금액"
        />
      </VCol>
      <VCol cols="12">
        <VTextField
          ref="r4"
          v-model="onsale.dealer_email"
          label="중개사 이메일"
          type="email"
          placeholder="중개사 이메일"
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
          @click="resetAll"
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
    select: { type: '거래구분', val: '0' },
    dealtypes: [
      { type: '매매', val: '1' },
      { type: '전세', val: '2' },
      { type: '월세', val: '3' },
    ],
    onsale: {
      aptCode: '',
      area: '',
      floor: '',
      type: '',
      dealAmount: '',
      rentMoney: '',
      dealer_email: '',
    },
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),
  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },
    items() {
      return this.entries.map(entry => {
        const Description =
          entry.dongName.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

        return Object.assign({}, entry, { Description })
      })
    },
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      axios
        .get('http://localhost:8080/house/list')
        .then(res => {
          console.log(res)
          const { data } = res
          this.entries = data.slice(0, 100)
          this.count = 100
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
  },
  methods: {
    resetAll() {
      this.$refs.r1.reset()
      this.$refs.r2.reset()
      this.$refs.r3.reset()
      this.$refs.r4.reset()
    },
    moveHandler() {
      console.log('moveHandler...........')
      this.$router.push({ name: 'onsale' })
    },
    async checkHandler() {
      // console.log('checkHandler..........');
      // console.log('거래구분')
      // console.log(this.select)
      // console.log('onsale')
      // console.log(this.onsale)
      // console.log('model')
      // console.log(this.model)
      // console.log('search')
      // console.log(this.search)
      this.onsale.aptCode = this.model.aptCode
      this.onsale.type = this.select.val

      let err = true
      let msg = ''
      !this.onsale.aptCode && ((msg = '건물을 선택해주세요'), (err = false), this.$refs.title.focus())
      err && !this.onsale.area && ((msg = '면적을 입력해주세요'), (err = false), this.$refs.author.focus())
      err && !this.onsale.floor && ((msg = '층을 입력해주세요'), (err = false), this.$refs.content.focus())
      err && this.onsale.type == '0' && ((msg = '거래구분을 선택해주세요'), (err = false), this.$refs.content.focus())
      err &&
        !this.onsale.dealAmount &&
        !this.onsale.rentMoney &&
        ((msg = '거래금액을 입력해주세요'), (err = false), this.$refs.content.focus())
      err &&
        !this.onsale.dealer_email &&
        ((msg = '중개사 이메일을 입력해주세요'), (err = false), this.$refs.content.focus())
      if (!err) alert(msg)
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else {
        // try {
        //   const dongCode= await axios.get(`http://localhost:8080/house/getdongname?dongname=${this.house.dongName}`)
        //   const aptCode = await axios.get(`http://localhost:8080/house/getaptcode`)
        //   console.log(dongCode)
        //   console.log(aptCode)
        //   this.house.aptCode= aptCode.data
        //   this.house.dongCode= dongCode.data.dongCode
        //   this.house.dongName=dongCode.data.dongName
        //   console.log(this.house)
        //   this.createHandler();
        // } catch (error) {
        //  console.log("Error >>",error);
        // }
        this.createHandler()
      }
    },
    createHandler() {
      console.log('createHandler........')
      console.log(this.onsale)
      const url = 'http://localhost:8080/onsale/regist'
      axios.post(url, this.onsale).then(({ data }) => {
        console.log(data)
        let msg = '등록 처리시 문제가 발생했습니다.'
        if (data === 'success') msg = '매물 등록이 완료되었습니다.'
        alert(msg)
        this.moveHandler()
      })
    },
  },
}
</script>
