from flask import request, jsonify
from database.db import db
from models.pedidos import Pedidos  # Certifique-se de ter um modelo Pedidos definido
from models.produtos import Produtos  # Para verificar relação com produtos
from models.clientes import Clientes  # Para verificar relação com clientes

def pedidosController():
    if request.method == 'POST':
        try:
            data = request.get_json()

            # Verifica se todos os campos obrigatórios estão preenchidos
            required_fields = ['item', 'destinatario', 'endereco', 'tipo_pgto', 'data_compra', 'valor_compra', 'status', 'cod_produto', 'cod_cliente']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field.capitalize()} é obrigatório.'}), 400

            # Verifica se o produto e o cliente existem
            produto = Produtos.query.get(data['cod_produto'])
            cliente = Clientes.query.get(data['cod_cliente'])
            if not produto:
                return jsonify({'error': 'Produto não encontrado.'}), 404
            if not cliente:
                return jsonify({'error': 'Cliente não encontrado.'}), 404

            # Cria um novo pedido com status
            pedido = Pedidos(
                item=data['item'],
                destinatario=data['destinatario'],
                endereco=data['endereco'],
                tipo_pgto=data['tipo_pgto'],
                data_compra=data['data_compra'],
                valor_compra=data['valor_compra'],
                status="em andamento",  # Garantindo que o status seja "em andamento"
                cod_produto=data['cod_produto'],
                cod_cliente=data['cod_cliente']
            )
            db.session.add(pedido)
            db.session.commit()
            return jsonify({'message': 'Pedido criado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao criar pedido. Erro: {str(e)}'}), 400

    elif request.method == 'GET':
        try:
            # Busca todos os pedidos
            data = Pedidos.query.all()
            pedidos = {'pedidos': [pedido.to_dict() for pedido in data]}
            return jsonify(pedidos), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao buscar pedidos. Erro: {str(e)}'}), 400

    elif request.method == 'PUT':
        try:
            data = request.get_json()

            # Verifica se o código foi passado
            if not data.get('codigo'):
                return jsonify({'error': 'Código do pedido é obrigatório.'}), 400

            # Busca o pedido pelo código
            pedido = Pedidos.query.get(data['codigo'])
            if not pedido:
                return jsonify({'error': 'Pedido não encontrado.'}), 404

            # Atualiza os campos do pedido, incluindo o status
            pedido.item = data.get('item', pedido.item)
            pedido.destinatario = data.get('destinatario', pedido.destinatario)
            pedido.endereco = data.get('endereco', pedido.endereco)
            pedido.tipo_pgto = data.get('tipo_pgto', pedido.tipo_pgto)
            pedido.data_compra = data.get('data_compra', pedido.data_compra)
            pedido.valor_compra = data.get('valor_compra', pedido.valor_compra)
            pedido.status = data.get('status', pedido.status)  # Atualiza o campo status
            pedido.cod_produto = data.get('cod_produto', pedido.cod_produto)
            pedido.cod_cliente = data.get('cod_cliente', pedido.cod_cliente)
            
            db.session.commit()
            return jsonify({'message': 'Pedido atualizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao atualizar pedido. Erro: {str(e)}'}), 400

    elif request.method == 'DELETE':
        try:
            # Recebe o código do pedido a ser deletado
            codigo = request.args.get('codigo')
            pedido = Pedidos.query.get(codigo)

            if not pedido:
                return jsonify({'error': 'Pedido não encontrado.'}), 404

            # Remove o pedido
            db.session.delete(pedido)
            db.session.commit()
            return jsonify({'message': 'Pedido deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao deletar pedido. Erro: {str(e)}'}), 400