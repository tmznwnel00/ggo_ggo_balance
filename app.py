import os
import mysql.connector

from dotenv import load_dotenv
from flask import Flask, jsonify, request
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

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(20), nullable=False)
    left_choice = db.Column(db.Text, nullable=False)
    right_choice = db.Column(db.Text, nullable=False)
    parent_id = db.Column(db.Integer, nullable=True)


@app.route('/')
def main_page():
    return 'Hello'

@app.route('/users', methods=['POST', 'GET'])
def get_users():
    if request.method == 'POST':
        data = request.get_json()
        new_user = User(name=data['id'])
        
        db.session.add(new_user)
        db.session.commit()
        
        return data
    
    elif request.method == 'GET':
        users = User.query.all()
        user_list = []
        for user in users:
            user_data = {
                'id': user.id,
                'name': user.name
            }
            
            user_list.append(user_data)
        return jsonify({'users' :user_list})

@app.route('/create_game', methods=['POST'])
def make_game():
    data = request.get_json()
    new_game = Game(
        title=data['title'],
        left_choice=data['left_choice'],
        right_choice=data['right_choice'],
        parent_id=None
        )
    db.session.add(new_game)
    db.session.commit()
    
    id = new_game.id
    data['id'] = id
    return data


@app.route('/games', methods=['GET'])
def get_game():
    game_id = request.args.get('id')
    print(game_id)
    game = Game.query.get(game_id)
    game_data = {
        'id': game.id,
        'title': game.title,
        'left_choice': game.left_choice,
        'right_choice': game.right_choice,
        'parent_id': game.parent_id
    }

    return jsonify(game_data)

