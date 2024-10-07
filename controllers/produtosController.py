from flask import request, jsonify
from database.db import db
from models.produtos import Produtos

def produtosController():
    if request.method == 'POST':
        try:
            data = request.get_json()
            # Verificar se o código do produto já existe
            existing_produto = Produtos.query.filter_by(codigo=data['codigo']).first()
            if existing_produto:
                return jsonify({'error': 'Este código de produto já existe'}), 409  # Retornar 409 - Conflict

            # Criar um novo objeto produto com os dados recebidos
            produto = Produtos(
                codigo=data['codigo'],
                item=data['item'],
                tipo=data['tipo'],
                preco_atual=data['preco_atual'],
                preco_antigo=data.get('preco_antigo', None),
                status=data['status'],
                quantidade=data['quantidade'],
                foto=data['foto'],
                observacoes=data['observacoes'],
                cod_estoque=data['cod_estoque']
            )

            db.session.add(produto)
            db.session.commit()
            return jsonify({'message': 'Produto inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao cadastrar produto. Erro: {str(e)}'}), 400

    elif request.method == 'GET':
        try:
            data = Produtos.query.all()
            produtos = {'produtos': [produto.to_dict() for produto in data]}
            return jsonify(produtos), 200
        except Exception as e:
            return jsonify({'error': f'Não foi possível buscar produtos. Erro: {str(e)}'}), 405

    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_produto_id = data['codigo']
            put_produto = Produtos.query.get(put_produto_id)
            if not put_produto:
                return jsonify({'error': 'Produto não encontrado'}), 404

            put_produto.item = data.get('item', put_produto.item)
            put_produto.tipo = data.get('tipo', put_produto.tipo)
            put_produto.preco_atual = data.get('preco_atual', put_produto.preco_atual)
            put_produto.preco_antigo = data.get('preco_antigo', put_produto.preco_antigo)
            put_produto.status = data.get('status', put_produto.status)
            put_produto.quantidade = data.get('quantidade', put_produto.quantidade)
            put_produto.foto = data.get('foto', put_produto.foto)
            put_produto.observacoes = data.get('observacoes', put_produto.observacoes)
            put_produto.cod_estoque = data.get('cod_estoque', put_produto.cod_estoque)

            db.session.commit()
            return jsonify({'message': 'Produto atualizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao atualizar produto. Erro: {str(e)}'}), 400

    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_produto = Produtos.query.get(codigo)
            if delete_produto is None:
                return jsonify({'error': 'Produto não encontrado'}), 404

            db.session.delete(delete_produto)
            db.session.commit()
            return jsonify({'message': 'Produto deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao deletar produto. Erro: {str(e)}'}), 400