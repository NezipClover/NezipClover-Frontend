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
          dense
          filled
          solo
          v-model="word"
          label="건물 명"
          placeholder="건물 명"
        />
        <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            <router-link to = "onsale">검색이 되지 않습니다 건물을 먼저 등록해주세요</router-link>
            
          </v-list-item-title>
        </v-list-item>
      </template>
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="email"
          label="Email"
          type="email"
          placeholder="Email"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="mobile"
          label="Mobile"
          type="number"
          placeholder="Number"
        />
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="password"
          label="Password"
          type="password"
          placeholder="password"
        />
      </VCol>

     

      <VCol
        cols="12"
        class="d-flex gap-4 "
      >
        <VBtn type="submit">
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
import { default as axios } from 'axios';

export default {
    data() {
        return {
            houses:[],
            filteredHouse:[],
            word:"",
        };
    },
    created(){
        const url =`http://localhost:8080/house/list`;
        axios.get(url)
          .then(({data})=>{
            console.log("data....")
            console.log('응답 데이타', data)
            this.houses = data;
          })
    },
    methods: {
    searchHouse(){
      console.log('word.......', this.word)
      const autocomplete = document.querySelector(".autocomplete");
      if (this.word !='') {
        autocomplete.classList.remove("disabled");
        this.filteredHouse = this.houses.filter((house) => {
          return house.aptName.match(this.word);
        });
      } else {
        this.filteredHouse=[];
        autocomplete.classList.add("disabled");
      }
      console.log(this.filteredHouse)
      
    },
  }
}
</script>

