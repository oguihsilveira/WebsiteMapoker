# produtosController.py

from flask import request, jsonify
from models.estoque import Estoque  # Importar a model de Estoque para ForeignKey
from models.produtos import Produtos
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.utils import secure_filename

db = SQLAlchemy()

UPLOAD_FOLDER = 'static/uploads/'  # Define a pasta onde as imagens serão salvas
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # Extensões permitidas

# Função auxiliar para verificar a extensão do arquivo
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def produtosController():
    if request.method == 'POST':
        try:
            codigo = request.form.get('codigo')
            item = request.form.get('item')
            tipo = request.form.get('tipo')
            preco_atual = request.form.get('preco_atual')
            preco_antigo = request.form.get('preco_antigo')
            status = request.form.get('status')
            quantidade = request.form.get('quantidade')
            cod_estoque = request.form.get('cod_estoque')
            observacoes = request.form.get('observacoes')

            # Manipulação do arquivo de upload
            if 'foto' not in request.files:
                return jsonify({'message': 'No file part'}), 400
            file = request.files['foto']
            if file.filename == '':
                return jsonify({'message': 'No selected file'}), 400
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                foto = os.path.join(UPLOAD_FOLDER, filename)
            else:
                return jsonify({'message': 'File extension not allowed'}), 400

            novo_produto = Produtos(
                codigo=codigo,
                item=item,
                tipo=tipo,
                preco_atual=preco_atual,
                preco_antigo=preco_antigo,
                status=status,
                quantidade=quantidade,
                foto=foto,
                observacoes=observacoes,
                cod_estoque=cod_estoque
            )

            db.session.add(novo_produto)
            db.session.commit()
            return jsonify({'message': 'Produto cadastrado com sucesso!'}), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    elif request.method == 'GET':
        try:
            produtos = Produtos.query.all()
            output = []
            for produto in produtos:
                produto_data = {
                    'codigo': produto.codigo,
                    'item': produto.item,
                    'tipo': produto.tipo,
                    'preco_atual': produto.preco_atual,
                    'preco_antigo': produto.preco_antigo,
                    'status': produto.status,
                    'quantidade': produto.quantidade,
                    'foto': produto.foto,  # Inclui o campo foto na resposta
                    'observacoes': produto.observacoes,
                    'cod_estoque': produto.cod_estoque
                }
                output.append(produto_data)
            return jsonify({'produtos': output}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif request.method == 'PUT':
        try:
            data = request.form
            produto = Produtos.query.filter_by(codigo=data['codigo']).first()

            if not produto:
                return jsonify({'message': 'Produto não encontrado'}), 404

            produto.item = data.get('item', produto.item)
            produto.tipo = data.get('tipo', produto.tipo)
            produto.preco_atual = data.get('preco_atual', produto.preco_atual)
            produto.preco_antigo = data.get('preco_antigo', produto.preco_antigo)
            produto.status = data.get('status', produto.status)
            produto.quantidade = data.get('quantidade', produto.quantidade)
            produto.cod_estoque = data.get('cod_estoque', produto.cod_estoque)
            produto.observacoes = data.get('observacoes', produto.observacoes)

            # Atualiza a foto se um novo arquivo for enviado
            if 'foto' in request.files:
                file = request.files['foto']
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    file.save(os.path.join(UPLOAD_FOLDER, filename))
                    produto.foto = os.path.join(UPLOAD_FOLDER, filename)

            db.session.commit()
            return jsonify({'message': 'Produto atualizado com sucesso!'}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500

    elif request.method == 'DELETE':
        try:
            codigo = request.form['codigo']
            produto = Produtos.query.filter_by(codigo=codigo).first()
            if not produto:
                return jsonify({'message': 'Produto não encontrado'}), 404

            db.session.delete(produto)
            db.session.commit()
            return jsonify({'message': 'Produto excluído com sucesso!'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500