<script setup>

</script>

<template>
  <div>
      <div>
    <v-container>
 

      <v-card style="width: 100%" height="50%">
        <div ref="questionRef">
        <v-toolbar style="background-color:#ace7bc">
          <v-toolbar-title>질문</v-toolbar-title>
          <v-spacer></v-spacer>
          <span v-if="this.userEmail == this.question.author"><v-btn @click="editQuestion">수정</v-btn><v-btn @click="deleteQuestion">삭제</v-btn></span>
        </v-toolbar>
        <v-card-title >{{question.title}}</v-card-title>
        <v-card-subtitle>{{question.author}}</v-card-subtitle>
        <v-card-text>
          {{question.content}}
        </v-card-text>
        </div>
      </v-card>
      <br>
      <br>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <v-divider></v-divider>
      <br>
      <div v-for="answer in this.answers"
          :key="answer.id">
          <v-card style="width: 100%" height="50%">
        <v-toolbar style="background-color:#edd1e3">
          <v-toolbar-title>답변</v-toolbar-title>
          <v-spacer></v-spacer>
          <span v-if="this.userEmail == answer.author"><v-btn @click="editAnswer(answer)">
            <span style="color:#cd2290">수정</span></v-btn>
            <v-btn @click="deleteAnswer(answer)"><span style="color:#cd2290">삭제</span></v-btn></span>

        </v-toolbar>
        <v-card-title >{{answer.title}}</v-card-title>
        <v-card-subtitle>{{answer.author}}</v-card-subtitle>
        <v-card-text>
          {{answer.content}}
        </v-card-text>
        
      </v-card>
      <br>
          </div>
    <div class="d-flex flex-wrap gap-4 mt-4" >
      <span v-if="this.isLogin()">
          <VBtn
            
            
            type="reset"
            class="btn btn-info"
            color="error"
          
            @click="answerRegister"
          >
            답변 등록
          </VBtn>
          </span>
        </div>  
    </v-container>
    
  </div>
          
  </div>
  
</template>
<script>
import { default as axios } from 'axios';

export default {
  created() {
   
    console.log(this.$route.query.id);
    this.userEmail = sessionStorage.getItem("email");
    this.question.id = this.$route.query.id;


    let url=`http://localhost:8080/question/search/${this.question.id}`
      axios.get(url).then(({ data }) => {
        console.log("data입니다.")
        console.log(data);
        this.question.title = data.title;
        this.question.content = data.content;
        this.question.author = data.author;

        
        
      });

    url=`http://localhost:8080/answer/list/${this.question.id}`
      axios.get(url).then(({ data }) => {
        console.log(data);
        this.answers = data;
        
        
      });
    console.log(this.answers);
  },
    data: () => ({
      userEmail: '',
      question:{
        id: '',
        title: '',
        content: '',
        author: '',
      },
      answers: [],
      isQuestionEditing: false,
      isAnswerEditing: false,
      questionContent: '',
    }),
    
    methods: {

    isLogin() {
    if (sessionStorage.getItem("email")) {
      return true;
    }
    return false;
    },

    moveHandler() {
      console.log('moveHandler...........');
      this.$router.push({ name: 'qnalist' });
    },

    goQuestionDetail() {
      this.$router.push({ name: "qnadetail", query: {id: this.questionId} });
    },

    createHandler() {

      console.log('createHandler........');
     console.log(this.question)
    
      const url='http://localhost:8080/question/regist'
      axios.post(url, this.question).then(({ data }) => {
        console.log(data);
        
        if (data === 'success') {
          alert('질문 등록이 완료되었습니다.');
          
          this.moveHandler();
        } else {
          alert('등록 처리시 문제가 발생했습니다.');
          this.moveHandler();
        }
        
        
      });
    },

    editQuestion() {
 
        this.$router.push({ path: "qna/questionModify", query: {id: this.question.id, author: this.question.author, title: this.question.title, content: this.question.content} });
    },
    deleteQuestion() {
      const url=`http://localhost:8080/question/delete/${this.question.id}`
      axios.delete(url).then(({ data }) => {
        console.log(data);
        
        if (data === 'success') {
          alert('질문 삭제가 완료되었습니다.');
          
          this.moveHandler();
        } else {
          alert('요청 처리시 문제가 발생했습니다.');
          this.moveHandler();
        }
        
        
      });
    },

    answerRegister() {
        console.log("질문 아이디..")
        console.log(this.question.id);
  
        this.$router.push({
          path: './qna/answerRegister',
          query: {id: this.question.id} });
    },

    editAnswer(answerObject) 
    {
       this.$router.push({ name: "answerModify", query: {id: answerObject.id, author: answerObject.author, title: answerObject.title, content: answerObject.content, questionId: answerObject.questionId} });
    },
    deleteAnswer(answerObject) {
      console.log('답변')
      console.log(answerObject);
     const url=`http://localhost:8080/answer/delete/${answerObject.id}`
      axios.delete(url).then(({ data }) => {
        console.log(data);
        
        if (data === 'success') {
          alert('답변 삭제가 완료되었습니다.');
          this.$router.go(this.$router.currentRoute);
          //this.goQuestionDetail();
        } else {
          alert('등록 처리시 문제가 발생했습니다.');
          this.goQuestionDetail();
        }
        
        
      });
    },

     async checkHandler() {
      // console.log('checkHandler..........');
      // console.log('거래구분')
      // console.log(this.select)
      // console.log('onsale')
      // console.log(this.onsale)
      // console.log('model')
      // console.log(this.model)
      // console.log('search')
      // console.log(this.search)
      console.log(this.question.title);
      console.log(this.question.content);
      console.log(this.question.author);
      
      let err = true;
      let msg = '';
      if (!this.question.title) {
        alert('제목을 입력해주세요');
        
      }
      else if (!this.question.content) {
         alert('내용을 입력해주세요');
      }

      
      // 만약, 내용이 다 입력되어 있다면 registArticle 호출
      
      else{
        // try {
        //   const dongCode= await axios.get(`http://localhost:8080/house/getdongname?dongname=${this.house.dongName}`)
        //   const aptCode = await axios.get(`http://localhost:8080/house/getaptcode`)
        //   console.log(dongCode)
        //   console.log(aptCode)
        //   this.house.aptCode= aptCode.data
        //   this.house.dongCode= dongCode.data.dongCode
        //   this.house.dongName=dongCode.data.dongName
        //   console.log(this.house)
        //   this.createHandler();
        // } catch (error) {
        //  console.log("Error >>",error); 
        // }
          this.createHandler();
      
      }

    },

    

    

    }
  }
  
</script>

