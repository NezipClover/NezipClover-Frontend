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
  <!-- π Nav header -->
  <div class="nav-header" @click="afterEffect">
    <RouterLink
      to="/"
      class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
    >
      <!-- βΉοΈ You can also use img tag or VImg here -->
      <img src="../../../public/logo.png" width ="30"/>

      <Transition name="vertical-nav-app-title">
        <h1 class="font-weight-semibold leading-normal text-xl text-uppercase">
          λ΄μ§ν΄λ‘λ²
        </h1>
      </Transition>
    </RouterLink>
  </div>

  <!-- π Nav items -->
  <ul>

    <VerticalNavLink
      :item="{
        title: 'κ±°λ λ΄μ­',
        to: 'index',
        icon: { icon: 'mdi-home-outline' }
      }"
    />
    <div v-if="this.isLogin">
    <VerticalNavLink 
      :item="{
        title: 'νλ‘ν',
            to: 'account-settings',
        icon: { icon: 'mdi-account-cog-outline' }
      }"
    v-if="dealer"/>
    </div>
    <!-- π Pages -->
    <VerticalNavSectionTitle :item="{ heading: 'Pages' }" />
     <div v-if="!this.isLogin">
    <VerticalNavLink
      :item="{
        title: 'λ‘κ·ΈμΈ',
        to: 'login',
      //  target: '_blank',
        icon: { icon: 'mdi-login' }
      }"
    />
     </div>
    <VerticalNavLink @click="clearSession"
      :item="{
        title: 'νμ κ°μ',
        to: 'register',
      //  target: '_blank',
        icon: { icon: 'mdi-account-plus-outline' }
      }"
    />

    <!-- βΉοΈ This path doesn't exist so 404 route will catch this undefined path -->
    <VerticalNavLink
      :item="{
        title: 'μλ¬ νμ΄μ§',
        to: { path: '/error' },
        target: '_blank',
        icon: { icon: 'mdi-alert-circle-outline' }
      }"
    />

    <!-- π User Interface -->
    <VerticalNavSectionTitle :item="{ heading: 'User Interface' }" v-if="dealer"/>
  
    <VerticalNavLink v-if="this.isDealer"
      :item="{
        title: 'λ§€λ¬Όλ±λ‘',
        to: 'onsale',
        icon: { icon: 'mdi-domain-plus' }
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'μ§λ¬Έ&λ΅λ³ κ²μν',
        to: 'qnalist',
        icon: { icon: 'mdi-domain-plus' }
      }"
    />
    
  </ul>

  <!-- π illustration -->
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
      alert("λ‘κ·Έμμ ν νμκ°μ νμ΄μ§λ‘ μ΄λν©λλ€.")
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
