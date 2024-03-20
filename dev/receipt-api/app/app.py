from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from data.dao import ApiDataManager
from gpt4 import Inferencer
from paddleocr import PaddleOCR
import os

app = Flask(__name__)
db = ApiDataManager()
CORS(app)

@app.route("/api/process-receipts", methods=["POST"])
def process_receipts():
    _ocr = PaddleOCR(use_angle_cls=True, lang='fr', show_log=True)
    _gpt = Inferencer()

    app_name = request.headers.get('X-App-Name')
    app_api_key = request.headers.get('X-Api-Key')
    supplier = request.headers.get('X-Supplier')

    if app_api_key != db.get_application_api_key(app_name):
        abort(401)

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    
    filename = secure_filename(file.filename)   
    file_path = os.path.join("/tmp", filename)
    file.save(file_path)

    try:
        formated_text = extract_receipts(_ocr, file_path)
    except:
        return jsonify({"error": "Something went wrong when passing the file through OCR."}), 500

    os.remove(file_path)

    try:
        interpreted_receipt_data = _gpt.inference(supplier, formated_text)
        return jsonify(interpreted_receipt_data), 200
    except:
        return jsonify({"error": "Something went wrong when converting the response from GPT-4."}), 500


def extract_receipts(ocr, file_path):
        results = ocr.ocr(file_path, cls=True)
        txts = []
        for result in results:
            for line in result:
                txts.append(line[1][0])
        
        return "\n".join(txts)

if __name__ == "__main__":
    app.run()

