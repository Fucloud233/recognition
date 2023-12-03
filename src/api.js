/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import axios from 'axios'

function getApiUrl(name) {
    return '/api/' + name
}

// https://blog.csdn.net/Jensen_Yao/article/details/83312046
function dataUrlToBlob(dataUrl) {
    const [header, data] = dataUrl.split(',')
    const [, type] = header.match(/^data:(.*?);base64$/)
    const decodedData = atob(data)
    const buffer = new ArrayBuffer(decodedData.length)
    const view = new Uint8Array(buffer)

    for (let i = 0; i < decodedData.length; i++) {
        view[i] = decodedData.charCodeAt(i)
    }

    return new Blob([view], { type })
}

// check api is ok
export async function check() {
    const apiUrl = getApiUrl('check')

    return await axios({
        method: 'get',
        url: apiUrl,
        responseType: 'blob'
    }).then((resp) => {
        return {
            data: resp.data,
            flag: true
        }
    })
}

export async function recognize(imageUrl) {
    const apiUrl = getApiUrl('recognize')

    // https://blog.csdn.net/weixin_41786574/article/details/105015565
    const formData = new FormData()
    formData.append('image', dataUrlToBlob(imageUrl))

    return await axios({
        method: 'post',
        url: apiUrl,
        headers: {
            'Content-Type': 'application/form-data'
        },
        // you must set responseType as blob
        // otherwise it must failure
        responseType: 'blob',
        data: formData
    })
        .then((resp) => {
            // convert image file into URL
            const blobUrl = window.URL.createObjectURL(new Blob([resp.data], { type: 'image/jpeg' }))
            return {
                data: blobUrl,
                flag: true
            }
        })
        .catch((err) => {
            let resp = err.response
            if (resp === undefined) {
                console.log(err)
                return {
                    data: 'Network Error!',
                    flag: false
                }
            }
            return {
                data: resp.data,
                flag: false
            }
        })
}
