from flask import request, jsonify
from database.db import db
from models.usuarios import Produtos

def ProdutosController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            produtos = Produtos(codigo=data['codigo'], nome=data['nome'], codMarca=data['codMarca'], codFornecedor=data['codFornecedor'], preco=data['preco'], status=data['status'])
            db.session.add(produtos)
            db.session.commit()
            return jsonify({'message': 'Produtos inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Produtos. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Produtos.query.all()
            produto = {'alimentos': [produtos.to_dict() for produtos in data]}
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
            put_produtos.codmarca = data.get('pesoLote', put_alimentos.pesoLote)
            put_produtos.dataValidade = data.get('dataValidade', put_alimentos.dataValidade)
            put_produtos.codFornecedor = data.get('codFornecedor', put_alimentos.codFornecedor)
            put_produtos.codFornecedor = data.get('codFornecedor', put_alimentos.codFornecedor)

            print(put_alimentos.nome,put_alimentos.pesoLote,put_alimentos.dataValidade,put_alimentos.codFornecedor)
            db.session.commit()
            return 'Alimento alterado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao atualizar Alimento. Erro{}'.format(e)}, 400