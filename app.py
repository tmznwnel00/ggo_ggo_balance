import os
import mysql.connector
import json

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_file
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum
from flask_jwt_extended import *

load_dotenv()

app = Flask(__name__)
user = os.environ.get("db_user")
password = os.environ.get("db_password")
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = f"mysql+mysqlconnector://{user}:{password}@localhost/balanceDB"
db = SQLAlchemy(app)

app.config.update(
    DEBUG = True,
    JWT_SECRET_KEY = "ggo_ggo_bal"
)

jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)

class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    title = db.Column(db.String(20), nullable=False)
    left_choice = db.Column(db.Text, nullable=False)
    right_choice = db.Column(db.Text, nullable=False)
    parent_id = db.Column(db.Integer, nullable=True)
    author = db.Column(db.Integer, nullable=False)

class PollResult(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    left_sum = db.Column(db.Integer, nullable=False, default=0)
    right_sum = db.Column(db.Integer, nullable=False, default=0)
    
class PollHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=True)
    game_id = db.Column(db.Integer, nullable=True)
    action = db.Column(Enum('Add', 'Delete'), nullable=True)
    choice = db.Column(Enum('Left', 'Right'), nullable=True)
    

@app.route("/")
def main_page():
    return "Hello"


@app.route("/api/login", methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()
        if data["id"] == "" or data["password"] == "":
            return "Id or Password is null", 400
        
        user_exist = db.session.query(User).filter(User.name == data["id"]).first()        
        
        if user_exist:
            return jsonify(user_id = user_exist.id, access_token = create_access_token(identity = user_exist.id, expires_delta=False))
        else:
            # new_user = User(name=data["id"])

            # db.session.add(new_user)
            # db.session.commit()
            return jsonify({"Error": "No user"}), 400

    
@app.route("/api/users", methods=["GET"])
def get_users():
    if request.method == "GET":
        users = User.query.all()
        user_list = []
        for user in users:
            user_data = {"id": user.id, "name": user.name}

            user_list.append(user_data)
        return jsonify({"users": user_list})


@app.route("/api/create_game", methods=["POST"])
@jwt_required()
def create_game():
    user = get_jwt_identity()
    if user is None:
        return 400
    else:
        data = json.loads(request.form.get("json"))
        if 'leftimage' in request.files:
            left_file = request.files["leftimage"]
            _, left_file_extension = os.path.splitext(left_file.filename)
            left_file.save(os.path.join(os.getcwd() + '/image_db', f'{id}_left{left_file_extension}'))
        if 'rightimage' in request.files:
            right_file = request.files["rightimage"]
            _, right_file_extension = os.path.splitext(right_file.filename)
            right_file.save(os.path.join(os.getcwd() + '/image_db', f'{id}_right{right_file_extension}'))
        new_game = Game(
            title=data["title"],
            left_choice=data["left_choice"],
            right_choice=data["right_choice"],
            parent_id=None,
            author=user,
        )
        
        db.session.add(new_game)
        db.session.commit()

        id = new_game.id
        data["id"] = id
        
        new_poll = PollResult(
            id = id
        )
        db.session.add(new_poll)
        db.session.commit()

        return data


@app.route("/api/games", methods=["GET"])
def get_game():
    game_id = request.args.get("id")

    game = Game.query.get(game_id)
    file1, file2 = None, None
    for file in os.listdir('image_db'):
        if file.startswith(f'{game_id}_left'):
            file1 = file
        if file.startswith(f'{game_id}_right'):
            file2 = file
    game_data = {
        "json_data": {
            "id": game.id,
            "title": game.title,
            "left_choice": game.left_choice,
            "right_choice": game.right_choice,
            "parent_id": game.parent_id,
        },
        "file_data": [file1, file2]
    }

    return jsonify(game_data)

@app.route("/images/<image_filename>")
def get_image(image_filename):
    return send_file(f'image_db/{image_filename}')


@app.route("/api/gamelist", methods=["GET"])
@jwt_required()
def get_gamelist():
    user = get_jwt_identity()
    print(request.args)
    user_id = request.args.get("user_id")
    if user is None:
        return 400
    else:
        if user_id is None:
            limit = request.args.get("limit")
            games = Game.query.order_by(Game.id.desc()).limit(5).all()
            
            data = []

            for game in games:
                data.append(
                    {
                        "id": game.id,
                        "title": game.title
                    }
                )
            return jsonify(data)
        else:
            print(user_id)
            print(user)
            data = []
            return jsonify(data)


@app.route("/api/create_poll", methods=["POST"])
@jwt_required()
def create_poll():
    user = get_jwt_identity()
    if user is None:
        return 400
    else:
        data = request.get_json()
        
        print(data)
        # new_game = PollHistory(
            
        # )
        
        # db.session.add(new_game)
        # db.session.commit()

        # id = new_game.id
        # data["id"] = id

        return data