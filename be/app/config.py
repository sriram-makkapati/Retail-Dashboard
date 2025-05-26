import os

class Config:
    """Configuration class for the application."""
    
    # Database configuration
    DB_USER = os.getenv("db_user")
    DB_PASSWORD = os.getenv("db_password")
    DB_HOST = os.getenv("db_host")
    DB_PORT = os.getenv("db_port")
    DB_DATABASE = os.getenv("db_database")
    DB_SCHEMA = os.getenv("db_schema")

    if not all([DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE]):
        raise RuntimeError("Database configuration environment variables are required")
