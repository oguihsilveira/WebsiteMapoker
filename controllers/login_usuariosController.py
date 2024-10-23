import jwt
import datetime
from flask import request, jsonify
from models.usuarios import Usuarios
from database.db import db

SECRET_KEY = 'hgjfyrddytfuyfiyufu@12332211233'  # Troque por uma chave secreta forte

def login_usuarios_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user = Usuarios.query.filter_by(login=data['login']).first()

            if user and user.senha == data['senha']:  # Verifique a senha
                token = jwt.encode({
                    'login': user.login,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)  # Token expira em 30 minutos
                }, SECRET_KEY, algorithm="HS256")
                print("Seu token: ",token)
                return jsonify({'token': token}), 200
            
            return jsonify({'error': 'Credenciais inválidas'}), 401

        except Exception as e:
            return jsonify({'error': 'Erro ao fazer login. Erro {}'.format(str(e))}), 400