from flask import Flask
from app.views.auth_view import auth_bp
from app.views.dashboard_view import dashboard_bp

def create_app():
    app = Flask(__name__)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(dashboard_bp, url_prefix='/api')

    return app
