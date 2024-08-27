from flask import request, jsonify
from database.db import db
from models.produtos import Produtos

def produtosController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            produtos = Produtos(codigo=data['codigo'], item=data['item'], marca=data['marca'], tipo=data['tipo'], observacoes=data['observacoes'],preco_compra=data['preco_compra'], preco_venda=data['preco_venda'], status=data['status'], quantidade=data['quantidade'],)
            db.session.add(produtos)
            db.session.commit()
            return jsonify({'message': 'Produto inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Produto. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Produtos.query.all()
            produto = {'produtos': [produtos.to_dict() for produtos in data]}
            return produto

        except Exception as e:
            return 'Não foi possível buscar Produto. Error: {}'.format(str(e)), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_produtos_id = data['codigo']
            put_produtos = Produtos.query.get(put_produtos_id)
            if put_produtos is None:
                return {'error': 'Produto não encontrado'}, 404
            put_produtos.item = data.get('item', put_produtos.item)
            put_produtos.marca = data.get('marca', put_produtos.marca)
            put_produtos.tipo = data.get('tipo', put_produtos.tipo)
            put_produtos.observacoes = data.get('observacoes', put_produtos.observacoes)
            put_produtos.preco_compra = data.get('preco_compra', put_produtos.preco_compra)
            put_produtos.preco_venda = data.get('preco_venda', put_produtos.preco_venda)
            put_produtos.status = data.get('status', put_produtos.status)
            put_produtos.quantidade = data.get('quantidade', put_produtos.quantidade)
            # print
            print(put_produtos.item,put_produtos.marca,put_produtos.tipo,put_produtos.observacoes,put_produtos.preco_compra,put_produtos.preco_venda, put_produtos.status, put_produtos.quantidade)
            db.session.commit()
            return 'Produtos alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Produtos. Erro{}'.format(e)}, 400
    
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_produto = Produtos.query.get(codigo)
            if delete_produto is None:
                return {'error': 'Produto não encontrado'}, 404
            db.session.delete(delete_produto)
            db.session.commit()
            return 'Produto deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar Produto. Erro{}'.format(e)}, 400