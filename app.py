import os
import mysql.connector

from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_sqlalchemy   import SQLAlchemy

load_dotenv()

app = Flask(__name__)
user = os.environ.get('db_user')
password = os.environ.get('db_password')
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://{user}:{password}@localhost/balanceDB'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)

@app.route('/')
def main_page():
    return 'Hello'

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    user_list = []
    for user in users:
        user_data = {
            'id': user.id,
            'name': user.name
        }
        
        user_list.append(user_data)
        
    
    return jsonify({'users' :user_list})



