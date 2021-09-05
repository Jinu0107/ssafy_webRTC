<template>
  <div class="user-item">
    <div class="title">참여자 이름(참여자 아이디)</div>
    <video
      src=""
      class="video"
    ></video>
  </div>
</template>

<script>
export default {
  name: 'user-item'

}
</script>

<style scoped>
.user-item {
  width: 47%;
  margin-top: 20px;
}

@media (max-width: 950px) {
  .user-item {
    width: 90%;
  }

  .title {
    display: none;
  }
}

.title {
  font-size: 18px;
  width: 100%;
  height: 30px;
}

.video {
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  border: 1px solid #ddd;
}
</style>
