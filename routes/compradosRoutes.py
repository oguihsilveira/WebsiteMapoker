from controllers.compradosController import compradosController

def comprados(app):
    app.route('/comprados', methods=['POST', 'GET', 'PUT', 'DELETE'])(compradosController)