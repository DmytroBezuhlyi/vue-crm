<template>
  <table>
    <thead>
    <tr>
      <th>{{ '#' | locale }}</th>
      <th>{{ 'Sum' | locale }}</th>
      <th>{{ 'Date' | locale }}</th>
      <th>{{ 'Category' | locale }}</th>
      <th>{{ 'Type' | locale }}</th>
      <th>{{ 'Open' | locale }}</th>
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
          {{ record.typeText | locale }}
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