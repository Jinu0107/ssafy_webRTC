<template>
  <el-dialog
    custom-class="register-dialog"
    title="회원가입"
    v-model="state.dialogVisible"
    @close="handleClose"
  >
    <el-form
      :model="state.form"
      :rules="state.rules"
      ref="registerForm"
      :label-position="state.form.align"
    >
      <el-form-item
        prop="deparment "
        label="소속"
        :label-width="state.formLabelWidth"
      >
        <el-input v-model="state.form.deparment" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="position"
        label="직책"
        :label-width="state.formLabelWidth"
      >
        <el-input v-model="state.form.position" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="name"
        label="이름"
        :label-width="state.formLabelWidth"
      >
        <el-input v-model="state.form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="id"
        label="아이디"
        :label-width="state.formLabelWidth"
      >
        <div>
          <el-input v-model="state.form.id" autocomplete="off"></el-input>
          <el-button v-model="state.form.idCheck" @click="duplicateIdCheck">
            중복체크
          </el-button>
        </div>
      </el-form-item>
      <el-form-item
        prop="password"
        label="비밀번호"
        :label-width="state.formLabelWidth"
      >
        <el-input
          v-model="state.form.password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="checkPassword"
        label="비밀번호확인"
        :label-width="state.formLabelWidth"
      >
        <el-input v-model="state.form.checkPassword" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="clickRegister"
          :disabled="state.btnDisabled || !state.form.idCheck"
          >회원가입</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<style>
.register-dialog {
  width: 400px !important;
  height: auto;
}
.register-dialog .el-dialog__headerbtn {
  float: right;
}
.register-dialog .el-form-item__content {
  margin-left: 0 !important;
  float: right;
  width: 200px;
  display: inline-block;
}
.register-dialog .el-form-item {
  margin-bottom: 20px;
}
.register-dialog .el-form-item__error {
  font-size: 12px;
  color: red;
}
.register-dialog .el-input__suffix {
  display: none;
}
.register-dialog .el-dialog__footer {
  margin: 0 calc(50% - 80px);
  padding-top: 0;
  display: inline-block;
}
.register-dialog .dialog-footer .el-button {
  width: 120px;
}
</style>
<script>
import { reactive, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "register-dialog",

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const store = useStore();
    // 마운드 이후 바인딩 될 예정 - 컨텍스트에 노출시켜야함. <return>
    const registerForm = ref(null);

    /*
      // Element UI Validator
      // rules의 객체 키 값과 form의 객체 키 값이 같아야 매칭되어 적용됨
      //
    */

    let validatorPassed = {
      id: false,
      name: false,
      password: false,
      checkPassword: false,
      duplicateCheckedId: ""
    };

    const validatorNotEssentialData = (rule, value, callback) => {
      if (value.length > 30) {
        state.btnDisabled = true;
        callback(new Error("최대 30자까지 입력 가능합니다."));
      } else {
        callback();
      }
    };

    const validatorId = (rule, value, callback) => {
      if (value === "") {
        state.btnDisabled = true;
        validatorPassed.id = false;
        callback(new Error("필수 입력 항목입니다."));
      } else if (value.length > 16) {
        state.btnDisabled = true;
        validatorPassed.id = false;
        callback(new Error("최대 16자까지 입력 가능합니다."));
      } else if (value.length >= 1 && state.form.idCheck !== true) {
        state.btnDisabled = true;
        validatorPassed.id = false;
        callback(new Error("중복체크를 눌러주세요."));
      } else if (
        validatorPassed.duplicateCheckedId !== value &&
        value.length >= 1 &&
        state.form.id_check
      ) {
        state.btnDisabled = true;
        validatorPassed.id = false;
        callback(new Error("중복체크를 눌러주세요."));
      } else {
        validatorPassed.id = true;
        let targetFields = ["name", "password", "checkPassword"];
        targetFields = targetFields.filter(item => !validatorPassed[item]);
        validateOtherField(targetFields);
        callback();
      }
    };

    const validatorPass = (rule, value, callback) => {
      if (value === "") {
        state.btnDisabled = true;
        validatorPassed.password = false;
        callback(new Error("필수 입력 항목입니다."));
      } else if (value.length < 9) {
        state.btnDisabled = true;
        validatorPassed.password = false;
        callback(new Error("최소 9글자를 입력해야 합니다."));
      } else if (value.length > 16) {
        state.btnDisabled = true;
        validatorPassed.password = false;
        callback(new Error("최대 16글자까지 입력 가능합니다."));
      } else if (
        !String(value).match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,16}$/
        )
      ) {
        state.btnDisabled = true;
        validatorPassed.password = false;
        callback(
          new Error("비밀번호는 영문, 숫자, 특수문자가 조합되어야합니다.")
        );
      } else {
        validatorPassed.password = true;
        let targetFields = ["name", "id", "checkPassword"];
        targetFields = targetFields.filter(item => !validatorPassed[item]);
        validateOtherField(targetFields);
        callback();
      }
    };

    const validatorCheckPass = (rule, value, callback) => {
      if (value === "") {
        validatorPassed.checkPassword = false;
        state.btnDisabled = true;
        callback(new Error("필수 입력 항목입니다."));
      } else if (value.length < 9) {
        validatorPassed.checkPassword = false;
        state.btnDisabled = true;
        callback(new Error("최소 9글자를 입력해야 합니다."));
      } else if (value.length > 16) {
        validatorPassed.checkPassword = false;
        state.btnDisabled = true;
        callback(new Error("최대 16글자까지 입력 가능합니다."));
      } else if (value !== state.form.password) {
        validatorPassed.checkPassword = false;
        state.btnDisabled = true;
        callback(new Error("입력한 비밀번호와 일치하지 않습니다."));
      } else {
        validatorPassed.checkPassword = true;
        let targetFields = ["name", "user_id", "password"];
        targetFields = targetFields.filter(item => !validatorPassed[item]);
        validateOtherField(targetFields);
        callback();
      }
    };

    const duplicateIdCheck = async (rule, value, callback) => {
      console.log("das");
      try {
        let model = {
          id: state.form.id
        };
        const { data } = await store.dispatch("root/requestCheckUserId", model);
        if (data.statusCode === 409) {
          alert("이미 존재하는 아이디 입니다");
        } else {
          alert("사용 가능한 아이디 입니다.");
        }
        state.form.idCheck = true;
        validatorPassed.duplicateCheckedId = state.form.id;
        let targetFields = ["name", "id", "password", "checkPassword"];
        targetFields = targetFields.filter(item => !validatorPassed[item]);
        validateOtherField(targetFields);
      } catch (e) {
        console.error(e);
      }
    };

    const validateOtherField = array => {
      let disableResult = false;
      registerForm.value.validateField(array, message => {
        if (message === "" && state.form.idCheck && !disableResult) {
          disableResult = false;
        } else {
          disableResult = true;
        }
      });
      state.btnDisabled = disableResult;
    };

    const state = reactive({
      form: {
        deparment: "",
        position: "",
        name: "",
        id: "",
        idCheck: false,
        password: "",
        checkPassword: "",
        align: "left"
      },
      rules: {
        deparment: [
          { validator: validatorNotEssentialData, trigger: "change" }
        ],
        position: [{ validator: validatorNotEssentialData, trigger: "change" }],
        name: [{ validator: validatorNotEssentialData, trigger: "change" }],
        id: [{ validator: validatorId, trigger: "change" }],
        password: [{ validator: validatorPass, trigger: "change" }],
        checkPassword: [{ validator: validatorCheckPass, trigger: "change" }]
      },
      btnDisabled: true,
      dialogVisible: computed(() => props.open),
      formLabelWidth: "120px"
    });

    onMounted(() => {
      // console.log(registerForm.value)
    });

    const clickRegister = () => {
      // 회원가입 클릭 시 validate 체크 후 그 결과 값에 따라, 회원가입 API 호출 또는 경고창 표시
      registerForm.value.validate(async valid => {
        if (valid) {
          store.commit("root/setIsLoading", true);
          try {
            let model = {
              id: state.form.id,
              password: state.form.password
            };
            const { data } = await store.dispatch(
              "root/requestRegister",
              model
            );
            alert("회원가입이 완료되었습니다.");
          } catch (e) {
            alert("회원가입에 실패하였습니다.");
          }
          store.commit("root/setIsLoading", false);
        } else {
          alert("Validate error!");
        }
      });
    };

    const handleClose = () => {
      state.form.deparment = "";
      state.form.position = "";
      state.form.name = "";
      state.form.id = "";
      state.form.idCheck = false;
      state.form.password = "";
      state.form.checkPassword = "";
      emit("closeRegisterDialog");
    };

    return {
      registerForm,
      state,
      clickRegister,
      handleClose,
      duplicateIdCheck
    };
  }
};
</script>
