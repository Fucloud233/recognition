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
                    <div class="photo-container">
                        <video ref="video" id="videoCamera" v-if="!hasPhotoed"></video>
                        <canvas ref="canvas" style="display: none" id="canvasCamera"></canvas>
                        <el-image :src="this.recognizedPhoto" v-if="hasPhotoed"></el-image>
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
import { recognize } from '@/api.js'
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
            recognizedPhoto: null,
            videoWidth: 256,
            videoHeight: 192
        }
    },
    components: {
        Select,
        ArrowLeft
    },
    methods: {
        // https://blog.csdn.net/m0_72196169/article/details/134451422
        // eslint-disable-next-line no-unused-vars
        handlePhoto() {
            const video = this.$refs.video
            const canvas = this.$refs.canvas
            const context = canvas.getContext('2d')

            context.drawImage(video, 0, 0, this.videoWidth, this.videoHeight)
            // eslint-disable-next-line no-unused-vars
            const dataUrl = canvas.toDataURL('image/jpeg')

            // eslint-disable-next-line no-unused-vars
            var result,
                // eslint-disable-next-line no-unused-vars
                flag = recognize(dataUrl)
            this.hasPhotoed = true
            this.recognizedPhoto = result

            if (flag) {
                console.log('ok')
            }
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
                    // facingMode: { exact: 'environment' },
                    width: this.videoWidth,
                    height: this.videoHeight,
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

#videoCamera {
    flex: 1;
    width: 100%;
    border: 5px solid green;
    margin-bottom: 20px;
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
.picture {
    min-width: 100%;
    max-width: 100%;
    height: 400px;
    background: white;
    border: 3px solid green;
    /* background-color: grey; */
}
.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 30px;
}
</style>
