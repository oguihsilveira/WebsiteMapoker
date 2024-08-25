from controllers.funcionariosController import funcionariosController

def funcionarios(app):
    app.route('/funcionarios', methods=['POST', 'GET', 'PUT', 'DELETE'])(funcionariosController)