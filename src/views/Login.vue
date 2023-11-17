<template>
    <div class="login-container">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="username">用户名:</label>
                <el-input
                    type="text"
                    id="username"
                    v-model="loginForm.username"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password">密码:</label>
                <el-input
                    type="password"
                    id="password"
                    v-model="loginForm.password"
                    required
                />
                <p v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </p>
            </div>
            <el-button type="primary" @click="submitForm">登录</el-button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            errorMessage: "",
        };
    },
    methods: {
        isValidPassword(password) {
            const regex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
            return regex.test(password);
        },
        submitForm() {
            var that = this;
            if (this.isValidPassword(this.loginForm.password)) {
                axios
                    .get("/api/user/login", {
                        params: {
                            userName: this.loginForm.username,
                            password: this.loginForm.password,
                        },
                    })
                    .then(function (response) {
                        if (response.data.status == 1) {
                            that.$store.commit("login", response.data.userId);
                            that.$router.push("/home");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .finally(function () {
                        // 总是会执行
                    });
            } else {
                this.errorMessage =
                    "密码必须包含数字、大小写字母和特殊字符，并且长度不少于10位。";
            }
        },
    },
};
</script>

<style>
.login-container {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: white;
}

.form-group {
    margin-bottom: 20px;
}

.error-message {
    color: #d32f2f;
    background-color: #ffebee;
    border: 1px solid #d32f2f;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    font-weight: bold;
}
</style>
