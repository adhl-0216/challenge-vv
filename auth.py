from models.user import User
from flask import (
    Blueprint, flash, g, make_response, redirect, render_template, request, session, url_for
)

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        data = request.get_json()
        uid = data.get('uid')
        role = data.get('role')

        res = User.register_user(uid, role)
        if (res):
            return redirect(url_for('auth.login'))
        else:
            flash("Error Creating User in Database")

    if request.method == 'GET':
        return render_template('/auth/register.html')


@bp.route('/login', methods=('GET', 'POST'))
def login():
    return render_template('/auth/login.html')
