<template>
  <div class="dt-action-container">
    <router-link
      class="btn btn-lg btn-round btn-primary btn-space"
      v-if="$can('fpd_access')"
      :to="{ name: xprops.route + '.index', query: { id: row.id } }"
    >
      LIHAT
    </router-link>
    <router-link
      class="btn btn-lg btn-round btn-danger btn-space"
      v-if="$can('finance') && row.accurate_bu_id !== '' && row.accurate_bu_id !== null && row.status !== 'Connected'"
      :to="{ name: xprops.route + '.index', query: { id: row.id } }"
    >
      AOL
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['row', 'xprops'],
}
</script>