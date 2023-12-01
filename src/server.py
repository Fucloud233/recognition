from io import BytesIO
from pathlib import Path
from flask import Flask, request, send_file

from api import recognize_image

app = Flask("yolo")

IMAGE_NAME = "image"
MIME_TYPE = "image/jpeg"

def gen_return_msg(msg: str, code: int):
    return {
        "code": code,
        "msg": msg
    }

def gen_return_file(result: bytes, filename: str):
    return send_file(
        BytesIO(result),
        mimetype=MIME_TYPE,
        as_attachment=False,
        download_name = filename
    )

@app.route("/recognize", methods=['POST'])
def recognize():
    image = request.files.get(IMAGE_NAME)
    if image is None:
        return gen_return_msg("Image Not Found", 1)

    # save to local
    filename = image.filename
    
    # to bytes
    bytes_channel = BytesIO()
    image.save(bytes_channel)

    (result, flag) = recognize_image(bytes_channel)
    
    if not flag:
        return gen_return_msg(result, 1) 
    return gen_return_file(result, filename)

@app.route("/check", methods=['GET'])
def check():
    file_path = Path('img/test.jpg')

    with open(file_path, 'rb') as f:
        buf = BytesIO(f.read())

    (result, flag) = recognize_image(buf)
    
    if not flag:
        return gen_return_msg(result, 1) 
    return gen_return_file(result, file_path.name)
         
if __name__ == '__main__':
    app.run(port=6060, host="0.0.0.0", debug=True)