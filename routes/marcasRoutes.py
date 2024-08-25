from controllers.marcasController import marcasController

def marcas(app):
    app.route('/marcas', methods=['POST', 'GET', 'PUT', 'DELETE'])(marcasController)