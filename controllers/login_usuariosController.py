import jwt
import datetime
from flask import request, jsonify
from models.usuarios import Usuarios
from database.db import db

SECRET_KEY = 'hgjfyrddytfuyfiyufu@12332211233'

def login_usuarios_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            user = Usuarios.query.filter_by(login=data['login']).first()

            if user and user.senha == data['senha']:
                # Gera o token JWT com a claim 'role': 'admin'
                token = jwt.encode({
                    'login': user.login,
                    'role': 'admin',  # Define a role para admin
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, SECRET_KEY, algorithm="HS256")
                
                token_str = token if isinstance(token, str) else token.decode('utf-8')
                return jsonify({'token': token_str}), 200
            
            return jsonify({'error': 'Credenciais inválidas'}), 401

        except Exception as e:
            return jsonify({'error': 'Erro ao fazer login. Erro {}'.format(str(e))}), 400