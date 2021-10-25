<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'Exchange Rate' | locale }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ 'Currency' | locale }}</th>
            <th>{{ 'Exchange Rate' | locale }}</th>
            <th>{{ 'Date' | locale }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="curr in currencies" :key="curr">
            <td>{{ curr }}</td>
            <td>{{ rates[curr].toFixed(5) }}</td>
            <td>{{ date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",
  props: ['rates', 'date'],
  data: () =>({
    currencies: ['UAH', 'USD', 'EUR']
  }),
}
</script>

<style scoped>

</style>