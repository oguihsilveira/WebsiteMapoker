from database.db import db

class Contas(db.Model):
    def to_dict(self):
        return {
            'codigo'           : self.codigo,
            'data_emissao'     : self.data_emissao,
            'data_final_pagto' : self.data_final_pagto,
            'valor_total'      : self.valor_total,
            'tipo_pagto'       : self.tipo_pagto,
            'taxa_icms'        : self.taxa_icms,
            'cod_compra'       : self.cod_compra
        }
    
    codigo            = db.Column(db.Integer, primary_key=True, nullable=False, unique=True)
    data_emissao      = db.Column(db.Date)
    data_final_pagto  = db.Column(db.Date)
    valor_total       = db.Column(db.Float)
    tipo_pagto        = db.Column(db.String(50))
    taxa_icms         = db.Column(db.Float)
    cod_compra        = db.Column(db.Integer)

    def __init__(self, codigo, data_emissao, data_final_pagto, valor_total, tipo_pagto, taxa_icms, cod_compra):
        self.codigo           = codigo
        self.data_emissao     = data_emissao
        self.data_final_pagto = data_final_pagto
        self.valor_total      = valor_total
        self.tipo_pagto       = tipo_pagto
        self.taxa_icms        = taxa_icms
        self.cod_compra       = cod_compra
