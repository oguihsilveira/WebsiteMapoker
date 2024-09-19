from flask import request, jsonify
from database.db import db
from models.fornecedores import Fornecedores

def fornecedoresController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            # Verifica se o código já existe
            existing_fornecedor = Fornecedores.query.get(data['codigo'])
            if existing_fornecedor:
                return jsonify({'error': 'Código já existe'}), 409  # Retorna status 409 se o código for duplicado

            fornecedores = Fornecedores(
                codigo=data['codigo'], 
                empresa=data['empresa'], 
                endereco=data['endereco'], 
                cnpj=data['cnpj'], 
                telefone=data['telefone'], 
                email=data['email']
            )
            db.session.add(fornecedores)
            db.session.commit()
            return jsonify({'message': 'Fornecedor inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Fornecedor. Erro: {}'.format(str(e))}), 400
            
    # Método GET
    elif request.method == 'GET':
        try:
            data = Fornecedores.query.all()
            fornecedor = {'fornecedores': [fornecedores.to_dict() for fornecedores in data]}
            return fornecedor

        except Exception as e:
            return 'Não foi possível buscar Fornecedores. Error: {}'.format(str(e)), 405   

    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_fornecedores_id = data['codigo']
            put_fornecedores = Fornecedores.query.get(put_fornecedores_id)
            if put_fornecedores is None:
                return {'error': 'Fornecedor não encontrado'}, 404
            put_fornecedores.empresa = data.get('empresa', put_fornecedores.empresa)
            put_fornecedores.endereco = data.get('endereco', put_fornecedores.endereco)
            put_fornecedores.cnpj = data.get('cnpj', put_fornecedores.cnpj)
            put_fornecedores.telefone = data.get('telefone', put_fornecedores.telefone)
            put_fornecedores.email = data.get('email', put_fornecedores.email)
            # print
            print(put_fornecedores.empresa, put_fornecedores.endereco, put_fornecedores.cnpj, put_fornecedores.telefone, put_fornecedores.email)
            db.session.commit()
            return 'Fornecedor alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Fornecedor. Erro{}'.format(e)}, 400

    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_fornecedor = Fornecedores.query.get(codigo)
            if delete_fornecedor is None:
                return {'error': 'Fornecedor não encontrado'}, 404
            db.session.delete(delete_fornecedor)
            db.session.commit()
            return 'Fornecedor deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar Fornecedor. Erro{}'.format(e)}, 400