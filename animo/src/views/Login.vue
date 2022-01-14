<template>
    <HelloWorld/>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Login',
  components: {
    HelloWorld
  },
  data:() => ({
    value: ''
})
}
</script>