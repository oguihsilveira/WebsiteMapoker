from controllers.mvto_estoqueController import mvto_estoqueController

def mvto_estoque(app):
    app.route('/mvto_estoque', methods=['POST', 'GET', 'PUT', 'DELETE'])(mvto_estoqueController)