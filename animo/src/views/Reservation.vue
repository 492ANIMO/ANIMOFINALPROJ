<template>
<div>
    <Navbar/>
    <div style="padding-top:52px">
        <NavbarSide/>
    </div>
</div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import NavbarSide from '@/components/NavbarSide.vue'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    NavbarSide
  }
}
</script>