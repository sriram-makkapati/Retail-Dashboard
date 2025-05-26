import os
from flask import Blueprint, request, jsonify
from app.models.db import PLSQL_DB_CONNECTION

dashboard_bp = Blueprint('dashboard', __name__)
