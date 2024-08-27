from routes.comprasRoutes import comprados
from routes.mvto_estoqueRoutes import estoque
from routes.fornecedoresRoutes import fornecedores
from routes.funcionariosRoutes import funcionarios
from routes.contas_a_pagarRoutes import marcas
from routes.produtosRoutes import produtos
from routes.usuariosRoutes import usuarios


def default_routes(app):
    comprados(app)
    estoque(app)
    fornecedores(app)
    funcionarios(app)
    marcas(app)
    produtos(app)
    usuarios(app)