<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      notificationSettings: {
        type: 'success',
        delay: 2000,
        placement: {
          from: 'top',
          align: 'center'
        }
      }
    }
  },
  created() {
    this.$eventHub.$on('create-success', this.itemCreated)
    this.$eventHub.$on('update-success', this.itemUpdated)
    this.$eventHub.$on('delete-success', this.itemDeleted)
    this.$eventHub.$on('approve-success', this.itemApproved)
    this.$eventHub.$on('journal-failed', this.journalFailed)
    this.$eventHub.$on('no-check', this.noCheck)
  },
  methods: {
    itemCreated() {
      this.$jquery.notify(
        {
          icon: 'check',
          message: this.$i18n.t('global.create_success')
        },
        this.notificationSettings
      )
    },
    itemUpdated() {
      this.$jquery.notify(
        {
          icon: 'check',
          message: this.$i18n.t('global.update_success')
        },
        { ...this.notificationSettings, type: 'primary' }
      )
    },
    itemDeleted() {
      this.$jquery.notify(
        {
          icon: 'check',
          message: this.$i18n.t('global.delete_success')
        },
        { ...this.notificationSettings, type: 'warning' }
      )
    },
    itemApproved() {
      this.$jquery.notify(
        {
          icon: 'check',
          message: this.$i18n.t('global.approve_success')
        },
        { ...this.notificationSettings, type: 'primary' }
      )
    },
    journalFailed() {
      this.$jquery.notify(
        {
          icon: 'cross',
          message: this.$i18n.t('Item ini sudah dijurnal')
        },
        { ...this.notificationSettings, type: 'primary' }
      )
    },
    noCheck() {
      this.$jquery.notify(
        {
          icon: 'cross',
          message: this.$i18n.t('Tidak ada yang dipilih')
        },
        { ...this.notificationSettings, type: 'primary' }
      )
    },
  },
  watch: {
    $route: {
      handler() {
        axios.get('abilities').then(response => {
          this.$ability.update([
            { subject: 'all', actions: response.data.data }
          ])
        })
      },
      immediate: true
    }
  }
}
</script>