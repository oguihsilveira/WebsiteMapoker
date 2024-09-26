from flask import request, jsonify
from database.db import db
from models.pedidos import Compras

def comprasController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            compras = Compras(codigo=data['codigo'], item=data['item'], quantidade=data['quantidade'], data_compra=data['data_compra'], valor_compra=data['valor_compra'], cod_fornecedor=data['cod_fornecedor'], cod_funcionario=data['cod_funcionario'])
            db.session.add(compras)
            db.session.commit()
            return jsonify({'message': 'Compras inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Compras. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Compras.query.all()
            compra = {'compras': [compras.to_dict() for compras in data]}
            return compra

        except Exception as e:
            return 'Não foi possível buscar Compras. Error: {}'.format(str(e)), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_compras_id = data['codigo']
            put_compras = Compras.query.get(put_compras_id)
            if put_compras is None:
                return {'error': 'Produto não encontrado'}, 404
            put_compras.item = data.get('item', put_compras.item)
            put_compras.quantidade = data.get('quantidade', put_compras.quantidade)
            put_compras.data_compra = data.get('data_compra', put_compras.data_compra)
            put_compras.valor_compra = data.get('valor_compra', put_compras.valor_compra)
            put_compras.cod_fornecedor = data.get('cod_fornecedor', put_compras.cod_fornecedor)
            put_compras.cod_funcionario = data.get('cod_funcionario', put_compras.cod_funcionario)
            # print
            print(put_compras.item, put_compras.quantidade, put_compras.data_compra, put_compras.valor_compra, put_compras.cod_fornecedor, put_compras.cod_funcionario)
            db.session.commit()
            return 'Compras alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Compras. Erro{}'.format(e)}, 400
    
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_compra = compras.query.get(codigo)
            if delete_compra is None:
                return {'error': 'Produto não encontrado'}, 404
            db.session.delete(delete_compra)
            db.session.commit()
            return 'Compras deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar Compras. Erro{}'.format(e)}, 400