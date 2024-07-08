from firebase import db


class User():
    @staticmethod
    def register_user(uid, role):
        res = db.collection("users").document(uid).set(
            {"role": role, "status": "PENDING"}, merge=True)
        if res.update_time:
            return True
