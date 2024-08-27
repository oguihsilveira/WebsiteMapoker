from controllers.contas_a_pagarController import marcasController

def marcas(app):
    app.route('/marcas', methods=['POST', 'GET', 'PUT', 'DELETE'])(marcasController)