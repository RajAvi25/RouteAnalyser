import cv2
import numpy as np
import matplotlib.pyplot as plt


from logging import debug, exception
from flask import Flask,g, render_template, session,abort, redirect, jsonify, request,url_for
from functools import wraps
from flask import Flask,json
from datetime import datetime
import io
from pandas.io.json import json_normalize
import os
import numpy as np
from pandas import Timestamp
from flask_cors import CORS

from werkzeug.wrappers import response
from datetime import datetime
from pprint import pprint

from pandas import DataFrame
import datetime
from datetime import timedelta
import dateutil.parser
from datetime import date
import calendar
import re
import math
import json
import urllib.request
from pytz import timezone
from six.moves import urllib
from flask import Response

app = Flask(__name__)
#cors = CORS(app, resources={r"*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

img = cv2.imread('report.jpg', cv2.IMREAD_COLOR)

def PictureOutput(param):
    cv2.imshow('image',param)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return jsonify({ "success" : 1})

# PictureOutput(img)


@app.route("/processImage", methods=['GET', 'POST'])
def processImage():
    if request.method == 'POST':
        image = request.files['file']
        DIR = 'static/processedImages'
        x=len([name for name in os.listdir(DIR) if os.path.isfile(os.path.join(DIR, name))])
        s=str(x)+'_'+image.filename
        path = os.path.join('static/processedImages', s)
        image.save(path)
        np = "static/processedImages/"+ s
        print(np)
        img = cv2.imread(np, cv2.IMREAD_COLOR)
        pitcureOutput = PictureOutput(img)
        newPath =  "http://127.0.0.1:5000/static/processedImages/" + s
        response = jsonify({ "success" : 1,'file' : newPath},pitcureOutput)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

@app.route('/newCertification', methods=['POST'])
def CertificationUpload():
    if request.json == {}: 
        return jsonify("empty json")
    else:
        data=request.json
        data["user_id"]=str(data["user_id"])
        return json.dumps({ "success" : 1,"error":0,"message":"certification uploaded","data":data})


if __name__ == '__main__':
   app.run(debug=True)