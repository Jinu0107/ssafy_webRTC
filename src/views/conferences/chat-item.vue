<template>
  <el-row justify="center">
    {{ message }}
    <span class="name" v-if="name != ''">
      {{ name }}
    </span>
  </el-row>
</template>

<script>

export default {
  name: "chat-item",

  props: {
    message: { type: String, default: "" },
    name: { type: String, default: "" }
  },

}
</script>

<style scoped>
.el-row {
  width: 100%;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  word-break: break-all;
  font-size: 12px;
  position: relative;
}

.name {
  position: absolute;
  top: -8px;
  right: 10px;
  background-color: #fff;
  font-weight: bold;
}
</style>
