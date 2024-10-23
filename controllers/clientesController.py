from flask import request, jsonify
from models.clientes import Clientes
from database.db import db
import bcrypt

def clientesController():
    if request.method == 'GET':
        clientes = Clientes.query.all()
        return jsonify({
            'clientes': [{
                'codigo': cliente.codigo,
                'nome': cliente.nome,
                'login': cliente.login,
                'email': cliente.email,  # Campo de email
                'empresa': cliente.empresa  # Incluído o campo empresa
            } for cliente in clientes]
        }), 200

    if request.method == 'POST':
        data = request.get_json()

        # Hash da senha
        hashed_password = bcrypt.hashpw(data['senha'].encode('utf-8'), bcrypt.gensalt())

        novo_cliente = Clientes(
            codigo=data['codigo'],
            nome=data['nome'],
            login=data['login'],
            senha=hashed_password,
            email=data['email'],  # Campo de email
            empresa=data['empresa']  # Incluído o campo empresa
        )
        
        db.session.add(novo_cliente)
        db.session.commit()

        return jsonify({'message': 'Cliente cadastrado com sucesso!'}), 201

    if request.method == 'PUT':
        data = request.get_json()
        cliente = Clientes.query.filter_by(codigo=data['codigo']).first()

        if cliente:
            cliente.nome = data['nome']
            cliente.login = data['login']
            cliente.email = data['email']  # Campo de email
            cliente.empresa = data['empresa']  # Incluído o campo empresa
            # Não atualize a senha, a menos que seja necessário
            db.session.commit()
            return jsonify({'message': 'Cliente atualizado com sucesso!'}), 200

    if request.method == 'DELETE':
        data = request.args
        cliente = Clientes.query.filter_by(codigo=data['codigo']).first()

        if cliente:
            db.session.delete(cliente)
            db.session.commit()
            return jsonify({'message': 'Cliente excluído com sucesso!'}), 200

    return jsonify({'error': 'Método não permitido'}), 405