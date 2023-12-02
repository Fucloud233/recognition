<template>
    <el-container style="height: 100%">
        <el-header>
            <el-menu mode="horizontal" background-color="#005E27">
                <el-menu-item :ellipsis="false"> <img style="width: 140px" :src="logoImage" /> </el-menu-item>
            </el-menu>
        </el-header>

        <!-- main -->
        <el-main>
            <div class="container">
                <div class="home-page" v-show="!isPhotoing">
                    <div style="margin-bottom: 20px">
                        <h1 class="title">便携式实施智能</h1>
                        <h1 class="title">排汗检测系统</h1>
                    </div>
                    <el-button class="button" color="green" v-on:click="getCompetence">拍照检测</el-button>
                    <el-button class="button" style="margin: 20px" color="green">系统介绍</el-button>
                </div>

                <div class="photo-page" v-show="this.isPhotoing">
                    <div class="border" v-if="!hasPhotoed">
                        <video ref="video" id="camera"></video>
                        <canvas ref="canvas" style="display: none" :width="this.videoWidth" :height="this.videoHeight" id="canvasCamera"></canvas>
                    </div>
                    <div class="border" v-if="hasPhotoed">
                        <el-image id="recognition-result" :fit="contain" :src="this.recognizedPhotoUrl"></el-image>
                    </div>
                    <div class="operation-container">
                        <el-button class="back-button" v-on:click="handleBack" circle>
                            <el-icon><ArrowLeft /></el-icon>
                        </el-button>
                        <el-button class="photo-button" v-on:click="handlePhoto" color="green" circle>
                            <el-icon><Select /> </el-icon>
                        </el-button>
                    </div>
                </div>
            </div>
        </el-main>
        <el-footer>
            <span class="comment">v1.0.0 made by xxx</span>
        </el-footer>
    </el-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { recognize, check } from '@/api.js'
// eslint-disable-next-line no-unused-vars
import { Select, ArrowLeft } from '@element-plus/icons-vue'

export default {
    data() {
        return {
            pictureUrl: '',
            logoImage: require('@/assets/logo.png'),
            // isPhotoing: true,
            isPhotoing: false,
            hasPhotoed: false,
            recognizedPhotoUrl: null,
            videoWidth: 300,
            videoHeight: 400
        }
    },
    components: {
        Select,
        ArrowLeft
    },
    methods: {
        // https://blog.csdn.net/m0_72196169/article/details/134451422
        // eslint-disable-next-line no-unused-vars
        async handlePhoto() {
            const video = this.$refs.video
            const canvas = this.$refs.canvas
            const context = canvas.getContext('2d')

            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            const dataUrl = canvas.toDataURL('image/jpeg')

            let result = await recognize(dataUrl)
            if (!result.flag) {
                this.isPhotoing = false
                alert(result.data)
                return
            }

            this.recognizedPhotoUrl = result.data
            this.hasPhotoed = true
        },
        async handleTest() {
            let result = await check()
            if (!result.flag) {
                alert(result.data)
            }

            const blobUrl = window.URL.createObjectURL(new Blob([result.data], { type: 'image/jpeg' }))
            this.recognizedPhotoUrl = blobUrl
            this.hasPhotoed = true
        },
        handleBack() {
            this.isPhotoing = false
            this.hasPhotoed = false
        },
        getCompetence() {
            var video = this.$refs.video

            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert('摄像头不可用')
                return
            }

            var constraints = {
                audio: false,
                video: {
                    facingMode: { exact: 'environment' },
                    // reverse width and height will be ok
                    width: this.videoHeight,
                    height: this.videoWidth,
                    transform: 'scaleX(-1)'
                }
            }

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(function (stream) {
                    if ('srcObject' in video) {
                        video.srcObject = stream
                    } else {
                        video = window.URL.createObjectURL(stream)
                    }

                    video.onloadedmetadata = function () {
                        video.play()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            this.isPhotoing = true
        }
    }
}
</script>

<style scoped>
.el-header {
    padding: 0;
}
.el-main {
    display: flex;
    justify-content: center;
    background: #dcdfe6;
}
.button {
    flex: 1;
    height: 200px;
    margin: 0 20px;
    padding: 5px;

    font-size: 18px;
}
.container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 50px 15px 0px 15px;

    margin: 10px 0;
    max-width: 80%;
    width: 700px;
    /* height: 300px; */
    border-radius: 5px;
    background: white;
}
.home-page {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    max-height: 00px;
}
.title {
    font-size: 28px;
    text-align: center;
    margin: 0;
}
.photo-page {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    width: 100%;
    max-height: 70%;
    height: 900px;
}
#camera {
    flex: 1;
    background-color: black;
    width: 100%;
}
#recognition-result {
    flex: 1;
}
.operation-container {
    display: flex;
    align-items: center;
    justify-content: space-around;

    /* margin: 0 10%; */
    width: 90%;
    padding: 10px;
    /* background: green; */
}

.el-footer {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    justify-self: center;
    height: 5%;
    background-color: #dcdfe6;
}
.comment {
    color: grey;
    text-align: center;
}
.border {
    display: flex;
    border: 3px solid green;
    padding: 0;
}
</style>
