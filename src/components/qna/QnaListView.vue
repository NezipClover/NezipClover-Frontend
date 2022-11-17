<template>
  <div>
    <div class="nav">
      <div class="nav-item">
        <router-link class="nav-link" :to="{ name: 'QnaListView' }">QnA목록</router-link>
      </div>
      <div class="nav-item">
        <router-link class="nav-link" :to="{ name: 'QnaRegistView' }">QnA 질문 등록</router-link>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-2"></div>

        <div class="col-2">
          <b-form-select v-model="key" :options="keys"> </b-form-select>
        </div>
        <div class="col-4">
          <b-form-input v-model="word" />
        </div>
        <div class="col-2">
          <b-button variant="primary" @click="searchQuestion">검색</b-button>
        </div>
        <div class="col-2"></div>
      </div>
      <div v-if="questions.length > 0">
        <b-table hover striped :items="questions" :fields="fields" @row-clicked="goDetail"></b-table>
      </div>
      <div v-else>등록된 책 목록이 없습니다.</div>
    </div>
  </div>
</template>

<script>
import http from '@/api/http';

export default {
  data() {
    return {
      questions: [],
      word: '',
      keys: [
        { value: 'all', text: '--선택하세요--' },
        { value: 'title', text: '제목' },
        { value: 'content', text: '내용' },
        { value: 'author', text: '글쓴이' },
      ], //select option에 표시할 데이타
      fields: [
        { key: 'id', label: 'id' },
        { key: 'title', label: '제목' },
        { key: 'content', label: '내용' },
        { key: 'author', label: '글쓴이' },
      ], //table의 header에 표시되는 데이타 mapping
      key: 'all',
    };
  },
  created() {
    this.searchQuestion();
  },
  methods: {
    searchQuestion() {
      console.log('key.......', this.key);
      const url = `question/list?key=${this.key}&pageNo=1&word=${this.word}`;
      http.get(url).then(({ data }) => {
        console.log('응답 데이타', data);
        this.questions = data;
      });
    },
    goDetail(item) {
      //table에서 클릭된 row의 데이타가 인자로 전달됨.
      this.$router.push({ path: 'search', name: 'QnaDetailView', query: { id: item.id } });
    },
  },
};
</script>

<style></style>
