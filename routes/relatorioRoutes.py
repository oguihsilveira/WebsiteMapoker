from controllers.relatorioController import relatorioController

def relatorio(app):
    app.register_blueprint(relatorioController, url_prefix='/relatorio')
