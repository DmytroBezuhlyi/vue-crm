<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Exchange Rate</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Exchange Rate</th>
            <th>Date</th>
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