from routes.compradosRoutes import comprados
from routes.estoqueRoutes import estoque
from routes.fornecedoresRoutes import fornecedores
from routes.funcionariosRoutes import funcionarios
from routes.marcasRoutes import marcas
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