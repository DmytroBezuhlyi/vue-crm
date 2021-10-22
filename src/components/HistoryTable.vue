<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Sum</th>
      <th>Date</th>
      <th>Category</th>
      <th>Type</th>
      <th>Open</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) in records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.amount }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
            class="white-text badge"
            :class="record.typeClass"
        >
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button
            class="btn-small btn"
            v-tooltip="'Open the record'"
            @click="$router.push(`/detail/${record.id}`)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>