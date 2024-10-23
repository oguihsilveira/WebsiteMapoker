from controllers.clientesController import clientesController

def clientes(app):
    app.route('/clientes', methods=['POST', 'GET', 'PUT', 'DELETE'])(clientesController)