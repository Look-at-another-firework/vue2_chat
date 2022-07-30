<template>
  <div class="join" v-if="friends">{{ friends }}</div>
  <div class="join" v-else>{{ live }}！</div>
</template>

<script>
export default {
  props: ['friends', 'live']
}
</script>

<style lang="less" scoped>
.join {
  height: 15px;
  text-align: center;
  padding: 20px 0;
  color: #999;
  font-size: 14px;
}
</style>
