<template>
  <div class="container-fluid">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-success card-header-icon">
              <div class="card-icon">
                <i class="material-icons">language</i>
              </div>
              <h4 class="card-title">
                {{ $t('global.dashboard') }}
              </h4>
            </div>
            <br>
            <div class="card-body">
              {{ $t('global.youAreLoggedIn') }}
            </div>
            <div class="card-body">
              <a href="https://drive.google.com/drive/folders/1VWyftVKzPYCqIZJs8RGBedUcQbr32rTn?usp=drive_link" target="_blank">Link Panduan Penggunaan</a>
            </div>
            <div class="card-body">
              Jika Anda menemui kendala dalam penggunaan aplikasi, hubungi Ibu Dian Finance Prisma
            </div>
            <div class="card-body">
              Jika Anda menemui error, tekan Ctrl+F5. Jika masih error, hubungi Digitalisasi Prisma
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>