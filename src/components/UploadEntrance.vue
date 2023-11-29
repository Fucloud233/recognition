<template>
    <el-container style="height: 100%">
        <el-header>
            <el-menu mode="horizontal" background-color="#005E27">
                <el-menu-item index="0">
                    <img style="width: 120px" :src="logoImage" />
                </el-menu-item>
                <el-menu-item style="width: "> <h1 class="title-font">便携式实时智能排汗检测</h1> </el-menu-item>
            </el-menu>
        </el-header>

        <!-- main -->
        <el-main>
            <div class="container">
                <!-- image -->
                <el-image class="picture" fit="contain" style="width: auto" :src="pictureUrl" alt="Picture Not Found"></el-image>
                <!-- upload -->
                <el-upload class="upload" action="#" :auto-upload="false" :show-file-list="false" :on-change="handlePhoto">
                    <template #trigger>
                        <el-button class="photo-button">photo</el-button>
                    </template>
                </el-upload>
            </div>
        </el-main>
        <el-footer style="height: 0%"></el-footer>
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
.title-font {
    font-size: 12px;
}
.el-main {
    background: #dcdfe6;
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
    padding: 5px;
    width: 95%;
    /* padding: 10px; */
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
