<script setup>
import upgradeBannerDark from '@/assets/images/pro/upgrade-banner-dark.png'
import upgradeBannerLight from '@/assets/images/pro/upgrade-banner-light.png'
import logo from '@/assets/logo.svg?raw'
import {
  VerticalNavLink,
  VerticalNavSectionTitle,
} from '@layouts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header" @click="afterEffect">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- ℹ️ You can also use img tag or VImg here -->
      <img src="../../../public/logo.png" width ="30"/>

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          내집클로버
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>

    <VerticalNavLink
      :item="{
        title: '거래 내역',
        to: 'index',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <div v-if="this.isLogin">
    <VerticalNavLink 
      :item="{
        title: '프로필',
            to: 'account-settings',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    v-if="dealer"/>
    </div>
    <!-- 👉 Pages -->
    <VerticalNavSectionTitle :item="{ heading: 'Pages' }" />
     <div v-if="!this.isLogin">
    <VerticalNavLink
      :item="{
        title: '로그인',
        to: 'login',
      //  target: '_blank',
        icon: { icon: 'mdi-login' }
      }"
    />
     </div>
    <VerticalNavLink @click="clearSession"
      :item="{
        title: '회원 가입',
        to: 'register',
      //  target: '_blank',
        icon: { icon: 'mdi-account-plus-outline' }
      }"
    />

    <!-- ℹ️ This path doesn't exist so 404 route will catch this undefined path -->
    <VerticalNavLink
      :item="{
        title: '에러 페이지',
        to: { path: '/error' },
        target: '_blank',
        icon: { icon: 'mdi-alert-circle-outline' }
      }"
    />

    <!-- 👉 User Interface -->
    <VerticalNavSectionTitle :item="{ heading: 'User Interface' }" v-if="dealer"/>
  
    <VerticalNavLink v-if="this.isDealer"
      :item="{
        title: '매물등록',
        to: 'onsale',
        icon: { icon: 'mdi-domain-plus' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: '질문&답변 게시판',
        to: 'qnalist',
        icon: { icon: 'mdi-domain-plus' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Typography',
        to: 'typography',
        icon: { icon: 'mdi-alpha-t-box-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Icons',
        to: 'icons',
        icon: { icon: 'mdi-eye-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Cards',
        to: 'card-basic',
        icon: { icon: 'mdi-credit-card-outline' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Tables',
        to: 'tables',
        icon: { icon: 'mdi-table' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Form Layouts',
        to: 'form-layouts',
        icon: { icon: 'mdi-form-select' }
      }"
    />
  </ul>

  <!-- 👉 illustration -->
  <a
    href="https://themeselection.com/item/materio-vuetify-vuejs-admin-template"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      :src="upgradeBanner"
      alt="upgrade-banner"
      transition="scale-transition"
      class="upgrade-banner mx-auto"
      style="max-width: 230px"
    >
  </a>
</template>
<script>


export default {
  created() {
    if (sessionStorage.getItem("email")) {
      this.isLogin = true;
    }
    if (sessionStorage.getItem("userKind") == 1) {
      this.isDealer = true;
    }
  },
  data() {
    return {
      dealer : true,
      isLogin : false,
      isDealer : false,
    }
  },
  methods: {
    afterEffect() {
      this.isLogin = false;
      this.isDealer = false;
    },
    clearSession() {
      sessionStorage.clear();
      alert("로그아웃 후 회원가입 페이지로 이동합니다.")
    }
  }

};
</script>

<style lang="scss">
// .v-navigation-drawer {
//   height: 100%;

//   .v-navigation-drawer__content {
//     display: flex;
//     flex-direction: column;

//     > ul {
//       flex-grow: 1;
//     }
//   }
// }

.upgrade-banner {
  margin-top: auto;
  // position: absolute;
  // bottom: 13px;
  // left: 50%;
  // transform: translateX(-50%);
}
</style>
