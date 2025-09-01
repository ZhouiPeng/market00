<script lang="js">
    export default {
        props: ['sender', 'acceptor' ,'messageList'],
        methods: {
            isSender(name) {
                return name === this.sender.name
            }
        }
    }
</script>
<template>
    <ul class="dialogPane">
        <li v-for="(message,index) in messageList" :key="index" :class="{ messageEntry: true }">
            <div v-if="isSender(message.name)" class="senderType">
                <div class="messagePop">{{ message.message }}</div>
                <div class="avator"><el-button circle><el-avatar size="default" :src="sender.avatarUrl"/></el-button></div>
            </div>
            <div v-else class="acceptorType">
                <div class="avator"><el-button circle><el-avatar el-avatar size="default" :src="acceptor.avatarUrl"/></el-button></div>
                <div class="messagePop">{{ message.message }}</div>
            </div>
        </li>
    </ul>
</template>
<style lang="css" scoped>
    .dialogPane {
        padding:0;
        margin: 0;
        width: 100%;
        height: 100%;
    }
    .messageEntry {
        box-sizing: border-box;
        min-height: 10%;
        width:100%;
        display:flex;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
    }
    .senderType {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width:100%;
    }
    .acceptorType {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .avatar .el-avatar {
        box-shadow: var(--el-box-shadow-lighter);
    }
    .messagePop {
        margin-left: 10px;
        margin-right: 10px;
        border: 1px solid var(--el-border-color);
        border-radius: 20px;
        height:100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        box-shadow: var(--el-box-shadow-lighter);
    }
</style>