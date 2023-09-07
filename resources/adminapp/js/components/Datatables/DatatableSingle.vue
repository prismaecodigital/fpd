<template>
  <div>
    <span v-if="row[entry.key]" class="badge-pill badge-azure">
      {{ row[entry.key][entry.field] }}
    </span>
    <span v-else class="badge-pill badge-orange">
      -
    </span>
  </div>
</template>

<script>
export default {
  props: ['field', 'row'],
  computed: {
    entry() {
      let s = _.split(this.field, '.')
      return {
        key: s[0],
        field: s[1]
      }
    }
  }
}
</script>

<style scoped>
.badge {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: none;
}
</style>