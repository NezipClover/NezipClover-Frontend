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
  name: '',
  password: '',
})
const privacyPolicies = ref({flag: false});
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
          내집클로버
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1 text-center">
          행운 가득한 집 찾으러 가요! 🚀
        </h5>
        <p class="mb-0">
          회원가입으로 쉽고 간편한 내집클로버를 이용해 보세요!
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
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                label="이름"
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
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="privacyPolicies.flag"
                  @click="onCheckboxClick"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1;"
                >
                  
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >개인정보수집 및 이용 약관</a>
                  <span class="me-1">에 동의합니다.</span>
                </VLabel>
              </div>

              <VBtn
                block
                type="submit"
              >
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>이미 계정이 있으신가요?</span>
              <RouterLink
                class="text-primary ms-2"
                to="login"
              >
                로그인 바로가기
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
            console.log("data....")
            console.log('응답 데이타', data)
            this.houses = data;
          })
    },
    methods: {
      moveHandler() {
       console.log("moveHandler...........")
       this.$router.push({ name: "index" });
     },
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
    onSubmit(event) {
        if (!this.privacyPolicies.flag) {
          event.preventDefault();
          alert("이용 약관에 동의해 주세요.");
          console.log(123)
        } else if (!this.email_check(this.form.email)) {
          event.preventDefault();
          alert("올바른 형식의 이메일 주소를 입력 해 주세요.");
        } else {
          const url =`http://localhost:8080/user/register`;
        axios.post(url, this.form)
          .then(({data})=>{
            console.log("data....")
            console.log('응답 데이타', this.form)

          })
        
        event.preventDefault()
        alert("회원 가입이 완료되었습니다. 로그인 해 주세요")
        this.moveHandler();
        }
    },
    onCheckboxClick() {
      this.privacyPolicies.flag = true;
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
