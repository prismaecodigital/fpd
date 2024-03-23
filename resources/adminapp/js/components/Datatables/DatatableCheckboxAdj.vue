<template>
  <div class="form-check">
    <label class="form-check-label">
      <input
        class="form-check-input"
        type="checkbox"
        :checked="row.selected"
        @change="handleCheckboxChange"
      />
      <span class="form-check-sign">
        <span class="check"></span>
      </span>
    </label>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['row','data'],
  methods: {
    ...mapActions({
      toggleSelectFromPeriod: 'AdjustmentsPeriodIndex/toggleSelect',
      toggleSelectFromCoa: 'AdjustmentsCoaIndex/toggleSelect',
      toggleSelectAdditional: 'AdditionalLimitsIndex/toggleSelect',
    }),
  handleCheckboxChange(event) {
      const isChecked = event.target.checked;
      const row = this.data.indexOf(this.row)
      console.log(row)
      if(this.row.type == '1') {
        this.toggleSelectFromPeriod(row)
      }
      if(this.row.type == '2') {
        this.toggleSelectFromCoa(row)
      }
      if(this.row.coa_id) {
        console.log('additional')
        this.toggleSelectAdditional(row)
      }
      console.log(this.row)
      const checkedValues = this.data.filter(row => row.selected);
      this.$emit('change', isChecked); // Emit input event for v-model
      this.$emit('checked-values', checkedValues); // Emit checked-values event
    
    },
  },
}
</script>

<style scoped>
.check {
  opacity: 1 !important;
}

.form-check .form-check-label {
  cursor: default !important;
}
</style>