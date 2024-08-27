from flask import request, jsonify
from database.db import db
from models.mvto_estoque import Mvto_estoque

def mvto_estoqueController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            estoque = Mvto_estoque( codigo=data['codigo'], item=data['item'], tipo=data['tipo'], observacoes=data['observacoes'], preco_compra=data['preco_compra'], preco_venda=data['preco_venda'], data_entrada=data['data_entrada'], qntd_entrada=data['qntd_entrada'], cod_produto=data['cod_produto'], cod_fornecedor=data['cod_fornecedor']
            )
            db.session.add(estoque)
            db.session.commit()
            return jsonify({'message': 'Estoque inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Estoque. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Mvto_estoque.query.all()
            estoque = {'estoque': [item.to_dict() for item in data]}
            return estoque

        except Exception as e:
            return jsonify({'error': 'Não foi possível buscar Estoque. Error: {}'.format(str(e))}), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_estoque_id = data['codigo']
            put_estoque = Mvto_estoque.query.get(put_estoque_id)
            if put_estoque is None:
                return jsonify({'error': 'Estoque não encontrado'}), 404
            
            put_estoque.item = data.get('item', put_estoque.item)
            put_estoque.tipo = data.get('tipo', put_estoque.tipo)
            put_estoque.observacoes = data.get('observacoes', put_estoque.observacoes)
            # preco
            put_estoque.preco_compra = data.get('preco_compra', put_estoque.preco_compra)
            put_estoque.preco_venda = data.get('preco_venda', put_estoque.preco_venda)
            # data
            put_estoque.data_entrada = data.get('data_entrada', put_estoque.data_entrada)
            # qntd
            put_estoque.qntd_entrada = data.get('qntd_entrada', put_estoque.qntd_entrada)
            put_estoque.cod_produto = data.get('cod_produto', put_estoque.cod_produto)
            put_estoque.cod_fornecedor = data.get('cod_fornecedor', put_estoque.cod_fornecedor)
            # print
            print(put_estoque.item, put_estoque.tipo, put_estoque.observacoes, put_estoque.preco_compra, put_estoque.preco_venda, put_estoque.data_entrada, put_estoque.qntd_entrada, put_estoque.cod_produto, put_estoque.cod_fornecedor)
            db.session.commit()
            return jsonify({'message': 'Estoque alterado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar Estoque. Erro: {}'.format(e)}), 400
    
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_estoque = Mvto_estoque.query.get(codigo)
            if delete_estoque is None:
                return jsonify({'error': 'Estoque não encontrado'}), 404
            db.session.delete(delete_estoque)
            db.session.commit()
            return jsonify({'message': 'Estoque deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao deletar Estoque. Erro: {}'.format(e)}), 400