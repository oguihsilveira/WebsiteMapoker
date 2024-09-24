from routes.funcionariosRoutes import funcionarios
from routes.estoqueRoutes import estoque
from routes.usuariosRoutes import usuarios

# Importando a rota de login
from routes.login_usuariosRoutes import login_usuarios

def default_routes(app):
    funcionarios(app)  # Rota para funcionários
    estoque(app)      # Rota para estoque
    usuarios(app)     # Rota para usuários
    login_usuarios(app)  # Rota para login de usuários
