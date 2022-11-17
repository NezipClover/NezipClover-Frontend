<template>
  <div>
    <div>
      <b-button variant="primary" @click="moveHandler">목록</b-button>
      <router-link :to="{ name: 'QuestionModifyView', query: { id: question.id } }">
        <b-button variant="primary">수정</b-button>
      </router-link>
      <b-button variant="primary" @click="removeHandler">삭제</b-button>
    </div>
    <b-table-simple hover small caption-top responsive>
      <tr>
        <b-th variant="primary">question 번호</b-th>
        <b-td v-text="question.id"></b-td>
      </tr>
      <tr>
        <b-th variant="primary">제목</b-th>
        <td v-text="question.title"></td>
      </tr>
      <tr>
        <b-th variant="primary">작성자</b-th>
        <td v-text="question.author"></td>
      </tr>
      <tr>
        <b-th>질문 내용</b-th>
      </tr>
      <tr>
        <th colspan="2"><pre v-text="question.content"></pre></th>
      </tr>
    </b-table-simple>
    <!-- <div v-if="answers.length > 0"> -->
    <!-- <b-table hover striped    :items="answers"    :fields="answerFields"></b-table> -->
    <!-- </div> -->
    <table class="table table-boardered">
      <tr>
        <td colspan="2">답변 작성</td>
      </tr>
      <tr>
        <td>작성자</td>
        <!--ref:  Vue에서 form에 접근하기 위한 식별자    [사용방법] this.$refs.식별자 -->
        <td colspan="2"><input type="text" id="id" ref="id" v-model="answerFields.author" /></td>
      </tr>
      <tr>
        <td>제목</td>
        <td colspan="2">
          <input type="text" id="title" ref="title" v-model="answerFields.title" size="90%" />
        </td>
      </tr>

      <tr>
        <td>답변</td>
        <td>
          <textarea id="content" cols="90" rows="5" ref="content" v-model="answerFields.content"></textarea>
        </td>
        <td>
          <div>
          <b-button variant="primary" @click="checkHandler">등록</b-button>
          </div>
        </td>
      </tr>
    </table>
    <div>
      <div v-if="answers.length > 0">
        <div v-for="item in answers" v-bind:key="item.id">
          <b-card :title="item.title" :sub-title="item.author">
            <b-card-text>
              {{ item.content }}
            </b-card-text>
          <b-button variant="primary" class="card-link" @click="answerRemoveHandler(item.id)">삭제</b-button>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/api/http';

export default {
  data() {
    return {
      id: '',
      question: {},
      answers: {},
      answerFields: {
        author: '',
        content: '',
        title: '',
        questionId: '',
      },
    };
  },
  created() {
    //DOM객체와 연결되었고 Vue의 속성들도 초기화 된 상태
    this.id = this.$route.query.id;

    console.log('view.html..................isbn]', this.id);
    http
      .get(`question/search/${this.id}`)
      .then(({ data }) => {
        this.question = data;
      })
      .catch(({ data }) => {
        alert(data);
      });
    console.log('answer loading...');
    console.log(this.id);
    http
      .get(`answer/list/${this.id}`)
      .then(({ data }) => {
        this.answers = data;
      })
      .catch(({ data }) => {
        alert(data);
      });
  },
  methods: {
    moveHandler() {
      this.$router.push({ name: 'QnaListView' });
    },
    goDetail() {
      this.$router.go(this.$router.currentRoute);
    },
    removeHandler() {
      console.log('view.html..................삭제]', this.id);
      http
        .delete(`question/delete/${this.id}`)
        .then(({ data }) => {
          if (data == 'success') {
            alert('삭제 성공');
            this.moveHandler();
          }
        })
        .catch(({ data }) => {
          alert(data);
        });
    },
    checkHandler() {
      console.log('checkHandler..........');
      let err = true;
      let msg = '';
      !this.answerFields.title && ((msg = '제목 입력해주세요'), (err = false), this.$refs.title.focus());
      err && !this.answerFields.author && ((msg = '이름을 입력해주세요'), (err = false), this.$refs.author.focus());
      err && !this.answerFields.content && ((msg = '내용을 입력해주세요'), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      else this.createHandler();
    },
    createHandler() {
      console.log('createHandler........');
      this.answerFields.questionId = this.id;
      http.post('answer/regist', this.answerFields).then(({ data }) => {
        console.log(data);
        let msg = '등록 처리시 문제가 발생했습니다.';
        if (data === 'success') msg = '답변이 등록이 완료되었습니다.';
        alert(msg);
        this.goDetail();
      });
    },
    answerRemoveHandler(answerIdx) {
      console.log("view.html..................answer 삭제", answerIdx);
      http.delete(`answer/delete/${answerIdx}`)
          .then(({data})=>{
            if(data=='success'){
              alert('삭제 성공')
              this.goDetail();
            }
          }).catch(({data})=>{
            alert(data);
          })
    },
  },
};
</script>

<style></style>
