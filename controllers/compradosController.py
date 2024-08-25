from flask import request, jsonify
from database.db import db
from models.comprados import Comprados

def compradosController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            comprados = Comprados(codigo=data['codigo'], quantidade=data['quantidade'], preco=data['preco'], codFornecedor=data['codFornecedor'], codProduto=data['codProduto'])
            db.session.add(comprados)
            db.session.commit()
            return jsonify({'message': 'itens comprados inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar itens comprados. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Comprados.query.all()
            comprado = {'Itens comprados': [comprados.to_dict() for comprados in data]}
            return comprado

        except Exception as e:
            return 'Não foi possível buscar itens comprados. Error: {}'.format(str(e)), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_comprados_id = data['codigo']
            put_comprados = Comprados.query.get(put_comprados_id)
            if put_comprados is None:
                return {'error': 'Produto não encontrado'}, 404
            put_comprados.quantidade = data.get('quantidade', put_comprados.quantidade)
            put_comprados.preco = data.get('preco', put_comprados.preco)
            put_comprados.codFornecedor = data.get('codFornecedor', put_comprados.codFornecedor)
            put_comprados.codProduto = data.get('codProduto', put_comprados.codProduto)

            print(put_comprados.quantidade,put_comprados.preco,put_comprados.codFornecedor,put_comprados.codProduto)
            db.session.commit()
            return 'comprados alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar comprados. Erro{}'.format(e)}, 400
    
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_comprado = comprados.query.get(codigo)
            if delete_comprado is None:
                return {'error': 'Produto não encontrado'}, 404
            db.session.delete(delete_comprado)
            db.session.commit()
            return 'item comprado deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar item comprado. Erro{}'.format(e)}, 400