<template>
  <el-container class="main-wrapper" v-loading.fullscreen.lock="isLoading">
    <main-header
      :height="`70px`"
      @openLoginDialog="onOpenLoginDialog"
      @openRegisterDialog="onOpenRegisterDialog"
    />
    <el-container class="main-container">
      <el-aside class="hide-on-small" width="240px">
        <main-sidebar :width="`240px`" />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <main-footer :height="`110px`" />
  </el-container>
  <login-dialog
    :open="loginDialogOpen"
    @closeLoginDialog="onCloseLoginDialog"
  />
  <register-dialog
    :open="registerDialogOpen"
    @closeRegisterDialog="onCloseRegisterDialog"
  />
  <popup :open="popupVisible" />
</template>
<style>
@import "https://unpkg.com/element-plus/theme-chalk/index.css";
@import "./main.css";
@import "../../common/css/common.css";
@import "../../common/css/element-plus.css";
</style>
<script>
import LoginDialog from "./components/login-dialog";
import RegisterDialog from "./components/register-dialog.vue";
import MainHeader from "./components/main-header";
import MainSidebar from "./components/main-sidebar";
import MainFooter from "./components/main-footer";
import Popup from "./components/popup";

export default {
  name: "Main",
  components: {
    MainHeader,
    MainSidebar,
    MainFooter,
    LoginDialog,
    RegisterDialog,
    Popup
  },
  data() {
    return {
      loginDialogOpen: false,
      registerDialogOpen: false
    };
  },
  mounted() {
    this.$store.commit("root/setIsLoading", false);
  },
  computed: {
    isLoading() {
      return this.$store.getters["root/getIsLoading"];
    },
    popupVisible() {
      return this.$store.getters["root/getPopup"].open;
    }
  },
  beforeCreate() {
    window.STORE = this.$store;
  },
  created() {
    const accessToken = localStorage.accessToken;
    if (accessToken) {
      this.$store.dispatch("root/requestInfo", accessToken);
      this.$store.commit("root/setIsLogin", true);
    } else {
      this.$store.commit("root/setIsLogin", false);
    }
  },
  methods: {
    onOpenLoginDialog() {
      this.loginDialogOpen = true;
    },
    onCloseLoginDialog() {
      this.loginDialogOpen = false;
    },
    onOpenRegisterDialog() {
      this.registerDialogOpen = true;
    },
    onCloseRegisterDialog() {
      this.registerDialogOpen = false;
    }
  }
};
</script>
