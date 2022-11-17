<template>
  <div>
    <div class="row">
      <div class="col-2"></div>

      <div class="col-2">
          <b-form-select v-model='key'  :options='keys'>
          </b-form-select>
      </div>
      <div class="col-4">
        <b-form-input  v-model="word"/>
      </div>
      <div class="col-2">
        <b-button variant="primary"  @click='searchBook'>검색</b-button>
      </div>
      <div class="col-2"></div>
    </div>
    <div v-if="books.length > 0">
      <b-table hover striped    :items="books"    :fields="fields"    @row-clicked="goDetail"></b-table>
    </div>
    <div v-else>등록된 책 목록이 없습니다.</div>
  </div>
</template>

<script>
import http from "@/api/http"

export default {
  data() {
    return { 
      books: [],
      word:"",
      keys:[
        {value: "all", text: "--선택하세요--"},
        {value: "isbn", text: "책번호"},
        {value: "title", text: "제목"},
        {value: "author", text: "저자"},
      ],    //select option에 표시할 데이타
      fields: [
        {key:'isbn', label:'책번호'},
        {key:'title', label:'제목'},
        {key:'author', label:'저자'},
        {key:'price', label:'가격'},
      ],      //table의 header에 표시되는 데이타 mapping
      key:"all",
    };
  },
  created() {
    this.searchBook();
  },
  methods:{
    searchBook(){
      console.log('key.......', this.key)
      const url =`book?key=${this.key}&pageNo=1&word=${this.word}`;
      http.get(url)
          .then(({data})=>{
            console.log("data....")
            console.log('응답 데이타', data)
            this.books = data;
          })
    },
    goDetail(item) {  //table에서 클릭된 row의 데이타가 인자로 전달됨.
      this.$router.push({name:"BookDetailView", query:{isbn:item.isbn}})
    },
  }
};
</script>

<style></style>
