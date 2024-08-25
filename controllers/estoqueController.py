from flask import request, jsonify
from database.db import db
from models.estoque import Estoque

def estoqueController():
    # Método POST
    if request.method == 'POST':
        try:
            data = request.get_json()
            estoque = Estoque(
                codigo=data['codigo'],
                quantidade=data['quantidade'],
                tipo=data['tipo'],
                codProduto=data['codProduto'],
                codFornecedor=data['codFornecedor'],
                dataEntrada=data['dataEntrada'],
                localizacao=data['localizacao'],
                observacoes=data['observacoes'],
                numeroLote=data['numeroLote'],
                valorUnitario=data['valorUnitario']
            )
            db.session.add(estoque)
            db.session.commit()
            return jsonify({'message': 'Estoque inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar estoque. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Estoque.query.all()
            estoque = {'estoque': [item.to_dict() for item in data]}
            return estoque

        except Exception as e:
            return jsonify({'error': 'Não foi possível buscar estoque. Error: {}'.format(str(e))}), 405
        
    # Método PUT
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_estoque_id = data['codigo']
            put_estoque = Estoque.query.get(put_estoque_id)
            if put_estoque is None:
                return jsonify({'error': 'Estoque não encontrado'}), 404
            
            put_estoque.quantidade = data.get('quantidade', put_estoque.quantidade)
            put_estoque.tipo = data.get('tipo', put_estoque.tipo)
            put_estoque.codProduto = data.get('codProduto', put_estoque.codProduto)
            put_estoque.codFornecedor = data.get('codFornecedor', put_estoque.codFornecedor)
            put_estoque.dataEntrada = data.get('dataEntrada', put_estoque.dataEntrada)
            put_estoque.localizacao = data.get('localizacao', put_estoque.localizacao)
            put_estoque.observacoes = data.get('observacoes', put_estoque.observacoes)
            put_estoque.numeroLote = data.get('numeroLote', put_estoque.numeroLote)
            put_estoque.valorUnitario = data.get('valorUnitario', put_estoque.valorUnitario)

            db.session.commit()
            return jsonify({'message': 'Estoque alterado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao atualizar estoque. Erro: {}'.format(e)}), 400
    
    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_estoque = Estoque.query.get(codigo)
            if delete_estoque is None:
                return jsonify({'error': 'Estoque não encontrado'}), 404
            db.session.delete(delete_estoque)
            db.session.commit()
            return jsonify({'message': 'Estoque deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao deletar estoque. Erro: {}'.format(e)}), 400
