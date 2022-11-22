<script setup>

const form = ref({
  email: '',
  name: '',
  password: '',
  userKind: '이용자',
})


const isCurrentPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const currentPassword = ref(sessionStorage.getItem("password"))
const newPassword = ref(sessionStorage.getItem("password"))
const confirmPassword = ref(sessionStorage.getItem("password"))
const passwordRequirements = [
  '최소 8글자 이상이여야 합니다.',
  '영어 소문자가 포함되어야 합니다.',
  '한 개이상의 숫자, 한개 이상의 특수문자가 포함되어야 합니다.',
]
const serverKeys = [
  {
    name: 'Server Key 1',
    key: '23eaf7f0-f4f7-495e-8b86-fad3261282ac',
    createdOn: '28 Apr 2021, 18:20 GTM+4:10',
    permission: 'Full Access',
  },
  {
    name: 'Server Key 2',
    key: 'bb98e571-a2e2-4de8-90a9-2e231b5e99',
    createdOn: '12 Feb 2021, 10:30 GTM+2:30',
    permission: 'Read Only',
  },
  {
    name: 'Server Key 3',
    key: '2e915e59-3105-47f2-8838-6e46bf83b711',
    createdOn: '28 Dec 2020, 12:21 GTM+4:10',
    permission: 'Full Access',
  },
]
const recentDevices = [
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'mdi-microsoft-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on iPhone',
    device: 'iPhone 12x',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'mdi-cellphone',
      color: 'error',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'mdi-android',
      color: 'success',
    },
  },
  {
    browser: 'Chrome on MacOS',
    device: 'Apple iMac',
    location: 'New York, NY',
    recentActivity: '28 Apr 2022, 18:20',
    deviceIcon: {
      icon: 'mdi-apple',
      color: 'secondary',
    },
  },
  {
    browser: 'Chrome on Windows',
    device: 'HP Spectre 360',
    location: 'Los Angeles, CA',
    recentActivity: '20 Apr 2022, 10:20',
    deviceIcon: {
      icon: 'mdi-microsoft-windows',
      color: 'primary',
    },
  },
  {
    browser: 'Chrome on Android',
    device: 'Oneplus 9 Pro',
    location: 'San Francisco, CA',
    recentActivity: '16 Apr 2022, 04:20',
    deviceIcon: {
      icon: 'mdi-android',
      color: 'success',
    },
  },
]
</script>







<script>
import { default as axios } from 'axios';

export default {
  created () {
    this.form.email = sessionStorage.getItem("email");
    this.form.name = sessionStorage.getItem("name");
    this.form.password = sessionStorage.getItem("password");
    this.form.userKind = sessionStorage.getItem("userKind");
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
    
    onSubmit(event) {
        event.preventDefault(); 
        console.log(123123);
        console.log(this.form)

        if(this.confirmPassword == this.newPassword) {
          if (this.form.password != this.currentPassword) {
            event.preventDefault();
            alert("현재 비밀번호가 일치하지 않습니다. 확인 후 다시 입력해 주세요.")
            //this.refreshPage();
          } else {  
            this.form.password = this.newPassword;
            const url =`http://localhost:8080/user/modifyProfile`;


                    axios.post(url, this.form)
                      .then(({data})=>{

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

        } else {
          event.preventDefault();
          alert("새로운 비밀번호가 서로 일치하지 않습니다. 확인 후 다시 입력해 주세요.")
          //refreshPage();
        }
        
        

 
        }
    },
  }


</script>



<template>
  <VRow>
    <!-- SECTION: Change Password -->
    <VCol cols="12">
      <VCard title="비밀번호 변경">
        <VForm @submit="onSubmit">
          <VCardText>
            <!-- 👉 Current Password -->
            <VRow class="mb-3">
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 current password -->
                <VTextField
                  v-model="currentPassword"
                  :type="isCurrentPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isCurrentPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  label="현재 비밀번호"
                  @click:append-inner="isCurrentPasswordVisible = !isCurrentPasswordVisible"
                />
              </VCol>
            </VRow>

            <!-- 👉 New Password -->
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 new password -->
                <VTextField
                  v-model="newPassword"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  label="새로운 비밀번호"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>

              <VCol
                cols="12"
                md="6"
              >
                <!-- 👉 confirm password -->
                <VTextField
                  v-model="confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  label="새로운 비밀번호 확인"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>
            </VRow>
          </VCardText>

          <!-- 👉 Password Requirements -->
          <VCardText>
            <p class="text-base font-weight-medium mt-2">
              비밀번호 요구사항
            </p>

            <ul class="d-flex flex-column gap-y-3">
              <li
                v-for="item in passwordRequirements"
                :key="item"
                class="d-flex"
              >
                <div>
                  <VIcon
                    size="7"
                    icon="mdi-circle"
                    class="me-3"
                  />
                </div>
                <span class="font-weight-medium">{{ item }}</span>
              </li>
            </ul>
          </VCardText>

          <!-- 👉 Action Buttons -->
          <VCardText class="d-flex flex-wrap gap-4">
            <VBtn type="submit">비밀번호 변경</VBtn>

            <VBtn
              type="reset"
              color="secondary"
              variant="tonal"
            >
              Reset
            </VBtn>
          </VCardText>
        </VForm>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Two-steps verification -->
    <VCol cols="12">
      <VCard title="2단계 인증으로 보안성 강화">
        <VCardText>
          <p class="font-weight-semibold">
            2단계 인증은 아직 준비되지 않았습니다.
          </p>
          <p>
            
            2단계 보안 인증은 귀하의 계정에 추가적인 보안 레이어를 구성합니다. 또한, 로그인을 위해 비밀번호 뿐만이 아닌 더 많은 정보를 요구하게 됩니다.
            <a
              href="javascript:void(0)"
              class="text-decoration-none"
            >자세히 알아보기</a>
          </p>

          <VBtn>
            2단계 인증 활성화
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <VCol cols="12">
      <!-- SECTION: Create an API key -->
      <VCard title="API 키 만들기">
        <VRow>
          <!-- 👉 Choose API Key -->
          <VCol
            cols="12"
            md="5"
            order-md="0"
            order="1"
          >
            <VCardText>
              <VForm @submit.prevent="() => {}">
                <VRow>
                  <!-- 👉 Choose API Key -->
                  <VCol cols="12">
                    <VSelect
                      label="생성하고자 하는 API 키를 선택하세요"
                      :items="['Full Control', 'Modify', 'Read & Execute', 'List Folder Contents', 'Read Only', 'Read & Write']"
                    />
                  </VCol>

                  <!-- 👉 Name the API Key -->
                  <VCol cols="12">
                    <VTextField label="API 키 이름" />
                  </VCol>

                  <!-- 👉 Create Key Button -->
                  <VCol cols="12">
                    <VBtn
                      type="submit"
                      block
                    >
                      키 생성하기
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCol>
        </VRow>
      </VCard>
    <!-- !SECTION -->
    </VCol>

    <VCol cols="12">
      <!-- SECTION: API Keys List -->
      <VCard title="API 키 리스트 &amp; 접근 권한">
        <VCardText>
         API 키는 주체 없이 응용 프로그램을 식별하는 단순 암호화된 문자열입니다. 이는 익명으로 공용 데이터에 액세스하는 데 유용하며 할당량 및 청구를 위해 API 요청을 프로젝트와 연결하는 데 사용됩니다.
        </VCardText>

        <!-- 👉 Server Status -->
        <VCardText class="d-flex flex-column gap-y-4">
          <div
            v-for="serverKey in serverKeys"
            :key="serverKey.key"
            class="bg-var-theme-background pa-4"
          >
            <div class="d-flex align-center flex-wrap mb-3">
              <h6 class="text-h6 mb-0 me-3">
                {{ serverKey.name }}
              </h6>
              <VChip
                label
                color="primary"
                size="small"
              >
                {{ serverKey.permission }}
              </VChip>
            </div>
            <p class="text-base font-weight-semibold">
              <span class="me-3">{{ serverKey.key }}</span>
              <VIcon
                :size="18"
                icon="mdi-content-copy"
                class="cursor-pointer"
              />
            </p>
            <span> {{ serverKey.createdOn }} 생성됨</span>
          </div>
        </VCardText>
      </VCard>
      <!-- !SECTION -->
    </VCol>

    <!-- SECTION Recent Devices -->
    <VCol cols="12">
      <!-- 👉 Table -->
      <VCard title="최근 접속 기록">
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">
                브라우저
              </th>
              <th scope="col">
                기기
              </th>
              <th scope="col">
                위치
              </th>
              <th scope="col">
                최근 활동
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="device in recentDevices"
              :key="device.recentActivity"
            >
              <td>
                <VIcon
                  start
                  :icon="device.deviceIcon.icon"
                  :color="device.deviceIcon.color"
                />
                {{ device.browser }}
              </td>
              <td>{{ device.device }}</td>
              <td>{{ device.location }}</td>
              <td>{{ device.recentActivity }}</td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>
</template>
