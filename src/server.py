from io import BytesIO
from pathlib import Path
from flask import Flask, request, send_file, make_response
# https://segmentfault.com/a/1190000024515972
from flask_cors import CORS

from api import recognize_image

app = Flask("yolo")
CORS(app, supports_credentials=True)

IMAGE_NAME = "image"
MIME_TYPE = "image/jpeg"

def gen_return_msg(msg: str, status_code: int=200):
    response = make_response(msg)
    response.status_code = status_code
    return response

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
        return gen_return_msg("Image Not Found", 400)

    # save to local
    filename = image.filename
    
    # to bytes
    bytes_channel = BytesIO()
    image.save(bytes_channel)

    (result, flag) = recognize_image(bytes_channel)
    
    if not flag:
        return gen_return_msg(result, 400) 
    return gen_return_file(result, filename)

@app.route("/check", methods=['GET'])
def check():
    file_path = Path('img/test.jpg')

    with open(file_path, 'rb') as f:
        buf = BytesIO(f.read())

    (result, flag) = recognize_image(buf)
    
    if not flag:
        return gen_return_msg(result) 
    return gen_return_file(result, file_path.name)
         
if __name__ == '__main__':
    app.run(port=6060, host="0.0.0.0", debug=False)