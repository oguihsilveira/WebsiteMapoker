from controllers.estoqueController import estoqueController

def estoque(app):
    app.route('/prodestoque', methods=['POST', 'GET', 'PUT', 'DELETE'])(estoqueController)