from controllers.produtosController import produtosController

def produtos(app):
    app.route('/produtos', methods=['POST', 'GET', 'PUT', 'DELETE'])(produtosController)