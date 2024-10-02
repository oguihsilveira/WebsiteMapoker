from database.db import db

class Produtos(db.Model):
    
    def to_dict(self):
        return {
            'codigo'        : self.codigo,
            'item'          : self.item,
            'tipo'          : self.tipo,
            'preco_atual'   : self.preco_atual,
            'preco_antigo'  : self.preco_antigo,
            'status'        : self.status,
            'quantidade'    : self.quantidade,
            'foto'          : self.foto,
            'observacoes'   : self.observacoes,
            'cod_estoque'   : self.cod_estoque
        }
    
    # Definição das colunas
    codigo          = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    item            = db.Column(db.String(50), nullable=False)
    tipo            = db.Column(db.String(50), nullable=False)
    preco_atual     = db.Column(db.Float(precision=2), nullable=False)
    preco_antigo    = db.Column(db.Float(precision=2))
    status          = db.Column(db.String(50), nullable=False)
    quantidade      = db.Column(db.Integer, nullable=False)
    foto            = db.Column(db.String(255), nullable=False)
    observacoes     = db.Column(db.String(50), nullable=False)
    cod_estoque     = db.Column(db.Integer, db.ForeignKey('estoque.codigo'), nullable=False)

    # Construtor
    def __init__(self, codigo, item, tipo, preco_atual, preco_antigo, status, quantidade, foto, observacoes, cod_estoque):
        self.codigo         = codigo
        self.item           = item
        self.tipo           = tipo
        self.preco_atual    = preco_atual
        self.preco_antigo   = preco_antigo
        self.status         = status
        self.quantidade     = quantidade
        self.foto           = foto
        self.observacoes    = observacoes
        self.cod_estoque    = cod_estoque