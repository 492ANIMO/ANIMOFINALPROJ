<template>
<div>
    <Navbar/>
</div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'index',
  components: {
    Navbar,
  }
}
</script>
<style scoped>
::v-deep ul {
    border-radius: 0px 0px 8px 8px;
}
</style>