<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import UserProfile from '../../../layouts/components/UserProfile.vue'

const form = ref({
  email: '',
  name: '',
  password: '',
  userKind: '이용자',
})


const accountData = {
  
  email: sessionStorage.getItem("email"),
  name: '',
  userKind: 0,
  avatarImg: avatar1,
}
const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [v => !!v || '동의해 주세요.']
const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}
const changeAvatar = file => {
  const fileReader = new FileReader()
  const {files} = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
      //  console.log(  accountDataLocal.value.avatarImg)

      //$UserProfile.changeProfilePhoto();
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.avatarImg
}
const timezones = [
  '(GMT-11:00) International Date Line West',
  '(GMT-11:00) Midway Island',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central America',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Mexico City',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogota',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT-05:00) Indiana (East)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasilia',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Mid-Atlantic',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Cape Verde Is.',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) London',
]
const currencies = [
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'BRL',
  'CAD',
  'CNY',
  'CZK',
  'DKK',
  'HKD',
  'HUF',
  'INR',
]
</script>
<script>
import { default as axios } from 'axios';

export default {
  created () {
    this.form.email = sessionStorage.getItem("email");
    this.form.name = sessionStorage.getItem("name");
    this.form.password = sessionStorage.getItem("password");
    this.form.userKind = sessionStorage.getItem("userKind") == 0 ? "이용자" : "공인중개사"
  },
    methods: {
      refreshPage() {
       console.log("refreshPage...........")
       //현재 경로로
        this.$router.go(this.$router.currentRoute);
     },
     moveHandler() {
       console.log("moveHandler...........")
        this.$router.push({ name: "index" });
     }
     ,
    onDelete(event) {
      console.log("delete...........")
      this.form.userKind = this.form.userKind == "이용자" ? 0 : 1;
      console.log(this.form.email);
      console.log(this.form.name);
      console.log(this.form.password);
      console.log(this.form.userKind);
     
    
      const url =`http://localhost:8080/user/delete`;
      axios.post(url, this.form)
        .then(({data}) => {
          console.log(data)
          if(data == "success") {
             event.preventDefault()
                alert("사용자 계정이 삭제되었습니다.")
                sessionStorage.clear();
                this.moveHandler();
          }
        })
    }
    ,
    onSubmit(event) {
        event.preventDefault(); 
        console.log(123123);
        console.log(this.form)
        this.form.userKind = this.form.userKind == "이용자" ? 0 : 1;

        const url =`http://localhost:8080/user/modifyProfile`;


        axios.post(url, this.form)
          .then(({data})=>{
            console.log("data....")
            console.log(data);
            console.log(sessionStorage.getItem("name"))
            console.log('응답 데이타', this.form)
            if (data == "success") {

                event.preventDefault()
                alert(JSON.stringify(this.form))




                sessionStorage.setItem("email", this.form.email);
                sessionStorage.setItem("name", this.form.name);
                sessionStorage.setItem("password", this.form.password);
                sessionStorage.setItem("userKind", this.form.userKind);



                this.refreshPage();
            } 
          })

 
        }
    },
  }


</script>
<template>
  <VRow>
    <VCol cols="12">
      <VCard title="사용자 정보">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
            :image="accountDataLocal.avatarImg"
          />

          <!-- 👉 Upload Photo -->
          <form
            ref="refForm"
            class="d-flex flex-column justify-center gap-5"
          >
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">사진 변경</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">RESET</span>
                <VIcon
                  icon="mdi-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              JPG, GIF 또는 PNG 확장자 파일만 가능합니다. (최대 800K)
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" @submit="onSubmit">
            <VRow>
              <!-- 👉 First Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="form.email"
                  label="이메일"
                  type="email"
                />
              </VCol>

              <!-- 👉 Last Name -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="form.name"
                  label="이름"
                />
              </VCol>

                <VCol cols="12">
                  <VSelect v-model ="form.userKind"
                    label="공인중개사 또는 이용자 중에서 변경할 계정 유형을 선택하세요"
                    :items="['공인중개사', '이용자']"
                  />
                </VCol>

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn     
            
                type="submit">변경내역 저장</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  RESET
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Delete Account -->
      <VCard title="회원 탈퇴">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <VAlert
            color="warning"
            variant="tonal"
            class="mb-4"
          >
            <VAlertTitle class="mb-1">
              정말로 탈퇴하시겠습니까?
            </VAlertTitle>
            <p class="mb-0">
              한번 삭제한 계정은, 다시 복구할 수 없습니다.
            </p>
          </VAlert>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              :rules="validateAccountDeactivation"
              label="네, 계정을 삭제하겠습니다."
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
            @click="this.onDelete"
          >
            회원 탈퇴하기
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
