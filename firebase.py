import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


cred = credentials.Certificate(
    "challenge-vv-firebase-adminsdk-7sgbs-bec2f8e0c7.json")
firebase = firebase_admin.initialize_app(cred)
db = firestore.client(firebase)
