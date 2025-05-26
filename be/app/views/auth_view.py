import os
from flask import Blueprint, request, jsonify
from app.models.db import PLSQL_DB_CONNECTION

auth_bp = Blueprint('auth', __name__)

# initialize once
db_conn = PLSQL_DB_CONNECTION()
db_name = os.getenv("db_database")
if not db_name:
    raise RuntimeError("Environment variable db_database is required")
db_conn.initialize_connection(db_name)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    # beware SQL-injection in real code – use parametrized queries!
    query = (
        f"SELECT id, username, name "
        f"FROM public.users "
        f"WHERE username = '{username}' AND password = '{password}'"
    )
    rows = db_conn.execute_query(query)
    if not rows:
        return jsonify({"error": "Invalid credentials"}), 401

    row = rows[0]
    user = {"id": row[0], "username": row[1], "name": row[2]}
    return jsonify({"message": "Login successful", "user": user}), 200
