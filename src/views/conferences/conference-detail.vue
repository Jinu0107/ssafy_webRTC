<template>
  <el-container>
    <el-row class="conference-header" justify="space-between">
      <el-row>
        <img class="thumbnail" src="/img/ssafy-logo.74eec4f3.png" alt="" />
        <el-row align="middle" class="title"> 컨퍼런스 제목입니다 </el-row>
      </el-row>
      <el-row class="start-time"> 시작 시간 </el-row>
    </el-row>
    <el-row class="conference-contents">
      <el-row class="user-container" justify="space-around">
        <user-item v-for="i in 4" :key="i" />
      </el-row>
      <div class="chat-container">
        <div class="chat-list">
          <chat-item
            v-for="(chat, index) in state.chatList"
            :key="index"
            :message="chat.message"
            :name="chat.name"
          />
        </div>
        <el-row justify="center" class="input-box">
          <input type="text" placeholder="메시지 전송" />
          <el-button type="primary">
            <i class="el-icon-s-promotion" />
            전송
          </el-button>
        </el-row>
      </div>
    </el-row>
    <div class="conference-description">
      설명입니다 설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
      설명입니다 설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
      설명입니다 설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
      설명입니다 설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
      설명입니다 설명입니다 설명입니다 설명입니다 설명입니다 설명입니다
      설명입니다 설명입니다
    </div>
  </el-container>
</template>
<style scoped>
.el-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 10px 30px;
}

.conference-header {
  margin-bottom: 40px;
}

.thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.title {
  font-size: 20px;
  margin-left: 10px;
}
.start-time {
  font-size: 14px;
}

.user-container {
  width: calc(100% - 265px);
}

.chat-container {
  width: 260px;
  border: 1px solid #ddd;
  height: 700px;
}

.chat-list {
  width: 100%;
  height: 92%;
  overflow-y: scroll;
}

.input-box {
  margin-top: 10px;
}

.input-box > input {
  border: 1px solid #ddd;
  padding: 0px 5px;
}

.conference-description {
  margin-top: 20px;
  width: 100%;
  text-align: left;
}

@media (max-width: 1269px) {
  .el-container {
    padding: 0;
  }
  .conference-header {
    display: none;
  }
  .user-container {
    width: 100%;
  }
}
</style>
<script>
import { reactive, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import userItem from "./user-item.vue"
import chatItem from "./chat-item.vue"

export default {
  name: 'conference-detail',

  components: {
    userItem,
    chatItem
  },

  setup() {
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      conferenceId: '',
      chatList: [
        { name: '', message: '안진우 님이 접속하셨습니다.' },
        { name: '', message: '최승민 님이 접속하셨습니다.' },
        { name: '', message: '정재성 님이 접속하셨습니다.' },
        { name: '안진우', message: 'ㅎㅇㅎㅇ?' },
        { name: '최승민', message: '안녕하세요' },
      ]
    })

    // 페이지 진입시 불리는 훅
    onMounted(() => {
      state.conferenceId = route.params.conferenceId
      store.commit('root/setMenuActiveMenuName', 'home')
    })

    // 페이지 이탈시 불리는 훅
    onUnmounted(() => {
      state.conferenceId = ''
    })

    return { state }
  }
}
</script>
