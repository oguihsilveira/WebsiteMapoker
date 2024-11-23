from flask import request, jsonify
from database.db import db
from sqlalchemy.orm import joinedload
from models.pedidos import Pedidos
from models.produtos import Produtos
from models.clientes import Clientes
import datetime

def pedidosController():
    if request.method == 'POST':
        try:
            data = request.get_json()

            # Verifica se todos os campos obrigatórios estão preenchidos
            required_fields = ['item', 'quantidade', 'destinatario', 'endereco', 'tipo_pgto', 'qntd_parcelas', 'data_compra', 'valor_compra', 'status', 'cod_produto', 'cod_cliente']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field.capitalize()} é obrigatório.'}), 400

            # Verifica se o formato do campo 'data_compra' está correto (por exemplo, 'YYYY-MM-DD')
            try:
                data_compra = datetime.datetime.strptime(data['data_compra'], '%Y-%m-%d')
            except ValueError:
                return jsonify({'error': 'Formato de data_compra inválido. Use o formato YYYY-MM-DD.'}), 400

            # Remove qualquer dependência do campo 'codigo' enviado pelo cliente
            if 'codigo' in data:
                data.pop('codigo')

            # Verifica se 'valor_compra' é um número positivo
            try:
                valor_compra = float(data['valor_compra'])
                if valor_compra <= 0:
                    return jsonify({'error': 'Valor de compra deve ser maior que 0.'}), 400
            except ValueError:
                return jsonify({'error': 'Valor de compra inválido.'}), 400

            # Verifica se 'quantidade' é um número positivo
            try:
                quantidade = int(data['quantidade'])
                if quantidade <= 0:
                    return jsonify({'error': 'Quantidade deve ser maior que 0.'}), 400
            except ValueError:
                return jsonify({'error': 'Quantidade inválida.'}), 400

            # Verifica se 'qntd_parcelas' é um número positivo
            try:
                qntd_parcelas = int(data['qntd_parcelas'])
                if qntd_parcelas <= 0:
                    return jsonify({'error': 'Quantidade de parcelas deve ser maior que 0.'}), 400
            except ValueError:
                return jsonify({'error': 'Quantidade de parcelas inválida.'}), 400

            # Calcula o valor da parcela
            valor_parcela = valor_compra / qntd_parcelas

            # Verifica se o produto e o cliente existem
            produto = Produtos.query.get(data['cod_produto'])
            cliente = Clientes.query.get(data['cod_cliente'])
            if not produto:
                return jsonify({'error': 'Produto não encontrado.'}), 404
            if not cliente:
                return jsonify({'error': 'Cliente não encontrado.'}), 404

            # Cria um novo pedido com os dados recebidos
            # Cria um novo pedido com os dados recebidos
            pedido = Pedidos(
                item=data['item'],
                quantidade=quantidade,
                destinatario=data['destinatario'],
                endereco=data['endereco'],
                tipo_pgto=data['tipo_pgto'],
                qntd_parcelas=qntd_parcelas,
                data_compra=data_compra,
                valor_compra=valor_compra,
                valor_parcela=valor_parcela,  # Calculado com base no valor total e quantidade de parcelas
                status="em andamento",  # Garantindo que o status seja "em andamento"
                cod_produto=data['cod_produto'],
                cod_cliente=data['cod_cliente']
            )

            db.session.add(pedido)
            db.session.commit()
            return jsonify({'message': 'Pedido criado com sucesso'}), 201  # Usando 201 para criação bem-sucedida

        except Exception as e:
            return jsonify({'error': f'Erro ao criar pedido. Erro: {str(e)}'}), 500

    elif request.method == 'GET':
        try:
            # Busca os pedidos com a junção do produto
            data = Pedidos.query.options(joinedload(Pedidos.produto)).all()

            # Transforma os dados em dicionário e inclui as informações do produto
            pedidos = {
                'pedidos': [
                    {
                        **pedido.to_dict(),
                        'produto': pedido.produto.to_dict()  # Inclui o produto relacionado
                    }
                    for pedido in data
                ]
            }
            return jsonify(pedidos), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao buscar pedidos. Erro: {str(e)}'}), 500
        
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

            # Atualiza os campos do pedido, incluindo a quantidade
            pedido.item = data.get('item', pedido.item)
            pedido.quantidade = data.get('quantidade', pedido.quantidade)
            pedido.destinatario = data.get('destinatario', pedido.destinatario)
            pedido.endereco = data.get('endereco', pedido.endereco)
            pedido.tipo_pgto = data.get('tipo_pgto', pedido.tipo_pgto)
            pedido.qntd_parcelas = data.get('qntd_parcelas', pedido.qntd_parcelas)
            pedido.data_compra = data.get('data_compra', pedido.data_compra)
            pedido.valor_compra = data.get('valor_compra', pedido.valor_compra)
            pedido.valor_parcela = data.get('valor_parcela', pedido.valor_parcela)
            pedido.status = data.get('status', pedido.status)  # Atualiza o campo status
            pedido.cod_produto = data.get('cod_produto', pedido.cod_produto)
            pedido.cod_cliente = data.get('cod_cliente', pedido.cod_cliente)

            db.session.commit()
            return jsonify({'message': 'Pedido atualizado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao atualizar pedido. Erro: {str(e)}'}), 500

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
            return jsonify({'error': f'Erro ao deletar pedido. Erro: {str(e)}'}), 500