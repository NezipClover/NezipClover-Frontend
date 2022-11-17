<template>
  <div>
    <table class="table table-boardered">
      <tr>
        <td>책 번호</td>
        <!--ref:  Vue에서 form에 접근하기 위한 식별자    [사용방법] this.$refs.식별자 -->
        <td><input type="text" id="isbn" ref="isbn" v-model="book.isbn" /></td>
      </tr>
      <tr>
        <td>제목</td>
        <td>
          <input type="text" id="title" ref="title" v-model="book.title" />
        </td>
      </tr>
      <tr>
        <td>저자</td>
        <td>
          <input type="text" id="author" ref="author" v-model="book.author" />
        </td>
      </tr>
      <tr>
        <td>가격</td>
        <td>
          <input type="text" id="price" ref="price" v-model="book.price" />
        </td>
      </tr>
      <tr>
        <td colspan="2">책 정보</td>
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
        <td colspan="2">
          <div class="text-center">
            <b-button variant="primary" @click="checkHandler">등록</b-button>
            <b-button variant="primary" @click="moveHandler">목록</b-button>
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
      book: {
        isbn: "",
        title: "",
        author: "",
        price: "",
        describ: "",
      },
    };
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
      else this.createHandler();
    },
    createHandler() {
      console.log("createHandler........");
      http.post("/book", this.book).then(({ data }) => {
        console.log(data);
        let msg = "등록 처리시 문제가 발생했습니다.";
        if (data === "success") msg = "책등록이 완료되었습니다.";
        alert(msg);
        this.moveHandler();
      });
    },
  },
};
</script>

<style></style>
