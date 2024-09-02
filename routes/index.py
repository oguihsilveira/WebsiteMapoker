from routes.comprasRoutes import compras
from routes.contas_a_pagarRoutes import contas_a_pagar
from routes.fornecedoresRoutes import fornecedores
from routes.funcionariosRoutes import funcionarios
from routes.mvto_estoqueRoutes import mvto_estoque
from routes.parcelas_a_pagarRoutes import parcelas_a_pagar
from routes.produtosRoutes import produtos
from routes.usuariosRoutes import usuarios


def default_routes(app):
    compras(app)
    contas_a_pagar(app)
    fornecedores(app)
    funcionarios(app)
    mvto_estoque(app)
    parcelas_a_pagar(app)
    produtos(app)
    usuarios(app)