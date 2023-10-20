<template>
  <div class="container-fluid">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
              <div class="card-icon">
                <i class="material-icons">add</i>
              </div>
              <h4 class="card-title">
                {{ $t('global.create') }}
                <strong>{{ $t('cruds.user.title_singular') }}</strong>
              </h4>
            </div>
            <div class="card-body">
              <back-button></back-button>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-6">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.name,
                      'is-focused': activeField == 'name'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.user.fields.name')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.name"
                      @input="updateName"
                      @focus="focusField('name')"
                      @blur="clearFocus"
                      required
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.username,
                      'is-focused': activeField == 'username'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.user.fields.username')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.username"
                      @input="updateUsername"
                      @focus="focusField('username')"
                      @blur="clearFocus"
                      required
                    />
                  </div>                  
                </div>
                <div class="col-md-6">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.email,
                      'is-focused': activeField == 'email'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.user.fields.email')
                    }}</label>
                    <input
                      class="form-control"
                      type="email"
                      :value="entry.email"
                      @input="updateEmail"
                      @focus="focusField('email')"
                      @blur="clearFocus"
                      required
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.password,
                      'is-focused': activeField == 'password'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.user.fields.password')
                    }}</label>
                    <input
                      class="form-control"
                      type="password"
                      :value="entry.password"
                      @input="updatePassword"
                      @focus="focusField('password')"
                      @blur="clearFocus"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <table class="table table-bordered" name="inputItem">
                <thead>
                  <th style="width: 40px"></th>
                  <th style="width: 150px">BU</th>
                  <th>Dept</th>
                  <th style="width: 200px">Role</th>
                </thead>
                <tbody>
                  <tr v-for="(buRole, k) in entry.bu_roles" :key="k">
                    <td style="width: 40px" scope="row" class="trashIconContainer">
                        <i class="fa fa-trash-o" @click="deleteRow(k)"></i>
                    </td>
                    <td style="width: 150px">
                      <v-select
                      name="bus"
                      label="code"
                      :key="'bus-field'"
                      :value="buRole.bu_id"
                      :options="lists.bus"
                      :reduce="bu => bu.id"
                      :closeOnSelect="true"
                      @input="updateBu(k, $event)"
                      @change="updateBu(k, $event)"
                    />
                    </td>
                    <td>
                      <v-select
                      name="depts"
                      label="code"
                      :key="'depts-field'"
                      :value="buRole.depts"
                      :reduce="depts => depts.id"
                      :options="buRole.list_depts"
                      :closeOnSelect="true"
                      multiple
                      @input="updateDept(k, $event)"
                    />
                    </td>
                    <td style="width: 200px">
                      <v-select
                      name="roles"
                      label="title"
                      :key="'roles-field'"
                      :value="buRole.role_id"
                      :options="lists.roles"
                      :reduce="role => role.id"
                      :closeOnSelect="true"
                      @input="updateRoles(k, $event)"
                    />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type='button' class="btn btn-sm btn-info" @click="addNewRow">
                  <i class="fa fa-plus-circle"></i>
                  Tambah Item
              </button>
            </div>
            <div class="card-footer">
              <vue-button-spinner
                class="btn-primary"
                :status="status"
                :isLoading="loading"
                :disabled="loading"
              >
                {{ $t('global.save') }}
              </vue-button-spinner>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      status: '',
      activeField: '',
      depts: [],
    }
  },
  computed: {
    ...mapGetters('UsersSingle', ['entry', 'loading', 'lists'])
  },
  mounted() {
    this.fetchCreateData()
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('UsersSingle', [
      'storeData',
      'resetState',
      'setName',
      'setUsername',
      'setEmail',
      'setPassword',
      'setRoles',
      'setBus',
      'setDepts',
      'fetchCreateData',
      'setListDepts',
      'fetchBuDept',
      'addItem',
      'deleteItem'
    ]),
    addNewRow() {
        this.addItem()
    },
    deleteRow(index) {
      console.log(index)
        this.$swal({
        title: 'Hapus Item ini ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        showCloseButton: true,
      }).then(result => {
        if(result.isConfirmed) {
          this.deleteItem(index)
        }
      })
    },
    selectAllBu() {
      this.setBus('all');
    },
    deselectAllBu() {
      this.setBus([]);
      this.setDepts([])
      this.setListDepts([])
    },
    selectAllDept() {
      this.setDepts('all')
    },
    deselectAllDept() {
      this.setDepts([])
    },
    updateName(e) {
      this.setName(e.target.value)
    },
    updateUsername(e) {
      this.setUsername(e.target.value)
    },
    updateEmail(e) {
      this.setEmail(e.target.value)
    },
    updatePassword(e) {
      this.setPassword(e.target.value)
    },
    updateRoles(index, value) {
      this.setRoles({index, value})
    },
    updateBu(index, value) {
      this.setBus({index, value})
      this.setListDepts({index, lists: []})
      this.setDepts({index, value: []})
      this.fetchBuDept({index, value})
    },
    updateDept(index, value) {
      this.setDepts({index, value})
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'users.index' })
          this.$eventHub.$emit('create-success')
        })
        .catch(error => {
          this.status = 'failed'
          _.delay(() => {
            this.status = ''
          }, 3000)
        })
    },
    focusField(name) {
      this.activeField = name
    },
    clearFocus() {
      this.activeField = ''
    }
  }
}
</script>