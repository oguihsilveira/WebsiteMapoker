from controllers.pedidosController import pedidosController

def pedidos(app):
    app.route('/pedidos', methods=['POST', 'GET', 'PUT', 'DELETE'])(pedidosController)