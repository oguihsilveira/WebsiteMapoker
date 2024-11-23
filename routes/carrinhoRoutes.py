from flask import Flask
from controllers.carrinhoController import get_pedidos;
""" from controllers.carrinhoController import delete_pedido """

def carrinho(app):
    app.route('/carrinho/pedidos', methods=['GET'])(get_pedidos)
    """ app.route('/carrinho/pedidos', methods=['DELETE'])(delete_pedido) """

