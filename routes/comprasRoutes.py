from controllers.comprasController import comprasController

def compras(app):
    app.route('/compras', methods=['POST', 'GET', 'PUT', 'DELETE'])(comprasController)