
<script setup>



const recentDevices = ref([
  {
    type: '소식 알림',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: '사용자 활동',
    email: true,
    browser: true,
    app: true,
  },
  {
    type: '새로운 브라우저로 로그인',
    email: true,
    browser: true,
    app: false,
  },
  {
    type: '새로운 기기에서 사용',
    email: true,
    browser: false,
    app: false,
  },
])
const selectedNotification = ref('내가 온라인 일 때만 (기본값)')
</script>
<script>
import { default as axios } from 'axios';

export default {

    methods: {
      onSubmit() {
        
        alert("설정이 저장되었습니다.")
       //현재 경로로
        this.$router.go(this.$router.currentRoute);
     },
    }
}
</script>


<template>
  <VCard title="최근 사용 기록">
    <VCardText>
      알림을 표시하려면 브라우저의 권한이 필요합니다.
      
      <a href="javascript:void(0)">권한 요청하기</a>
    </VCardText>

    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">
            Type
          </th>
          <th scope="col">
            EMAIL
          </th>
          <th scope="col">
            BROWSER
          </th>
          <th scope="col">
            App
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="device in recentDevices"
          :key="device.type"
        >
          <td>
            {{ device.type }}
          </td>
          <td>
            <VCheckbox v-model="device.email" />
          </td>
          <td>
            <VCheckbox v-model="device.browser" />
          </td>
          <td>
            <VCheckbox v-model="device.app" />
          </td>
        </tr>
      </tbody>
    </VTable>
    <VDivider />

    <VCardText>
      <VForm @submit="this.onSubmit">
        <p class="text-base font-weight-medium">
          언제 푸쉬 알림을 보내드릴까요?
        </p>

        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <VSelect
              v-model="selectedNotification"
              mandatory
              :items="['내가 온라인일 때만', '항상']"
              name="abab"
            />
          </VCol>
        </VRow>

        <div class="d-flex flex-wrap gap-4 mt-4">
          <VBtn type="submit">
            변경내역 저장
          </VBtn>
          <VBtn
            color="secondary"
            variant="tonal"
            type="reset"
            @click="this.onClickReset"
          >
            Reset
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
