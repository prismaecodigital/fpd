<template>
  <div class="dt-action-container">
    <router-link
      class="btn btn-lg btn-space btn-round btn-success"
      v-if="$can('account_access')"
      :to="{ name: xprops.route + '.index', query: { id: row.id } }"
    >
      COA
    </router-link>
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
    destroyData(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#dd4b39',
        focusCancel: true,
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch(this.xprops.module + '/destroyData', id)
            .then(result => {
              this.$eventHub.$emit('delete-success')
            })
        }
      })
    }
  }
}
</script>