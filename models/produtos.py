from database.db import db

class Produtos(db.Model):
    
    def to_dict(self):
        return {
            'codigo'        : self.codigo,
            'item'          : self.item,
            'tipo'          : self.tipo,
            'preco_padrao'  : self.preco_padrao,  # Alterado
            'desconto'      : self.desconto,  # Alterado
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
    preco_padrao    = db.Column(db.Float(precision=2), nullable=False)  # Alterado
    desconto        = db.Column(db.Integer)  # Alterado
    status          = db.Column(db.String(50), nullable=False)
    quantidade      = db.Column(db.Integer, nullable=False)
    foto            = db.Column(db.String(255), nullable=False)
    observacoes     = db.Column(db.String(255), nullable=False)
    cod_estoque     = db.Column(db.Integer, db.ForeignKey('estoque.codigo'), nullable=False)

    # Construtor
    def __init__(self, codigo, item, tipo, preco_padrao, desconto, status, quantidade, foto, observacoes, cod_estoque):
        self.codigo         = codigo
        self.item           = item
        self.tipo           = tipo
        self.preco_padrao   = preco_padrao  # Alterado
        self.desconto       = desconto  # Alterado
        self.status         = status
        self.quantidade     = quantidade
        self.foto           = foto
        self.observacoes    = observacoes
        self.cod_estoque    = cod_estoque