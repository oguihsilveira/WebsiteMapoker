from controllers.carrinhoController import get_pedidos, remove_pedido, update_pedido_status

def carrinho(app):
    app.route('/carrinho/pedidos', methods=['GET'])(get_pedidos)
    app.route('/carrinho/pedidos/<int:codigo>', methods=['DELETE'])(remove_pedido)
    app.route('/carrinho/pedidos/<int:codigo>/status', methods=['PUT'])(update_pedido_status)  # Adiciona a rota PUT
