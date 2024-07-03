from flask import Flask

import firebase_admin
from firebase_admin import credentials
import auth

cred = credentials.Certificate("challenge-vv-firebase-adminsdk-7sgbs-bec2f8e0c7.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)
app.register_blueprint(auth.bp)

@app.route("/")
def hello_world():
    return "<p>Hello, Challenge!</p>"