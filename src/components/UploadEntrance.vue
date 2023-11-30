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
                <div style="margin-bottom: 20px">
                    <h1 class="title">便携式实施智能</h1>
                    <h1 class="title">排汗检测系统</h1>
                </div>
                <el-button class="button" color="green">拍照检测</el-button>
                <el-button class="button" style="margin: 20px" color="green">系统介绍</el-button>
            </div>
        </el-main>
        <el-footer>
            <span class="comment">v1.0.0 made by xxx</span>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            pictureUrl: '',
            logoImage: require('@/assets/logo.png')
        }
    },
    methods: {
        // eslint-disable-next-line no-unused-vars
        handlePhoto(file, _fileList) {
            this.pictureUrl = URL.createObjectURL(file.raw)
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
    display: flex;
    justify-content: center;
    max-height: 40px;
    /* max-width: 80px; */
    margin: 20px;
    padding: 0px;

    font-size: 18px;
}
.upload {
    display: flex;
    justify-content: center;
}
.photo-button {
    height: 40px;
    width: 150px;
    color: white;
    background-color: green;
}
.container {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 50px 15px 0px 15px;

    margin-top: 15%;
    margin-bottom: 15%;
    max-width: 80%;
    width: 700px;
    height: 300px;
    border-radius: 5px;
    background: white;
}
.title {
    font-size: 28px;
    text-align: center;
    margin: 0;
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
