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
                <strong>{{ $t('cruds.cash-out-projection.title_singular') }} {{this.selected_bu.code}}</strong>
              </h4>
            </div>
            <div class="card-header card-header-primary card-header-icon">
              <h4 class="card-title">
                <br><br>
                Upload XLSX : <input type="file" @change="handleFileUpload" />
              </h4>
              <input type="text" :value="entry.bu_id" hidden>
            </div>
            <div class="card-body">
              <bootstrap-alert />
              <table class="table table-bordered" name="inputItem">
                <thead>
                  <th></th>
                  <th>Date</th>
                  <th>COA</th>
                  <th>Nama</th>
                  <th>Projection </th>
                  <th>Dept</th>
                </thead>
                <tbody>
                  <tr v-for="(item, k) in entry.items" :key="k">
                    <td scope="row" class="trashIconContainer">
                        <i class="fa fa-trash-o" @click="deleteRow(k)"></i>
                    </td>
                    <td><vue-monthly-picker
                      input-class="form-control"
                      :value="item.date_label"
                      @input="updateDate(k, $event)"
                      :month-labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
                      date-format="MMM yyyy">
                    </vue-monthly-picker></td>
                    <td>
                    <v-select
                      name="coa"
                      label="code"
                      :key="'coa-field'"
                      :value="item.coa_id"
                      :options="lists.coa"
                      :reduce="coa => coa.id"
                      disabled
                    >
                    </v-select>
                    
                    </td>
                    <td>
                    <v-select
                      name="coa"
                      label="name"
                      :key="'coa-field'"
                      :value="item.coa_id"
                      :options="lists.coa"
                      :reduce="coa => coa.id"
                      @input="updateCoa(k, $event)"
                    >
                      <template #search="{attributes, events}">
                        <input
                          class="vs__search"
                          :required="!item.coa_id"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </v-select>
                    </td>
                    <td>
                        Rp. <input class="inputRp wrapText required" type="number" :value="item.projection_amount" @input="updateProjectionAmount(k, $event)" required/>
                    </td>
                    <td>
                    <v-select
                      name="dept"
                      label="code"
                      :key="'dept-field'"
                      :value="item.dept_id"
                      :options="lists.dept"
                      :reduce="dept => dept.id"
                      @input="updateDept(k, $event)"
                    />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type='button' class="btn btn-sm btn-dark" @click="addNewRow">
                  <i class="fa fa-plus-circle"></i>
                  Tambah Item
              </button>
            </div>
            <div class="card-footer">
              <vue-button-spinner
                class="btn-sm btn-primary"
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
import BootstrapAlert from '../../components/BootstrapAlert.vue'
import { read, utils } from 'xlsx';


export default {
  components: { BootstrapAlert },
  data() {
    return {
      status: '',
      activeField: '',
      query: { bu_id: null },
    }
  },
  computed: {
    ...mapGetters('CashOutProjectionsSingle', ['entry', 'loading', 'lists']),
    ...mapGetters('AuthBu', ['selected_bu']),
    updatedQuery() {
      return {
        ...this.query,
        bu_id: this.selected_bu.id,
      };
    },
  },
  mounted() {
    // Set the query.id when the component is mounted
    this.query.bu_id = this.selected_bu.id;
  },
  watch: {
    selected_bu(newSelectedBu) {
      // React to changes in selected_bu
      this.query.bu_id = newSelectedBu.id;
    },
    query: {
      handler(query) {
        this.setQuery(query)
        this.fetchCreateData()
        this.resetState()
      },
      deep: true
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  methods: {
    ...mapActions('CashOutProjectionsSingle', [
      'storeData',
      'resetState',
      'setCoa', 'setDate',
      'setProjectionAmount',
      'setBu',
      'setDept',
      'fetchCreateData', 'addItem', 'deleteItem', 'setQuery', 'setEntry'
    ]),
    updateCoa(index, value) {
      this.setCoa({index, value})
    },
    updateDate(index, value) {
      console.log(value)
      this.setDate({index, value})
    },
    updateProjectionAmount(index, e) {
      this.setProjectionAmount({index, value: e.target.value})
    },
    updateDept(index, value) {
      this.setDept({index, value})
    },
    updateBu(value) {
      this.setBu(value)
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$router.push({ name: 'cash-out-projections.index' })
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
    },
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
    updateExcelCoa(index, value) {
      const item = this.lists.coa.find((obj) => obj.code === value);
      this.setCoa({index, value: item.id})
      // imported from excel
    },
    updateExcelProjection(index, value) {
      this.setProjectionAmount({index, value})
      // imported from excel
    },
    updateExcelDate(index, value) {
      console.log(value)
      this.setDate({index, value})
      // imported from excel
    },
    updateExcelDept(index, value) {
      const item = this.lists.dept.find((obj) => obj.code === value);
      this.setDept({index, value: item.id})
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.readExcelFile(file);
      }
    },
    readExcelFile(file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = utils.sheet_to_json(worksheet, {raw: false });
        const rowExcel = excelData.filter(obj => obj.hasOwnProperty('coa_code'));
        console.log(rowExcel)
        // Process the excelData and add new rows based on the 'qty' column
        for (let i = 0; i < rowExcel.length; i++) {
          const rowData = rowExcel[i];
          if(rowData.coa_code !== undefined) {
              if(i !== 0) {
                this.addItem()
              }
              console.log(rowData)
              this.updateExcelCoa(i, rowData.coa_code)
              this.updateExcelProjection(i, rowData.projection)
              this.updateExcelDate(i, rowData.period)
              this.updateExcelDept(i, rowData.dept)
          }
        }
      };

      reader.readAsBinaryString(file);
    },
  }
}
</script>