from controllers.parcelas_a_pagarController import parcelas_a_pagarController

def parcelas_a_pagar(app):
    app.route('/parcelas_a_pagar', methods=['POST', 'GET', 'PUT', 'DELETE'])(parcelas_a_pagarController)