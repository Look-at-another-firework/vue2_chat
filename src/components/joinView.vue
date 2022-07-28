<template>
  <div class="join">{{ friends }}加入了聊天室</div>
</template>

<script>
export default {
  props: ['friends']
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
