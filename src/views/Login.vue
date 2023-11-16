<template>
    <div class="login-container">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="username">用户名:</label>
                <input
                    type="text"
                    id="username"
                    v-model="loginForm.username"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password">密码:</label>
                <input
                    type="password"
                    id="password"
                    v-model="loginForm.password"
                    required
                />
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        submitForm() {
            // 在这里处理登录逻辑，例如发送请求到服务器
            console.log("登录信息:", this.loginForm);
            // 发送登录信息到服务器...
            this.$router.push('/home');
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

form {
    display: flex;
    flex-direction: column;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #0056b3;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #003d7a;
}
</style>
