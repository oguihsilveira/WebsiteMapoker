import jwt
import datetime
from flask import request, jsonify
from models.clientes import Clientes  # Importe o modelo correto de Clientes
from database.db import db
import bcrypt

SECRET_KEY = 'hgjfyrddytfuyfiyufu@12332211233'  # Troque por uma chave secreta forte

def login_clientesController():
    if request.method == 'POST':
        try:
            # Recebe os dados do cliente enviados na requisição
            data = request.get_json()

            # Verifica se o cliente existe no banco de dados pelo login
            cliente = Clientes.query.filter_by(login=data['login']).first()

            # Verifica a senha usando bcrypt e o hash armazenado no banco
            if cliente:
                # Certifique-se de que o hash armazenado esteja em bytes
                senha_hash_armazenada = cliente.senha.encode('utf-8') if isinstance(cliente.senha, str) else cliente.senha

                # Realiza a verificação da senha com bcrypt
                if bcrypt.checkpw(data['senha'].encode('utf-8'), senha_hash_armazenada):
                    # Gera o token JWT com tempo de expiração
                    token = jwt.encode({
                        'login': cliente.login,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                    }, SECRET_KEY, algorithm="HS256")
                    
                    # Converte o token para string se estiver em bytes
                    token_str = token if isinstance(token, str) else token.decode('utf-8')
                    print("Seu token: ",token)
                    return jsonify({'token': token_str}), 200

            # Retorna erro caso as credenciais sejam inválidas
            return jsonify({'error': 'Credenciais inválidas'}), 401

        except Exception as e:
            # Tratamento de exceção, retornando o erro
            return jsonify({'error': f'Erro ao fazer login. Erro: {str(e)}'}), 400