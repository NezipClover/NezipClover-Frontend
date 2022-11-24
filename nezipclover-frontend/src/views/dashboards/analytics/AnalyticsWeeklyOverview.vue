<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()
const options = computed(() => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)
  const disabledColor = `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['disabled-opacity'] })`
  const borderColor = `rgba(${ hexToRgb(String(variableTheme.value['border-color'])) },${ variableTheme.value['border-opacity'] })`
  
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded',
      },
    },
    stroke: {
      width: 2,
      colors: [currentTheme.value.surface],
    },
    legend: { show: false },
    grid: {
      borderColor,
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5,
      },
    },
    dataLabels: { enabled: false },
    colors: [
      // currentTheme.value.background,
      // currentTheme.value.background,
      // currentTheme.value.background,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      currentTheme.value.primary,
      
    ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    xaxis: {
      categories: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
      tickPlacement: 'on',
      labels: { show: false },
      crosshairs: { opacity: 0 },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        style: {
          colors: disabledColor,
          fontSize: '12px',
        },
        formatter: value => `${ value > 999 ? `${ (value / 1000).toFixed(0) }` : value }k`,
      },
    },
  }
})
let series = [{
  data: [
 1, 255, 311, 4, 5, 6, 7, 8, 9, 10, 11, 12

  ],
}]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Weekly Overview</VCardTitle>

      <template #append>
        <div class="me-n3">
          <VBtn
            icon
            size="x-small"
            color="default"
            variant="text"
          >
            <VIcon
              size="24"
              icon="mdi-dots-vertical"
            />
          </VBtn>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        type="bar"
        :options="options"
        :series="series"
        :height="220"
      />

      <div class="d-flex align-center mb-3">
        <h5 class="text-h5 me-4">
          45%
        </h5>
        <p>
          Your sales performance is 45% 😎 better compared to last month
        </p>
      </div>

      <VBtn block>
        Details
      </VBtn>
    </VCardText>
  </VCard>
</template>

<script>
import { default as axios } from 'axios';

export default {
    data: () => ({
      entireDeal: [],
    }),
  created() {
  this.entireDealAmount();
  },
    methods: {
      entireDealAmount() 
      {   
          const url =`http://localhost:8080/house/entireDealAmount`;
          axios.get(url)
          .then(({data})=>{
            console.log("data....")
            console.log(data);
            this.entireDeal = data;
            this.series[0].data = data;
      
          })
      }
  }
}

</script>