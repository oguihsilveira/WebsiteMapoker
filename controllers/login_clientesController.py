import jwt
import datetime
from flask import request, jsonify
from models.clientes import Clientes
from database.db import db
import bcrypt

SECRET_KEY = 'hgjfyrddytfuyfiyufu@12332211233'

def login_clientesController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            cliente = Clientes.query.filter_by(login=data['login']).first()

            if cliente:
                senha_hash_armazenada = cliente.senha.encode('utf-8') if isinstance(cliente.senha, str) else cliente.senha
                if bcrypt.checkpw(data['senha'].encode('utf-8'), senha_hash_armazenada):
                    # Gera o token JWT com o código do cliente incluído
                    token = jwt.encode({
                        'codigo': cliente.codigo,  # Inclui o código do cliente no token
                        'login': cliente.login,
                        'nome': cliente.nome,  # Inclui o nome do cliente no token
                        'empresa' : cliente.empresa,
                        'role': 'cliente',
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                    }, SECRET_KEY, algorithm="HS256")
              
                    token_str = token if isinstance(token, str) else token.decode('utf-8')
                    return jsonify({'token': token_str}), 200

            return jsonify({'error': 'Credenciais inválidas'}), 401

        except Exception as e:
            return jsonify({'error': f'Erro ao fazer login. Erro: {str(e)}'}), 400
