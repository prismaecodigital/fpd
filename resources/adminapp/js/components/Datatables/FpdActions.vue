<template>
  <div class="dt-action-container">
    <router-link
      v-if="$can(xprops.permission_prefix + 'show')"
      :to="{ name: xprops.route + '.show', params: { id: row.id } }"
      class="btn btn-round btn-default text-azure"
    >
      <i class="material-icons">remove_red_eye</i>
    </router-link>

    <router-link
      class="btn btn-round btn-success"
      v-if="($can('admin')) || row.status === 0 || (row.status === 1 && $can(parseInt(row.status)-1))"
      :to="{ name: xprops.route + '.edit', params: { id: row.id } }"
    >
      <i class="material-icons">edit</i>
    </router-link>

    <router-link
      class="btn btn-round btn-xs btn-primary"
      v-if="$can(row.status)"
      :to="{ name: xprops.route + '.editData', params: { id: row.id } }"
    >
      Process
    </router-link>

    <a
      href="#"
      class="btn btn-round btn-danger"
      v-if="$can(xprops.permission_prefix + 'delete')"
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