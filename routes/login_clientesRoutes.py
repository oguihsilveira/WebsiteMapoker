from controllers.login_clientesController import login_clientesController

def login_clientes(app):
    app.route('/login-clientes', methods=['POST'])(login_clientesController)