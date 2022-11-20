<template>
    
    <div class="container">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                
                    
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">공인중개사 매물 등록</h1>
                            </div>
                            <form class="user">
                                
                                
                                <div class="form-group">
                                    <b-row>
                                    <b-col cols="12">
                                    <b-form-input  v-model="word" @input="searchHouse" placeholder="건물명"/>
                                    </b-col>
                                    <!-- <b-col cols="4">
                                       <b-button variant="primary"  @click='searchHouse' style="width:100%;">검색</b-button>
                                    </b-col> -->
                                    </b-row>
                                    <!-- <div v-if="searched===true">
                                    <div v-if="houses.length > 0"> -->
                                    <div class="autocomplete disabled">
                                    <div
                                    @click="searchSkillAdd"
                                    style="cursor: pointer"
                                    v-for="(res,i) in filteredHouse"
                                    :key="i"
                                    >{{ res }}</div>
                                    </div>
                                    <!-- </div>
                                    
                                    </div>
     -->
                                </div>
                                <hr>
                                <hr>
                                
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="면적">
                                </div>
                                <hr>
                                <hr>
                                
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="층수">
                                </div>
                                <hr>
                                <hr>
                                
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="거래종류">
                                </div>
                                <hr>
                                <hr>
                                
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="거래 금액">
                                </div>
                                <hr>
                                <hr>
                                
                                <a href="login.html" class="btn btn-primary btn-user btn-block">
                                    매물 등록
                                </a>
                                
                                
                            </form>
                            <hr>
                            
                        </div>
                    
                
            </div>
        </div>

    </div>
</template>
<script>
import http from "@/api/http"
export default {
    data() {
        return {
            houses:[],
            filteredHouse:[],
            word:"",
        };
    },
    created(){
        const url =`house/list`;
        http.get(url)
          .then(({data})=>{
            console.log("data....")
            console.log('응답 데이타', data)
            this.houses = data;
          })
    },
    methods: {
    searchHouse(){
      console.log('word.......', this.word)
      const autocomplete = document.querySelector(".autocomplete");
      if (this.word !='') {
        autocomplete.classList.remove("disabled");
        this.filteredHouse = this.houses.filter((house) => {
          return house.aptName.match(this.word);
        });
      } else {
        this.filteredHouse=[];
        autocomplete.classList.add("disabled");
      }
      console.log(this.filteredHouse)
      
    },
  }
}
</script>
