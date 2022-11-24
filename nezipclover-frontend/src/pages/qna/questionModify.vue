<script setup>

</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>

      <VCol cols="12">
        <VTextField ref="r3"
          v-model="question.title"
          label="제목"
          type="text"
          placeholder="제목"
        />
      </VCol>
      <VCol cols="12">
        
        <v-textarea
          outlined
          v-model="question.content"
          name="내용"
          label="내용"
          placeholder="내용"
        ></v-textarea>
      </VCol>
     

      <VCol
        cols="12"
        class="d-flex gap-4 "
      >
        <VBtn type="submit" @click="checkHandler">
          작성 완료
        </VBtn>


        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
          @click="resetAll"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
<script>
import { default as axios } from 'axios';

export default {
  created() {
    this.question.id = this.$route.query.id;
    this.question.title = this.$route.query.title;
    this.question.content = this.$route.query.content;
    this.question.author = this.$route.query.author;
    console.log(this.$route.query.id);
    console.log(this.$route.query.title);
    console.log(this.$route.query.content);
    console.log(this.$route.query.author);
  },
    data: () => ({

      question:{
        id: '',
        title: '',
        content: '',
        author: '',
      },
    }),
    
    methods: {

    moveHandler() {
      console.log('moveHandler...........');
      this.$router.push({ name: 'qnalist' });
    },

    createHandler() {

      console.log('createHandler........');
     console.log(this.question)
    
      const url='http://localhost:8080/question/update'
      axios.put(url, this.question).then(({ data }) => {
        console.log(data);
        
        if (data === 'success') {
          alert('질문 수정이 완료되었습니다.');
          
          this.moveHandler();
        } else {
          alert('등록 처리시 문제가 발생했습니다.');
          this.moveHandler();
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

