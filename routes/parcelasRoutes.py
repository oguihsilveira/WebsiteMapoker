from controllers.parcelasController import parcelasController

def parcelas(app):
    app.route('/parcelas', methods=['POST', 'GET', 'PUT', 'DELETE'])(parcelasController)