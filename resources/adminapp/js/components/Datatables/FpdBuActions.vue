<template>
  <div class="dt-action-container">
    <router-link
      class="btn btn-lg btn-round btn-success"
      v-if="$can('fpd_access')"
      :to="{ name: xprops.route + '.index', query: { id: row.id } }"
    >
      FPD
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['row', 'xprops'],
}
</script>