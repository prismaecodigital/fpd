<template>
  <div class="dt-action-container">
    <a
    v-if="$can('fpd_show') && parseInt(row.fpd.status) >= 5 && parseInt(row.fpd.status) < 9"
    :href="`${this.$router.resolve({ name:'lrds.show', params: { id: row.fpd_id } }).href}`"
    target="_blank"
    class="btn btn-sm btn-info text-azure"
    >Detail</a>
    <a
    v-if="$can('fpd_show') && parseInt(row.fpd.status) == 9"
    :href="`${this.$router.resolve({ name:'fpd-dones.show', params: { id: row.fpd_id } }).href}`"
    target="_blank"
    class="btn btn-sm btn-info text-azure"
    >Detail</a>
  </div>
</template>

<script>
export default {
  props: ['row', 'xprops'],
  data() {
    return {
      // Code...
    }
  },
  created() {
    // Code...
  },
  methods: {

  }
}
</script>