from controllers.parcelas_a_pagarController import parcelas_a_pagarController

def parcelas_a_pagar(app):
    app.route('/mvto_estoque', methods=['POST', 'GET', 'PUT', 'DELETE'])(parcelas_a_pagarController)