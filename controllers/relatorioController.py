from flask import Blueprint, jsonify
from models.estoque import Estoque
from models.pedidos import Pedidos
from database.db import db

relatorioController = Blueprint('relatorioController', __name__)

@relatorioController.route('/gastos', methods=['GET'])
def get_gastos():
    # Calcular o total do estoque multiplicando preco_compra pela quantidade
    total_estoque = db.session.query(
        db.func.sum(Estoque.preco_compra * Estoque.qtde_entrada)
    ).scalar() or 0

    # Total dos pedidos permanece o mesmo, se não precisar de ajuste
    total_pedidos = db.session.query(
        db.func.sum(Pedidos.valor_compra)
    ).scalar() or 0

    print("Total Estoque (ajustado):", total_estoque)
    print("Total Pedidos:", total_pedidos)

    return jsonify({
        'gasto_estoque': total_estoque,
        'gasto_pedidos': total_pedidos
    })
