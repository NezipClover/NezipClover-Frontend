import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    searches: [],
    question: {},
    answers:[],
  },
  getters: {
    questions(state) {
      return state.questions;
    },
    question(state) {
      return state.question;
    },
    searches(state) {
      return state.searches;
    },
    answers(state) {
      return state.answers;
    }
  },
  mutations: {
    setQuestions(state, payload) {
      console.log('[mutations].........................................................Questions : ', payload);
      state.questions = payload;
    },
    setQuestion(state, payload) {
      console.log('[mutations].........................................................Question : ', payload);
      state.question = payload;
    },
    setSearches(state, payload) {
      console.log('[mutations].........................................................Searches : ', payload);
      state.searches = payload;
    },
    setAnswers(state, payload) {
      console.log('[mutations].........................................................answers : ', payload);
      state.answers = payload;
    },
  },
  actions: {
    getQuestions({ commit }) {
      console.log('[actions].........................................................getQuestions ');
      //url 맞는지?
      http.get("question/list")
        .then(({ data }) => {
          console.log('[actions].........................................................getQuestions : ', data)
          commit("setQuestions", data);
          //예제는 list를 받아와서 searches도 바꿔줌 
          commit("setSearches", data);

        })
        .catch(({ response }) => {
          alert(response.data);
        });
    },
    getSearches({ commit },payload) {
      console.log('[actions].........................................................getSearches 조회 조건 : ', payload);
      //id로 질문 검색 url 맞는지???
      //예제는 admin/book으로 가서 book?key=${payload.key}&word=${payload.word} 같이 사용
      //question에서 받고 그다음 경로가 필요해서 다음과 같이 설정
      http.get(`question/list?key=${payload.key}&word=${payload.word}`)
        .then(({ data }) => {
          console.log('[actions].........................................................getSearches : ', data)
          commit("setSearches", data);

        })
        .catch(({ response }) => {
          alert(response.data);
        });
    },
    getQuestion({ commit },payload) {
      console.log('[actions].........................................................getQuestion id : ',payload.id);
      http.get(`question/search/${payload.id}`)
        .then(({ data }) => {
          console.log('[actions].........................................................getQuestion : ', data)
          commit("setQuestion", data);

        })
        .catch(({ response }) => {
          alert(response.data);
        });
    },
    getAnswers({ commit },payload) {
      console.log('[actions].........................................................getAnswers Questionid : ',payload.questionId);
      http.get(`answer/list/${payload.questionId}`)
        .then(({ data }) => {
          console.log('[actions].........................................................getAnswers : ', data)
          commit("setAnswers", data);

        })
        .catch(({ response }) => {
          alert(response.data);
        });
    },
  },
  modules: {},
});
