<template>
  <div>
    <b-table-simple hover small caption-top responsive>

      <tr>
        <b-th variant="primary">책 번호</b-th>
        <b-td v-text="book.isbn"></b-td>
      </tr>
      <tr>
        <b-th variant="primary">제목</b-th>
        <td v-text="book.title"></td>
      </tr>
      <tr>
        <b-th variant="primary">작성자</b-th>
        <td v-text="book.author"></td>
      </tr>
      <tr>
        <b-th variant="primary">가격</b-th>
        <td v-text="book.price"></td>
      </tr>
      <tr>
        <b-th >책 정보</b-th>
      </tr>
      <tr>
        <th colspan="2"><pre v-text="book.describ"></pre></th>
      </tr>
      <tr>
        <td>
          <div>
          <b-button variant="primary" @click="moveHandler">목록</b-button>
          <router-link
            :to="{ name: 'BookModifyView', query: { isbn: book.isbn } }"
          >
            <b-button variant="primary">수정</b-button>
          </router-link>
          <b-button variant="primary" @click="removeHandler">삭제</b-button>
          </div>
        </td>
      </tr>
    </b-table-simple>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  data() {
    return {
      isbn: "",
      book: {},
    };
  },
  created() {
    //DOM객체와 연결되었고 Vue의 속성들도 초기화 된 상태
    this.isbn = this.$route.query.isbn;
    console.log("view.html..................isbn]", this.isbn);
    http.get(`book/${this.isbn}`)
        .then(({data})=>{
          this.book = data;
        })
        .catch(({data})=>{
          alert(data);
        })
    
  },
  methods: {
    moveHandler() {
      this.$router.push({ name: "BookListView" });
    },
    removeHandler() {
      console.log("view.html..................삭제]", this.isbn);
      http.delete(`book/${this.isbn}`)
          .then(({data})=>{
            if(data=='success'){
              alert('삭제 성공')
               this.moveHandler();
            }
          }).catch(({data})=>{
            alert(data);
          })
    },
  },
};
</script>

<style></style>
