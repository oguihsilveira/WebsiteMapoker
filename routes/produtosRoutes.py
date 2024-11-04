from controllers.produtosController import produtosController

def produtos(app):
    app.route('/produtos', methods=['POST', 'GET', 'PUT', 'DELETE'])(produtosController)
    app.route('/produtos/<int:codigo>', methods=['GET'])(produtosController)  # Rota específica para um produto
