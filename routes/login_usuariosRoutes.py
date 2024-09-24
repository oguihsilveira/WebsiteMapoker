from controllers.login_usuariosController import login_usuarios_controller

def login_usuarios(app):
    app.route('/login-usuarios', methods=['POST'])(login_usuarios_controller)
