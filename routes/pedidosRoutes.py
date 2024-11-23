from controllers.pedidosController import pedidosController

def pedidos(app):
    # Associa o controlador genérico a todas as requisições que não sejam GET
    app.route('/pedidos', methods=['POST', 'GET', 'PUT', 'DELETE'])(pedidosController)
