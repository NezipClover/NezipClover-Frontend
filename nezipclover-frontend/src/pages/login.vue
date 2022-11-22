<script setup>
import { useTheme } from 'vuetify'
import logo from '@/assets/logo.svg?raw'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import authV1MaskDark from '@/assets/images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@/assets/images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@/assets/images/pages/auth-v1-tree-2.png'
import authV1Tree from '@/assets/images/pages/auth-v1-tree.png'

const form = ref({
  email: '',
  password: ''
})
const remember = ref({flag: false})

const vuetifyTheme = useTheme()
const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Materio
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
         기다리고 있었어요! 👋🏻
        </h5>
        <p class="mb-0">
          후다닥 로그인 하고 행운의 내집을 찾으러 떠나볼까요?
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit="onSubmit">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="이메일"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="비밀번호"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="remember.flag"
                  label="비밀번호 기억하기"
                />

                <a
                  class="ms-2 mb-1"
                  href="javascript:void(0)"
                >
                  비밀번호 찾기
                </a>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>혹시 아직 회원이 아니신가요?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{ name: 'register' }"
              >
                회원가입
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>
<script>
import { default as axios } from 'axios';

export default {
    created(){
        const url =`http://localhost:8080/house/list`;
        axios.get(url)
          .then(({data})=>{
            console.log("data....12")
            console.log('응답 데이타', data)
            this.houses = data;
          })
    },
    methods: {
      moveHandler() {
       console.log("moveHandler...........")
       this.$router.push({ name: "index" });
     },
    onSubmit(event) {
        event.preventDefault(); 
        console.log(123123);
          if (!this.email_check(this.form.email)) {
          event.preventDefault();
          alert("올바른 형식의 이메일 주소를 입력 해 주세요.");
        } else {
          const url =`http://localhost:8080/user/login`;

        axios.post(url, this.form)
          .then(({data})=>{
            console.log("data....")
            console.log(data);
 
            console.log('응답 데이타', this.form)
            if (data == "success") {
              
                event.preventDefault()
                alert(JSON.stringify(this.form))
                this.moveHandler();
            } else if (data == "fail") {
              event.preventDefault()
              alert("없는 아이디거나, 잘못된 정보를 입력하셨습니다.")

            }



       

          })

 
        }
    },
    email_check( email ) {
    
    var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email));

}
  }
}

</script>
<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
