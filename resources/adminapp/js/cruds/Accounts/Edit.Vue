<template>
  <div class="container-fluid">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-primary card-header-icon">
              <div class="card-icon">
                <i class="material-icons">edit</i>
              </div>
              <h4 class="card-title">
                {{ $t('global.edit') }}
                <strong>{{ $t('cruds.account.title_singular') }}</strong>
              </h4>
            </div>
            <div class="card-body">
              <back-button></back-button>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <div class="row">
                <div class="col-md-12">
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.code,
                      'is-focused': activeField == 'code'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.account.fields.code')
                    }}</label>
                    <input
                      class="form-control"
                      type="text"
                      :value="entry.code"
                      @input="updateCode"
                      @focus="focusField('code')"
                      @blur="clearFocus"
                      required
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.name,
                      'is-focused': activeField == 'name'
                    }"
                  >
                    <label class="bmd-label-floating required">{{
                      $t('cruds.account.fields.name')
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
                      'is-filled': entry.bu_id !== null,
                      'is-focused': activeField == 'bu'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.account.fields.bu')
                    }}</label>
                    <v-select
                      name="bu"
                      label="name"
                      :key="'bu-field'"
                      :value="entry.bu_id"
                      :options="lists.bu"
                      :reduce="entry => entry.id"
                      @input="updateBu"
                      disabled

                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.parent_id !== null,
                      'is-focused': activeField == 'parent'
                    }"
                  >
                    <label class="required">{{
                      $t('cruds.account.fields.parent')
                    }}</label>
                    <v-select
                      name="parent"
                      label="name"
                      :key="'parent-field'"
                      :value="entry.parent_id"
                      :options="lists.parent"
                      :reduce="entry => entry.id"
                      @input="updateParent"
                      @search.focus="focusField('parent')"
                      @search.blur="clearFocus"
                      :null-option="true"
                    />
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.depts.length !== 0,
                      'is-focused': activeField == 'depts'
                    }"
                  >
                    <label class="">{{
                      $t('cruds.account.fields.dept')
                    }}</label>
                    <v-select
                      name="depts"
                      label="name"
                      :key="'depts-field'"
                      :value="entry.depts"
                      :options="lists.depts"
                      :closeOnSelect="false"
                      multiple
                      @input="updateDept"
                      @search.focus="focusField('depts')"
                      @search.blur="clearFocus"
                    />
                    <span class="select-all badge" @click="selectAllDept">Pilih Semua</span>
                    <span class="select-all badge" @click="deselectAllDept">Batalkan pilihan</span>
                  </div>
                  <div
                    class="form-group bmd-form-group"
                    :class="{
                      'is-filled': entry.projection_lock !== null,
                      'is-focused': activeField == 'projection_lock'
                    }"
                  >
                  <input
                      type="checkbox"
                      :checked="entry.projection_lock" @change="updateProjectionLock"
                    />
                    <label class="">Kunci Pembatasan Anggaran ( Balance tidak bisa Minus )</label>
                  </div>
                </div>
              </div>
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
      activeField: ''
    }
  },
  computed: {
    ...mapGetters('AccountsSingle', ['entry', 'loading', 'lists'])
  },
  beforeDestroy() {
    this.resetState()
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.resetState()
        this.fetchEditData(this.$route.params.id)
      }
    }
  },
  methods: {
    ...mapActions('AccountsSingle', [
      'fetchEditData',
      'updateData',
      'resetState',
      'setCode',
      'setName',
      'setBu',
      'setDept',
      'setParent',
      'setProjectionLock'
    ]),
    selectAllDept() {
      this.setDept('all')
    },
    deselectAllDept() {
      this.setDept([])
    },
    updateCode(e) {
      this.setCode(e.target.value)
    },
    updateName(e) {
      this.setName(e.target.value)
    },
    updateBu(value) {
      this.setBu(value)
    },
    updateProjectionLock() {
      this.setProjectionLock()
    },
    updateDept(value) {
      this.setDept(value)
    },
    updateParent(value) {
      this.setParent(value)
    },
    submitForm() {
      this.updateData()
        .then(() => {
          this.$router.push({ name: 'accounts.index', query: { id: this.entry.bu_id } });
          this.$eventHub.$emit('update-success')
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