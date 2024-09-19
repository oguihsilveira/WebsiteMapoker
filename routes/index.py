from routes.comprasRoutes import compras
from routes.contas_a_pagarRoutes import contas_a_pagar
from routes.fornecedoresRoutes import fornecedores
from routes.funcionariosRoutes import funcionarios
from routes.estoqueRoutes import estoque
from routes.parcelas_a_pagarRoutes import parcelas_a_pagar
from routes.produtosRoutes import produtos
from routes.usuariosRoutes import usuarios


def default_routes(app):
    compras(app)
    contas_a_pagar(app)
    fornecedores(app)
    funcionarios(app)
    estoque(app)
    parcelas_a_pagar(app)
    produtos(app)
    usuarios(app)