





<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
const info = ref({
  name: '',
  userKind: '',
})

const infoForLogout = ref({
  email: '',
  accessToken: '',
})

const avatarBadgeProps = {
  dot: true,
  location: 'bottom right',
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}
</script>
<script>
import { default as axios } from 'axios';

export default {

  created() {
    this.info.name = sessionStorage.getItem("name");
    this.info.userKind = sessionStorage.getItem("userKind");
    console.log(this.info.name)
    console.log(this.info.userKind)
    this.infoForLogout.email = sessionStorage.getItem("email");
    this.infoForLogout.accessToken = sessionStorage.getItem("accessToken");
    console.log(this.infoForLogout.email);
    console.log(this.infoForLogout.accessToken);
    
  },

    methods: {
      isLogin() {
        if (sessionStorage.getItem("email")) {
          return true;
        }
        return false;
      },
      changeProfilePhoto() {
      eventBus.$on('이벤트명', function(data){ console.log(555); });
      console.log("다른 컴포넌트 호출 성공")
       //this.$router.push({ name: "index" });
     },
     moveHandler() {
       console.log("moveHandler...........")
       this.$router.push({ name: "login" });
     },
      onLogout(event) {
        event.preventDefault(); 
        console.log(123123555);
          if (!sessionStorage.getItem("accessToken")) {
            alert("로그인 된 상태가 아닙니다. 로그인 화면으로 돌아갑니다.");
            this.moveHandler();
          } else {
          const url =`http://localhost:8080/user/logout`;

          axios.post(url, this.infoForLogout)
            .then(({data})=>{
              if (data == "success") {
                console.log(5252);
                event.preventDefault()

             
                sessionStorage.clear();
                sessionStorage.clear;

                alert("웹 사이트로부터 로그아웃 했습니다. 로그인 화면으로 돌아갑니다.")


                this.moveHandler();
            } 


          
          })
          }
  },
}
}
</script>


<template>
<div v-if="this.isLogin() ">
  <VBadge v-bind="avatarBadgeProps">
    <VAvatar
      style="cursor: pointer;"
      color="primary"
      variant="tonal"
    >
    
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge v-bind="avatarBadgeProps">
                  <VAvatar
                    color="primary"
                    size="40"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold" >
              
              이름 : {{this.info.name}}
              
              
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled">
              역할 : {{this.info.userKind == 0 ? "이용자" : "공인중개사"}}
              
            </VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem to="/account-settings">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-account-outline"
                size="22"
              />
            </template>

            <VListItemTitle>사용자 계정 정보</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem to="/account-settings">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-cog-outline"
                size="22"
              />
            </template>

            <VListItemTitle>푸쉬 알림 관리</VListItemTitle>
          </VListItem>



          <!-- 👉 FAQ -->
          <VListItem to="/">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-help-circle-outline"
                size="22"
              />
            </template>

            <VListItemTitle>사이트 맵</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="this.onLogout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout-variant"
                size="22"
              />
            </template>

            <VListItemTitle>로그아웃</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
   
  </VBadge>
   </div>
</template>
