import auth
from flask import Flask, render_template

import firebase

app = Flask(__name__)
app.register_blueprint(auth.bp)


@app.route("/")
def hello_world():
    return render_template('index.html')
