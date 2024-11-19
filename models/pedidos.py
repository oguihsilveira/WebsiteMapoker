from sqlalchemy.orm import relationship
from database.db import db

class Pedidos(db.Model):
    def to_dict(self):
        return {
            'codigo': self.codigo,
            'item': self.item,
            'quantidade': self.quantidade,
            'destinatario': self.destinatario,
            'endereco': self.endereco,
            'tipo_pgto': self.tipo_pgto,
            'qntd_parcelas': self.qntd_parcelas,
            'data_compra': self.data_compra,
            'valor_compra': self.valor_compra,
            'valor_parcela': self.valor_parcela,
            'status': self.status,
            'cod_produto': self.cod_produto,
            'cod_cliente': self.cod_cliente,
            'produto': self.produto.to_dict() if self.produto else None  # Adiciona detalhes do produto relacionado
        }

    codigo = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    item = db.Column(db.String(100), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    destinatario = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(100), nullable=False)
    tipo_pgto = db.Column(db.String(100), nullable=False)
    qntd_parcelas = db.Column(db.Integer, nullable=False)
    data_compra = db.Column(db.Date, nullable=False)
    valor_compra = db.Column(db.Float, nullable=False)
    valor_parcela = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False)

    # Adiciona a ForeignKey para Produtos
    cod_produto = db.Column(db.Integer, db.ForeignKey('produtos.codigo'), nullable=False)
    cod_cliente = db.Column(db.Integer, nullable=False)

    # Relacionamento com Produtos
    produto = relationship('Produtos', backref='pedidos')

    def __init__(self, item, quantidade, destinatario, endereco, qntd_parcelas, tipo_pgto, data_compra, valor_compra, valor_parcela, status, cod_produto, cod_cliente):
        self.item = item
        self.quantidade = quantidade
        self.destinatario = destinatario
        self.endereco = endereco
        self.tipo_pgto = tipo_pgto
        self.qntd_parcelas = qntd_parcelas
        self.data_compra = data_compra
        self.valor_compra = valor_compra
        self.valor_parcela = valor_parcela
        self.status = status
        self.cod_produto = cod_produto
        self.cod_cliente = cod_cliente