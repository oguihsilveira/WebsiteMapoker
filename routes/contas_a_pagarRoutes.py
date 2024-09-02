from controllers.contas_a_pagarController import contas_a_pagarController

def contas_a_pagar(app):
    app.route('/contas_a_pagar', methods=['POST', 'GET', 'PUT', 'DELETE'])(contas_a_pagarController)