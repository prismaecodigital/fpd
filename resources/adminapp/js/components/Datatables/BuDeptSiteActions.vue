<template>
  <div class="dt-action-container">

    <router-link
      class="btn btn-round btn-success"
      v-if="$can('bu_dept_site_edit')"
      :to="{ name: xprops.route + '.edit', params: { id: row.id } }"
    >
      <i class="material-icons">edit</i>
    </router-link>

    <a
      href="#"
      class="btn btn-round btn-danger"
      v-if="$can('bu_dept_site_delete')"
      @click.prevent="destroyData(row.id)"
      type="button"
    >
      <i class="material-icons">delete</i>
    </a>
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