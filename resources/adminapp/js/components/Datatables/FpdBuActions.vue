<template>
  <div class="dt-action-container">
    <router-link
      class="btn btn-lg btn-round btn-success btn-space"
      v-if="$can('fpd_access')"
      :to="{ name: xprops.route + '.index', query: { id: row.id } }"
    >
      LIHAT
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['row', 'xprops'],
}
</script>