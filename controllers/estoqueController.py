from flask import request, jsonify
from database.db import db
from models.estoque import Estoque  # Ajuste o import para o seu modelo de Estoque

def estoqueController():
    if request.method == 'POST':
        try:
            data = request.get_json()

            # Verifica se todos os campos obrigatórios estão preenchidos
            required_fields = ['codigo', 'item', 'tipo', 'preco_compra', 'preco_venda', 'data_entrada', 'qtde_entrada', 'cod_funcionario']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field.capitalize()} é obrigatória.'}), 400

            # Verifica se o código já existe
            existing_item = Estoque.query.get(data['codigo'])
            if existing_item:
                return jsonify({'error': 'Código já existe'}), 409  # Código duplicado

            # Cria novo item de estoque
            estoque_item = Estoque(
                codigo=data['codigo'],
                item=data['item'],
                tipo=data['tipo'],
                observacoes=data.get('observacoes', ''),
                preco_compra=data['preco_compra'],
                preco_venda=data['preco_venda'],
                data_entrada=data['data_entrada'],
                qtde_entrada=data['qtde_entrada'],
                cod_funcionario=data['cod_funcionario'],
            )
            db.session.add(estoque_item)
            db.session.commit()
            return jsonify({'message': 'Item do estoque inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao cadastrar item do estoque. Erro: {str(e)}'}), 400

    elif request.method == 'GET':
        try:
            # Busca todos os itens no estoque e converte em um dicionário
            data = Estoque.query.all()
            estoque = {'estoque': [item.to_dict() for item in data]}
            return jsonify(estoque), 200
        except Exception as e:
            return jsonify({'error': f'Não foi possível buscar itens do estoque. Erro: {str(e)}'}), 405

    elif request.method == 'PUT':
        try:
            data = request.get_json()

            # Verifica se o código foi passado
            if not data.get('codigo'):
                return jsonify({'error': 'Código é obrigatório.'}), 400

            # Busca o item pelo código
            put_estoque = Estoque.query.get(data['codigo'])
            if put_estoque is None:
                return jsonify({'error': 'Item do estoque não encontrado.'}), 404

            # Atualiza os campos conforme os dados fornecidos
            put_estoque.item = data.get('item', put_estoque.item)
            put_estoque.tipo = data.get('tipo', put_estoque.tipo)
            put_estoque.observacoes = data.get('observacoes', put_estoque.observacoes)
            put_estoque.preco_compra = data.get('preco_compra', put_estoque.preco_compra)
            put_estoque.preco_venda = data.get('preco_venda', put_estoque.preco_venda)
            put_estoque.data_entrada = data.get('data_entrada', put_estoque.data_entrada)
            put_estoque.qtde_entrada = data.get('qtde_entrada', put_estoque.qtde_entrada)
            put_estoque.cod_funcionario = data.get('cod_funcionario', put_estoque.cod_funcionario)
            
            db.session.commit()
            return jsonify({'message': 'Item do estoque alterado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao atualizar item do estoque. Erro: {str(e)}'}), 400

    elif request.method == 'DELETE':
        try:
            # Recebe o código do item a ser deletado
            codigo = request.args.get('codigo')
            delete_item = Estoque.query.get(codigo)

            if delete_item is None:
                return jsonify({'error': 'Item do estoque não encontrado.'}), 404

            # Remove o item do banco de dados
            db.session.delete(delete_item)
            db.session.commit()
            return jsonify({'message': 'Item do estoque deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao deletar item do estoque. Erro: {str(e)}'}), 400
