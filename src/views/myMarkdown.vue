<template>
  <div id="my-markdown" class="markdown-body">
    <vue-markdown
      source="# vue2_chat聊天
  点击链接分享彼此快乐：[happy](https://vdse.bdstatic.com//192d9a98d782d9c74c96f09db9378d93.mp4)
"
    ></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown
  }
}
</script>

<style>
@import '../assets/css/github-markdown.css';
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 40px;
}
</style>
