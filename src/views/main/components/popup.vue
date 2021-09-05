<template>
  <el-dialog
    custom-class="popup"
    :title="state.popup.title"
    v-model="state.popup.open"
    @close="handleClose"
  >
    <span>{{ state.popup.message }}</span>
    <template #footer>
      <span class="popup-footer">
        <el-button type="primary" @click="handleClose">확인</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "popup",

  setup() {
    const store = useStore();
    const state = reactive({
      popup: computed(() => store.getters["root/getPopup"])
    });

    const handleClose = () => {
      store.commit("root/setPopup", { open: false, message: "" });
    };

    return { state, handleClose };
  }
};
</script>

<style></style>
