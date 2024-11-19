from controllers.pedidosController import pedidosController, get_pedidos

def pedidos(app):
    # Associa o controlador genérico a todas as requisições que não sejam GET
    app.route('/pedidos', methods=['POST', 'GET', 'PUT', 'DELETE'])(pedidosController)
    # Associa a função get_pedidos às requisições GET
    app.route('/pedidos', methods=['GET'])(get_pedidos)
