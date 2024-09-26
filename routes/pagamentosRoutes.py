from controllers.pagamentosController import pagamentosController

def pagamentos(app):
    app.route('/pagamentos', methods=['POST', 'GET', 'PUT', 'DELETE'])(pagamentosController)