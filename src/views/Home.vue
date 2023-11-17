<template>
    <div class="dashboard">
        <el-button
            type="primary"
            class="bank-button"
            @click="openAccountVisible = true"
        >
            开户
        </el-button>
        <el-dialog v-model="openAccountVisible" title="开户">
            <el-form
                :model="openAccountForm"
                :rules="openRules"
                ref="openAccountForm"
            >
                <el-form-item
                    label="客户名称"
                    :label-width="formLabelWidth"
                    prop="customerName"
                >
                    <el-input
                        v-model="openAccountForm.customerName"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                    label="证件类型"
                    :label-width="formLabelWidth"
                    prop="documentType"
                >
                    <el-select
                        v-model="openAccountForm.documentType"
                        placeholder="请选择证件类型"
                    >
                        <el-option label="身份证" value="0" />
                        <el-option label="驾驶证" value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="证件号码"
                    :label-width="formLabelWidth"
                    prop="identityNumber"
                >
                    <el-input
                        v-model="openAccountForm.identityNumber"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                    label="账号"
                    :label-width="formLabelWidth"
                    prop="accountName"
                >
                    <el-input
                        v-model="openAccountForm.accountName"
                        placeholder="不输入则有系统自动生成"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                    label="密码"
                    :label-width="formLabelWidth"
                    prop="accountPassword"
                >
                    <el-input
                        v-model="openAccountForm.accountPassword"
                        autocomplete="off"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="openAccountVisible = false"
                        >取消</el-button
                    >
                    <el-button type="primary" @click="confirmOperation">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-button
            type="primary"
            class="bank-button"
            @click="closeAccountVisible = true"
        >
            销户
        </el-button>
        <el-dialog v-model="closeAccountVisible" title="开户">
            <el-form
                :model="closeAccountForm"
                :rules="closeRules"
                ref="closeAccountForm"
            >
                <el-form-item
                    label="账号"
                    :label-width="formLabelWidth"
                    prop="accountName"
                >
                    <el-input
                        v-model="closeAccountForm.accountName"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                    label="密码"
                    :label-width="formLabelWidth"
                    prop="accountPassword"
                >
                    <el-input
                        v-model="closeAccountForm.accountPassword"
                        autocomplete="off"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeAccountVisible = false"
                        >取消</el-button
                    >
                    <el-button type="primary" @click="closeConfirmOperation">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <button class="bank-button">转账</button>
        <button class="bank-button">账户信息查询</button>
        <button class="bank-button">交易明细查询</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Dashboard",
    data() {
        return {
            openAccountVisible: false,
            closeAccountVisible: false,
            formLabelWidth: "140px",
            openAccountForm: {
                accountName: "",
                customerName: "",
                documentType: "",
                identityNumber: "",
                accountPassword: "",
            },
            closeAccountForm: {
                accountName: "",
                accountPassword: "",
            },
            openRules: {
                customerName: [
                    {
                        required: true,
                        message: "请输入客户名称",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "名称长度在3-5之间",
                        trigger: "blur",
                    },
                ],
                documentType: [
                    {
                        required: true,
                        message: "请输入证件类型",
                        trigger: "blur",
                    },
                ],
                identityNumber: [
                    {
                        required: true,
                        message: "请输入证件号码",
                        trigger: "blur",
                    },
                ],
                accountPassword: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 6,
                        message: "密码必须6位",
                        trigger: "blur",
                    },
                ],
            },
            closeRules: {
                accountName: [
                    {
                        required: true,
                        message: "请输入账号（卡号）",
                        trigger: "blur",
                    },
                ],
                accountPassword: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 6,
                        message: "密码必须6位",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        confirmOperation() {
            var that = this;
            this.$refs.openAccountForm.validate((valid) => {
                if (!valid) {
                    this.$message.error("请调整数据后再请求");
                    return false;
                } else {
                    var f = new FormData();
                    f.append(
                        "accountName",
                        this.openAccountForm["accountName"]
                    );
                    f.append(
                        "customerName",
                        this.openAccountForm["customerName"]
                    );
                    f.append(
                        "documentType",
                        this.openAccountForm["documentType"]
                    );
                    f.append(
                        "identityNumber",
                        this.openAccountForm["identityNumber"]
                    );
                    f.append(
                        "accountPassword",
                        this.openAccountForm["accountPassword"]
                    );
                    f.append("userId", this.$store.state.userId);
                    axios
                        .post("/api/account/open", f)
                        .then(function (response) {
                            console.log(response);
                            if (response.data.status == 0) {
                                that.$message.success("开户成功");
                                that.openAccountVisible = false;
                            } else if (response.data.status == 1) {
                                that.$message.error("该 证件号码 已注册");
                            } else if (response.data.status == 2) {
                                that.$message.error("该 账号 已注册");
                            } else if (response.data.status == 3) {
                                that.$message.error(
                                    "该 证件号码 和 账号 均已注册"
                                );
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
        },
        closeConfirmOperation() {
            var that = this;
            this.$refs.closeAccountForm.validate((valid) => {
                if (!valid) {
                    this.$message.error("请调整数据后再请求");
                    return false;
                } else {
                    var f = new FormData();
                    f.append(
                        "accountName",
                        this.closeAccountForm["accountName"]
                    );
                    f.append(
                        "accountPassword",
                        this.closeAccountForm["accountPassword"]
                    );
                    axios
                        .post("/api/account/close", f)
                        .then(function (response) {
                            console.log(response);
                            if (response.data.status == 1) {
                                that.$message.success("销户成功");
                                that.openAccountVisible = false;
                            } else if (response.data.status == 2) {
                                that.$message.error("账号 或 密码 错误");
                            } else {
                                that.$message.error("后端错误");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
        },
    },
};
</script>

<style>
.dashboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 50vw;
    background-color: #f5f5f5;
}

.bank-button {
    background-color: #0056b3;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px 30px;
    margin: 18px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

.bank-button:hover {
    background-color: #003d7a;
    transform: translateY(-2px);
}
</style>
