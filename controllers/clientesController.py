from flask import request, jsonify
from database.db import db
from models.clientes import Clientes
import bcrypt

def clientesController():
    if request.method == 'POST':
        try:
            data = request.get_json()

            # Verifica se os campos obrigatórios estão preenchidos
            if not data.get('nome') or not data.get('empresa') or not data.get('telefone') or not data.get('login') or not data.get('email'):
                return jsonify({'error': 'Nome, empresa, telefone, login e email são obrigatórios.'}), 400

            # Verifica se o login, telefone ou email já estão em uso
            existing_login = Clientes.query.filter_by(login=data['login']).first()
            if existing_login:
                return jsonify({'error': 'Login já está em uso. Por favor, escolha outro.'}), 409

            existing_telefone = Clientes.query.filter_by(telefone=data['telefone']).first()
            if existing_telefone:
                return jsonify({'error': 'Telefone já está em uso. Por favor, escolha outro.'}), 409

            existing_email = Clientes.query.filter_by(email=data['email']).first()
            if existing_email:
                return jsonify({'error': 'Email já está em uso. Por favor, escolha outro.'}), 409


            # Cria o hash da senha e cadastra o cliente
            hashed_password = bcrypt.hashpw(data['senha'].encode('utf-8'), bcrypt.gensalt())

            cliente = Clientes(
                nome=data['nome'],
                empresa=data['empresa'],
                telefone=data['telefone'],
                login=data['login'],
                senha=hashed_password,
                email=data['email']
            )

            db.session.add(cliente)
            db.session.commit()
            return jsonify({'message': 'Cliente cadastrado com sucesso!'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao cadastrar cliente. Erro: {str(e)}'}), 400

    elif request.method == 'GET':
        try:
            clientes_data = Clientes.query.all()
            clientes = {'clientes': [cliente.to_dict() for cliente in clientes_data]}
            return jsonify(clientes), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao buscar clientes. Erro: {str(e)}'}), 405

    elif request.method == 'PUT':
        try:
            data = request.get_json()

            # Verifica se o código foi passado
            cliente_id = data.get('codigo')
            if not cliente_id:
                return jsonify({'error': 'Código do cliente é obrigatório para atualização.'}), 400

            cliente = Clientes.query.get(cliente_id)
            if not cliente:
                return jsonify({'error': 'Cliente não encontrado.'}), 404

            cliente.nome = data.get('nome', cliente.nome)
            cliente.empresa = data.get('empresa', cliente.empresa)
            cliente.telefone = data.get('telefone', cliente.telefone)
            cliente.email = data.get('email', cliente.email)
            cliente.login = data.get('login', cliente.login)
            
            # Atualize a senha apenas se um novo valor for fornecido
            if 'senha' in data and data['senha']:
                cliente.senha = bcrypt.hashpw(data['senha'].encode('utf-8'), bcrypt.gensalt())

            db.session.commit()
            return jsonify({'message': 'Cliente atualizado com sucesso!'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao atualizar cliente. Erro: {str(e)}'}), 400

    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            cliente = Clientes.query.get(codigo)

            if not cliente:
                return jsonify({'error': 'Cliente não encontrado.'}), 404

            db.session.delete(cliente)
            db.session.commit()
            return jsonify({'message': 'Cliente excluído com sucesso!'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao excluir cliente. Erro: {str(e)}'}), 400

    return jsonify({'error': 'Método não permitido.'}), 405