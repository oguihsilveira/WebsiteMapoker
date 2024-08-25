from flask import request, jsonify
from database.db import db
from models.produtos import Produtos

def produtosController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            produtos = Produtos(codigo=data['codigo'], nome=data['nome'], preco=data['preco'], status=data['status'], quantidade=data['quantidade'],codMarca=data['codMarca'], codFornecedor=data['codFornecedor'], )
            db.session.add(produtos)
            db.session.commit()
            return jsonify({'message': 'Produtos inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Produtos. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Produtos.query.all()
            produto = {'produtos': [produtos.to_dict() for produtos in data]}
            return produto

        except Exception as e:
            return 'Não foi possível buscar produtos. Error: {}'.format(str(e)), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_produtos_id = data['codigo']
            put_produtos = Produtos.query.get(put_produtos_id)
            if put_produtos is None:
                return {'error': 'Produto não encontrado'}, 404
            put_produtos.nome = data.get('nome', put_produtos.nome)
            put_produtos.preco = data.get('preco', put_produtos.preco)
            put_produtos.status = data.get('status', put_produtos.status)
            put_produtos.quantidade = data.get('quantidade', put_produtos.quantidade)
            put_produtos.codMarca = data.get('codMarca', put_produtos.codMarca)
            put_produtos.codFornecedor = data.get('codFornecedor', put_produtos.codFornecedor)

            print(put_produtos.nome,put_produtos.preco,put_produtos.status,put_produtos.quantidade,put_produtos.codMarca,put_produtos.codFornecedor)
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
            return {'error': 'Erro ao deletar produto. Erro{}'.format(e)}, 400