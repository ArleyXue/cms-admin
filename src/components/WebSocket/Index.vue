<template>

</template>

<script>

    import constants from '@/utils/constants'

    export default {
        props: {
            userName: {
                required: true,
                type: String
            }
        },

        created() {
            this._websocket();
        },

        methods: {
            _websocket () {
                let BASE_URL = constants.BASE_URL;
                BASE_URL = BASE_URL.replace("http", "ws");
                let ws = new WebSocket(BASE_URL + '/websocket/' + this.userName);
                ws.onopen = () => {
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    // ws.send('Holle');
                    console.log('数据发送中...')
                };
                ws.onmessage = evt => {
                    console.log('数据已接收...');
                    let data = JSON.parse(evt.data);
                    this.$emit('receiveMassage', data)
                };
                ws.onclose = function () {
                    // 关闭 websocket
                    console.log('连接已关闭...')
                };
                // 组件销毁时调用，中断websocket链接
                this.over = () => {
                    ws.close()
                }
            }
        },

        beforeDestroy () {
            this.over()
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
