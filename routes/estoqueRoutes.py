from controllers.estoqueController import estoqueController

def estoque(app):
    app.route('/estoque', methods=['POST', 'GET', 'PUT', 'DELETE'])(estoqueController)