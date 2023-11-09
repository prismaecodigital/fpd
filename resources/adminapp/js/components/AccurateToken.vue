<template>
  <li class="nav-item">
      <div v-if="$can('finance') || $can('admin')">
          <div v-if="accurate.access_token !== null && accurate.access_token !== '' && accurate.status == 'available'">
              Connected Accurate
          </div>
          <div v-else>
              Not Connected to Accurate
              <a class="btn btn-danger" href="/accurate/get-token" target="_blank">Connect</a>
          </div>
      </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
  ...mapGetters('I18NStore', ['accurate'])
  },
}
</script>

<style scoped>
.fixed-width {
  width: 1.3em;
  text-align: center;
  display: inline-block;
}
</style>