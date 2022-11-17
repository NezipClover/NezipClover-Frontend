<template>
  <div>
    <table class="table table-bordered">
      <tr>
        <th>책 번호</th>
        <td v-text="book.isbn"></td>
      </tr>
      <tr>
        <th>제목</th>
        <td>
          <input type="text" id="title" ref="title" v-model="book.title" />
        </td>
      </tr>
      <tr>
        <th>저자</th>
        <td>
          <input type="text" id="author" ref="author" v-model="book.author" />
        </td>
      </tr>
      <tr>
        <th>가격</th>
        <td>
          <input type="text" id="price" ref="price" v-model="book.price" />
        </td>
      </tr>
      <tr>
        <th colspan="2">책 정보</th>
      </tr>
      <tr>
        <td colspan="2">
          <textarea
            id="describ"
            cols="46"
            rows="10"
            ref="describ"
            v-model="book.describ"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td>
          <div>
          <b-button varient="primary" @click="checkHandler">수정</b-button>
          <router-link :to="{ name: 'BookListView' }">
            <b-button varient="primary">목록</b-button>
          </router-link>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import http from "@/api/http"

export default {
  data() {
    return {
      isbn: "",
      book: {
        isbn: "",
        title: "",
        author: "",
        price: "",
        describ: "",
      },
    };
  },
  created() {
    this.isbn = this.$route.query.isbn;
    console.log("isbn........", this.isbn)
    http.get(`/book/${this.isbn}`).then(({data}) => {
      this.book = data;
      console.log("book..............", this.book);
    })
  },
  methods: {
    moveHandler() {
      console.log("moveHandler...........")
      this.$router.push({ name: "BookListView" });
    },
    checkHandler() {
      console.log("checkHandler..........")
      let err = true;
      let msg = "";
      !this.book.isbn && ((msg = "책 번호를 입력해주세요"), (err = false), this.$refs.isbn.focus());
      err && !this.book.title && ((msg = "제목을 입력해주세요"), (err = false), this.$refs.title.focus());
      err && !this.book.author && ((msg = "저자를 입력해주세요"), (err = false), this.$refs.author.focus());
      err && !this.book.price && ((msg = "가격을 입력해주세요"), (err = false), this.$refs.price.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.updateHandler();
    },
    updateHandler() {
      console.log("updateHandler........");
      http.put("/book", this.book).then(({ data }) => {
        console.log("data....",data);
        console.log("book....", this.book);
        let msg = "수정 처리시 문제가 발생했습니다.";
        if (data === "success") msg = "책수정이 완료되었습니다.";
        alert(msg);
        this.moveHandler();
      });
    },
  },
};
</script>

<style></style>
