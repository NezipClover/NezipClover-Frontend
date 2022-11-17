<template>
  <div>
    <table class="table table-bordered">
      <tr>
        <th>질문 번호</th>
        <td v-text="question.id"></td>
      </tr>
      <tr>
        <th>제목</th>
        <td>
          <input type="text" id="title" ref="title" v-model="question.title" />
        </td>
      </tr>
      <tr>
        <th>글쓴이</th>
        <td>
          <input type="text" id="author" ref="author" v-model="question.author" />
        </td>
      </tr>
      <tr>
        <th colspan="2">질문 내용</th>
      </tr>
      <tr>
        <td colspan="2">
          <textarea id="content" cols="46" rows="10" ref="content" v-model="question.content"></textarea>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <b-button varient="primary" @click="checkHandler">수정</b-button>
            <router-link :to="{ name: 'QnaListView' }">
              <b-button varient="primary">목록</b-button>
            </router-link>
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
      question: {
        id: '',
        title: '',
        content: '',
        author: '',
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    console.log('id........', this.id);
    http.get(`question/search/${this.id}`).then(({ data }) => {
      this.question = data;
      console.log('question..............', this.question);
    });
  },
  methods: {
    moveHandler() {
      console.log('moveHandler...........');
      this.$router.push({ path: 'search', name: 'QnaDetailView', query: { id: this.question.id } });
      // this.$router.push({ name: `QuestionListView` });
    },
    checkHandler() {
      console.log('checkHandler..........');
      let err = true;
      let msg = '';
      !this.question.title && ((msg = '제목을 입력해주세요'), (err = false), this.$refs.isbn.focus());
      err && !this.question.author && ((msg = '글쓴이를 입력해주세요'), (err = false), this.$refs.title.focus());
      err && !this.question.content && ((msg = '질문을 입력해주세요'), (err = false), this.$refs.author.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.updateHandler();
    },
    updateHandler() {
      console.log('updateHandler........');
      http.put('question/update', this.question).then(({ data }) => {
        console.log('data....', data);
        console.log('book....', this.question);
        let msg = '수정 처리시 문제가 발생했습니다.';
        if (data === 'success') msg = '질문 수정이 완료되었습니다.';
        alert(msg);
        this.moveHandler();
      });
    },
  },
};
</script>

<style></style>
