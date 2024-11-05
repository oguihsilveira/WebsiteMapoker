from controllers.produtosController import produtosController
from controllers.produtosController import get_produto

def produtos(app):
    app.route('/produtos', methods=['POST', 'GET', 'PUT', 'DELETE'])(produtosController)
    app.route('/produtos/<int:codigo>', methods=['GET'])(get_produto)  # Rota para obter um produto específico  # Rota específica para um produto
