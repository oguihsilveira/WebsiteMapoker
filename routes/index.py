from routes.funcionariosRoutes import funcionarios
from routes.usuariosRoutes import usuarios
from routes.estoqueRoutes import estoque
from routes.produtosRoutes import produtos

# Importando a rota de login
from routes.login_usuariosRoutes import login_usuarios

def default_routes(app):
    funcionarios(app)  # Rota para funcionários
    usuarios(app)     # Rota para usuários
    estoque(app)      # Rota para estoque
    produtos(app)
    #clientes(app)
    #pedidos(app)
    #pagamentos(app)
    #parcelas(app)
    login_usuarios(app)  # Rota para login de usuários
