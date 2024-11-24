# carrinhoController.py

from flask import request, jsonify
from database.db import db
from models.pedidos import Pedidos
from models.produtos import Produtos
import jwt
import logging
import os

# Carregando a chave secreta de uma variável de ambiente
SECRET_KEY = os.getenv('SECRET_KEY', 'hgjfyrddytfuyfiyufu@12332211233')  

BASE_URL = "http://localhost:3000/uploads/"  # Caminho base para os uploads (ajustado para corresponder ao front-end)

def get_pedidos():
    try:
        # Validação do token no cabeçalho Authorization
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            logging.error("Token não fornecido no cabeçalho")
            return jsonify({'error': 'Token não fornecido'}), 401

        try:
            token = auth_header.split(' ')[1]
        except IndexError:
            logging.error("Formato do cabeçalho Authorization inválido")
            return jsonify({'error': 'Token malformado'}), 401

        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            logging.error("Token expirado")
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError as e:
            logging.error(f"Token inválido: {str(e)}")
            return jsonify({'error': 'Token inválido'}), 401

        cod_cliente = decoded_token.get('codigo')
        if not cod_cliente:
            logging.error("Cliente não encontrado no token ou token malformado")
            return jsonify({'error': 'Cliente não encontrado no token'}), 401

        # No carrinhoController.py
        print(f"Cod_cliente no token: {cod_cliente}")  # Verifique o valor de cod_cliente extraído do token

        # Filtra apenas os pedidos com status 'em andamento'
        pedidos_query = db.session.query(
            Pedidos.codigo.label('codigo'),
            Pedidos.status,
            Pedidos.valor_compra,
            Produtos.codigo.label('cod_produto'),
            Produtos.item,
            Produtos.foto
        ).join(Produtos, Pedidos.cod_produto == Produtos.codigo).filter(
            Pedidos.cod_cliente == cod_cliente,  # Filtrando pelo código do cliente
            Pedidos.status == 'em andamento'     # Filtra apenas os pedidos 'em andamento'
        )

        pedidos = pedidos_query.all()

        # Serialização dos pedidos
        pedidos_list = [
            {
                'codigo': pedido.codigo,
                'cod_produto': pedido.cod_produto,
                'item_produto': pedido.item,
                'foto': f"{BASE_URL}{pedido.foto}" if pedido.foto else None,
                'valor_compra': pedido.valor_compra,
                'status': pedido.status
            }
            for pedido in pedidos
        ]

        return jsonify({'pedidos': pedidos_list}), 200

    except Exception as e:
        logging.error(f"Erro inesperado: {str(e)}")
        return jsonify({'error': 'Erro interno do servidor'}), 500

    
def update_pedido_status(codigo):
    try:
        # Validação do token no cabeçalho Authorization
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            logging.error("Token não fornecido no cabeçalho")
            return jsonify({'error': 'Token não fornecido'}), 401

        try:
            token = auth_header.split(' ')[1]
        except IndexError:
            logging.error("Formato do cabeçalho Authorization inválido")
            return jsonify({'error': 'Token malformado'}), 401

        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            logging.error("Token expirado")
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError as e:
            logging.error(f"Token inválido: {str(e)}")
            return jsonify({'error': 'Token inválido'}), 401

        cod_cliente = decoded_token.get('codigo')
        if not cod_cliente:
            logging.error("Cliente não encontrado no token ou token malformado")
            return jsonify({'error': 'Cliente não encontrado no token'}), 401

        # Atualizar o pedido para "pendente"
        pedido = db.session.query(Pedidos).filter_by(codigo=codigo, cod_cliente=cod_cliente).first()
        if pedido:
            pedido.status = 'pendente'  # Atualiza o status para 'pendente'
            db.session.commit()
            return jsonify({'message': 'Status do pedido atualizado para "pendente" com sucesso!'}), 200
        else:
            return jsonify({'error': 'Pedido não encontrado ou cliente inválido'}), 404

    except Exception as e:
        logging.error(f"Erro inesperado: {str(e)}")
        return jsonify({'error': 'Erro interno do servidor'}), 500

def remove_pedido(codigo):
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            logging.error("Token não fornecido no cabeçalho")
            return jsonify({'error': 'Token não fornecido'}), 401

        try:
            token = auth_header.split(' ')[1]
        except IndexError:
            logging.error("Formato do cabeçalho Authorization inválido")
            return jsonify({'error': 'Token malformado'}), 401

        try:
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            logging.error("Token expirado")
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError as e:
            logging.error(f"Token inválido: {str(e)}")
            return jsonify({'error': 'Token inválido'}), 401

        cod_cliente = decoded_token.get('codigo')
        if not cod_cliente:
            logging.error("Cliente não encontrado no token ou token malformado")
            return jsonify({'error': 'Cliente não encontrado no token'}), 401

        # Remover o pedido do carrinho
        pedido = db.session.query(Pedidos).filter_by(codigo=codigo, cod_cliente=cod_cliente).first()
        if pedido:
            db.session.delete(pedido)
            db.session.commit()
            return jsonify({'message': 'Pedido removido com sucesso!'}), 200
        else:
            return jsonify({'error': 'Pedido não encontrado ou cliente inválido'}), 404

    except Exception as e:
        logging.error(f"Erro inesperado: {str(e)}")
        return jsonify({'error': 'Erro interno do servidor'}), 500