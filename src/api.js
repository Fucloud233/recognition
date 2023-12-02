/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import axios from 'axios'

const URL = 'http://127.0.0.1:6060'

function getApiUrl(name) {
    return URL + '/' + name
}

// https://blog.csdn.net/Jensen_Yao/article/details/83312046
function dataURLtoBlob(baseurl) {
    let arr = baseurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

export function recognize(imageUrl) {
    const apiUrl = getApiUrl('recognize')

    // https://blog.csdn.net/weixin_41786574/article/details/105015565
    const formData = new FormData()
    formData.append('image', dataURLtoBlob(imageUrl))
    return axios({
        method: 'post',
        url: apiUrl,
        headers: {
            'Content-Type': 'application/form-data'
        }
    })
        .then((data) => {
            if (data.headers['Content-Type'] == 'json') {
                console.log(data.data)
            }
            console.log('ok')
            const blobUrl = window.URL.createObjectURL(data.data)
            return blobUrl
        })
        .catch((err) => {
            return null, false
        })
}
