<template>
  <div>
    <table class="table table-boardered">
      <tr>
        <td>작성자</td>
        <!--ref:  Vue에서 form에 접근하기 위한 식별자    [사용방법] this.$refs.식별자 -->
        <td><input type="text" id="id" ref="id" v-model="qna.author" /></td>
      </tr>
      <tr>
        <td>제목</td>
        <td>
          <input type="text" id="title" ref="title" v-model="qna.title" />
        </td>
      </tr>
      <tr>
        <td colspan="2">질문</td>
      </tr>
      <tr>
        <td colspan="2">
          <textarea id="content" cols="46" rows="10" ref="content" v-model="qna.content"></textarea>
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
import http from '@/api/http';

export default {
  data() {
    return {
      qna: {
        title: '',
        author: '',
        content: '',
      },
    };
  },
  methods: {
    moveHandler() {
      console.log('moveHandler...........');
      this.$router.push({ name: 'question' });
    },
    checkHandler() {
      console.log('checkHandler..........');
      let err = true;
      let msg = '';
      !this.qna.title && ((msg = '제목 입력해주세요'), (err = false), this.$refs.title.focus());
      err && !this.qna.author && ((msg = '이름을 입력해주세요'), (err = false), this.$refs.author.focus());
      err && !this.qna.content && ((msg = '내용을 입력해주세요'), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.createHandler();
    },
    createHandler() {
      console.log('createHandler........');
      http.post('question/regist', this.qna).then(({ data }) => {
        console.log(data);
        let msg = '등록 처리시 문제가 발생했습니다.';
        if (data === 'success') msg = '질문 등록이 완료되었습니다.';
        alert(msg);
        this.moveHandler();
      });
    },
  },
};
</script>

<style></style>
