<template>
  <div id="app">
    <ul ref="messages" class="messages"></ul>
    <Editor :memberList="memberList" @send-file="sendFile" @send-message="sendMsg"/>
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import twemoji from 'twemoji'

export default {
  name: 'app',
  data() {
    return {
      memberList: [
        { name: '张三', id: 'zhangsan', selected: false },
        { name: '李四', id: 'lisi', selected: false },
        { name: '王五', id: 'wangwu', selected: false },
        { name: '赵六', id: 'zhaoliu', selected: false },
        { name: '张三四', id: 'zhangsansi', selected: false },
        { name: '李四五', id: 'lisiwu', selected: false },
        { name: '王五六', id: 'wangwuliu', selected: false },
      ],
    }
  },
  methods: {
    sendFile(file) {
      console.log(file)
    },
    sendMsg(childNodes, innerHTML) {
      console.log(childNodes)
      const el = this.$refs.messages
      const div = document.createElement('div')
      div.innerHTML = twemoji.parse(innerHTML)
      el.appendChild(div)
    },
  },
  components: {
    Editor,
  },
}
</script>
<style lang="stylus">
* {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .messages {
    flex: 1;
  }

  .emoji {
    width: 32px;
    height: 32px;
  }
}
</style>
