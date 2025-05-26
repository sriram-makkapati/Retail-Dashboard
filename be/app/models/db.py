from flask import jsonify
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import urllib.parse
import os
from app.config import Config
cfg = Config()

db_user     = cfg.DB_USER
db_password = cfg.DB_PASSWORD
host        = cfg.DB_HOST
port        = cfg.DB_PORT
database    = cfg.DB_DATABASE
schema      = cfg.DB_SCHEMA

class PLSQL_DB_CONNECTION:
    def __init__(self):
        self.user = db_user
        self.password = urllib.parse.quote_plus(db_password)
        self.host = host
        self.port = port
        # self.database = database
        self.engine = None
        self.session = None
        self.Base = None

    def initialize_connection(self,database):
        print('plsql_db_connection\n',self.password)
        self.database = database
        self.engine = create_engine(
            'postgresql://{user}:{password}@{host}:{port}/{database}'.format(
                user=self.user,
                password=self.password,
                host=self.host,
                port=self.port,
                database=database,
            )
        )
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
        self.Base = declarative_base()
        print("Database connection initialized successfully.")
        
    def execute_query(self, query):
        result = self.session.execute(text(query))
        return result.fetchall()
    
    def get_session(self):
        return self.session

    def close_connection(self):
        self.session.close()
        # self.engine.dispose()

    def get_db_tables(self, schema):
        inspector = inspect(self.engine)
        return inspector.get_table_names(schema)
