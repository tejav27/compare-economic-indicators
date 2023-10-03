<template>
  <v-card style="width: 100vw;">
    <div class="promo-message">
      <p><strong class="text-center">History meets finance!</strong></p>
    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
      <p>&copy; {{ new Date().getFullYear() }} — <strong>Tejaswi</strong></p>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style scoped>
    .promo-message{
        background-color: grey;
        display: flex;
        justify-content: center;
        padding: 0.2rem;
        width: 100%;
        color: #fff;
    }
</style>
