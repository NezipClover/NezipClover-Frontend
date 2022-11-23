
<script setup>


const selectedNotification = ref('내가 온라인 일 때만 (기본값)')
</script>
<script>
import { default as axios } from 'axios';
const ths = [
  {first: "글쓴이"},
  {second: "글쓴이2"},
  {third: "글쓴이3"},
  {name: "글쓴이4"}
]

export default {
  data() {
    return {
      questions: [],
      word: '',
      keys: ['--선택하세요--', '제목', '내용', '글쓴이'
        // { value: 'all', text: '--선택하세요--' },
        // { value: 'title', text: '제목' },
        // { value: 'content', text: '내용' },
        // { value: 'author', text: '글쓴이' },
      ], //select option에 표시할 데이타
      fields: [
        5, 6, 7, 8
        // { key: 'id', label: 'id' },
        // { key: 'title', label: '제목' },
        // { key: 'content', label: '내용' },
        // { key: 'author', label: '글쓴이' },
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
      console.log('word....', this.word)
      let url;
      if (this.key =='all' || this.key == '' || this.word == '') {
        url = `http://localhost:8080/question/list`;
      } else {
        let tempKey;
        if (this.key == '제목') {
          tempKey = 'title';
        } else if (this.key == '내용') {
          tempKey = 'content';
        } else if (this.key == '글쓴이') {
          tempKey = 'author';
        }
        url = `http://localhost:8080/question/listByWord/${tempKey}/${this.word}`;
      }
      console.log(url)
      axios.get(url).then(({ data }) => {
        console.log('응답 데이타', data);
        this.questions = data;
      });
    },
      onSubmit() {
        
        alert("설정이 저장되었습니다.")
       //현재 경로로
        this.$router.go(this.$router.currentRoute);
     },
     onSelectChange(event) {
        console.log(this.key);
     },
     onSearchChange(event) {
        if (this.key != 'all') {
        this.searchQuestion();
        }
     }
    }
}
</script>


<template>
  <VCard title="질문 & 답변 게시판">

    <VCardText>
      질문 & 답변 게시판입니다.
      
      <a href="javascript:void(0)">자주 묻는 질문</a>
    </VCardText>
<VCardText>


        <VRow>
          <VCol
            cols="12"
            sm="6"
          >

          </VCol>
        </VRow>

        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn
            
            
            type="reset"
            
            to ="qna/questionRegist"
          >
            질문 등록
          </VBtn>
        </div>

    </VCardText>

<VRow align="center">
      <VCol
        class="d-flex"
        cols="12"
        sm="6"
      >
        <VSelect
          :items="keys"
          label="선택하세요"
          v-model="this.key"
         @update:modelValue="onSelectChange"
        ></VSelect>
      </VCol>

      <VCol
        class="d-flex"
        cols="12"
        sm="6"
      >  <VTextField v-model="this.word" label="검색어를 입력" @update:modelValue="onSearchChange"></VTextField>
      </VCol>
</VRow>



    <VTable class="text-no-wrap" >
      <thead>
        <tr>
          <th scope="col">
            id
          </th>
          <th scope="col">
            제목
          </th>
          <th scope="col">
          내용
          </th>
          <th scope="col">
            글쓴이
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="question in this.questions"
          :key="question.id" 
          @clicked="goDetail"
        >
          <td>
          {{question.id}}  <!-- {{ device.type }} -->
          </td>
          <td>
          {{question.title}}<!-- <VCheckbox v-model="device.email" /> -->
          </td>
          <td>
          {{question.content}}<!-- 11<VCheckbox v-model="device.browser" /> -->
          </td>
          <td>
             {{question.author}}
            <!-- 11<VCheckbox v-model="device.app" /> -->
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

<VCardText>


        <VRow>
          <VCol
            cols="12"
            sm="6"
          >

          </VCol>
        </VRow>

        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn
            
            
            type="reset"
            to ="qna/questionRegist"
          >
            질문 등록
          </VBtn>
        </div>

    </VCardText>

  </VCard>
</template>
