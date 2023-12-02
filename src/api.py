from io import BytesIO
from PIL import Image
from yolo import YOLO

yolo = YOLO()

# IPL IO: https://www.cnblogs.com/haifwu/p/12855348.html
# https://www.cnblogs.com/hhaostudy/p/16198644.html

def __image2bytes(image: Image.Image) -> BytesIO:
    image_bytes = BytesIO()
    image = image.convert("RGB")
    image.save(image_bytes, format="jpeg")
    image_bytes = image_bytes.getvalue()
    # print("len:", len(image_bytes.getvalue()))
    return image_bytes

def __bytes2image(content: BytesIO) -> Image.Image:
    return Image.open(content)

def recognize_image(content, crop: bool=False, count: bool=False) -> (BytesIO, bool):
    # try:
        image = __bytes2image(content)
        recognized_image: Image.Image= yolo.detect_image(image, crop = crop, count=count)      
        # recognized_image.save("test.jpg")
        bytes = __image2bytes(recognized_image) 
        return (bytes, True)
    # except Exception as e:
    #     # print('Open Error! Try again!')
    #     raise e
    #     return (repr(e), False)
        