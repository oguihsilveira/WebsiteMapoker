from flask import request, jsonify
from database.db import db
from models.produtos import Produtos
from models.estoque import Estoque  # Importe o modelo de Estoque
import os
from werkzeug.utils import secure_filename
import hashlib
import time

# Definir o caminho para a pasta de uploads e extensões permitidas
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '../uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Função para verificar se a extensão do arquivo é permitida
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def produtosController():
    if request.method == 'POST':
        try:
            data = request.form

            # Verifica se todos os campos obrigatórios estão preenchidos
            required_fields = ['codigo', 'item', 'tipo', 'preco_atual', 'status', 'quantidade', 'observacoes', 'cod_estoque']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field.capitalize()} é obrigatória.'}), 400

            # Verifica se o código já existe
            existing_item = Produtos.query.get(data['codigo'])
            if existing_item:
                return jsonify({'error': 'Código já existe'}), 409  # Código duplicado
            
            # Adicione a verificação da quantidade do estoque
            cod_estoque = data['cod_estoque']
            estoque_item = Estoque.query.get(cod_estoque)

            if not estoque_item:
                return jsonify({'error': 'Código de estoque inválido.'}), 400

            # Verifique se a quantidade do produto não excede a quantidade do estoque
            if int(data['quantidade']) > estoque_item.quantidade:
                return jsonify({'error': 'A quantidade do produto não pode exceder a quantidade em estoque.'}), 400

            # Tratamento para o arquivo de foto
            if 'foto' not in request.files:
                return jsonify({'error': 'Foto é obrigatória.'}), 400

            file = request.files['foto']
            if file.filename == '':
                return jsonify({'error': 'Nenhum arquivo selecionado.'}), 400

            if file and allowed_file(file.filename):
                # Cria um nome único para o arquivo
                file_extension = file.filename.rsplit('.', 1)[1].lower()
                hashed_filename = hashlib.sha256(f"{file.filename}_{time.time()}".encode()).hexdigest()  # Gera um hash
                new_filename = f"{hashed_filename}.{file_extension}"  # Novo nome com extensão
                file.save(os.path.join(UPLOAD_FOLDER, new_filename))
            else:
                return jsonify({'error': 'Tipo de arquivo não permitido.'}), 400

            # Cria novo produto
            produto_item = Produtos(
                codigo=data['codigo'],
                item=data['item'],
                tipo=data['tipo'],
                preco_atual=data['preco_atual'],
                preco_antigo=data.get('preco_antigo', None),
                status=data['status'],
                quantidade=data['quantidade'],
                foto=new_filename,  # Salva o novo nome do arquivo
                observacoes=data['observacoes'],
                cod_estoque=data['cod_estoque'],
            )
            db.session.add(produto_item)
            db.session.commit()
            return jsonify({'message': 'Produto inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao cadastrar produto. Erro: {str(e)}'}), 400

    if request.method == 'GET':
        try:
            # Busca todos os produtos e converte em um dicionário
            data = Produtos.query.all()
            produtos = []
            
            # Cria o caminho absoluto para as imagens
            base_url = 'http://localhost:3000/uploads/'  # Ajuste para o URL do seu servidor

            # No método GET, ao buscar produtos
            for item in data:
                produto_dict = item.to_dict()
                produto_dict['foto'] = base_url + produto_dict['foto']
                
                # Adiciona a quantidade disponível do estoque
                estoque_item = Estoque.query.get(produto_dict['cod_estoque'])
                produto_dict['quantidade_disponivel'] = estoque_item.quantidade if estoque_item else 0
                
                produtos.append(produto_dict)

            for item in data:
                produto_dict = item.to_dict()
                produto_dict['foto'] = base_url + produto_dict['foto']  # Inclui o caminho completo da imagem
                produtos.append(produto_dict)

            return jsonify({'produtos': produtos}), 200
        except Exception as e:
            return jsonify({'error': f'Não foi possível buscar os produtos. Erro: {str(e)}'}), 405

    elif request.method == 'PUT':
        try:
            data = request.form

            # Verifica se o código foi passado
            if not data.get('codigo'):
                return jsonify({'error': 'Código é obrigatório.'}), 400

            # Busca o produto pelo código
            put_produto = Produtos.query.get(data['codigo'])
            if put_produto is None:
                return jsonify({'error': 'Produto não encontrado.'}), 404

            # Tratamento para o arquivo de foto (opcional)
            if 'foto' in request.files:
                file = request.files['foto']
                if file.filename != '' and allowed_file(file.filename):
                    file_extension = file.filename.rsplit('.', 1)[1].lower()
                    hashed_filename = hashlib.sha256(f"{file.filename}_{time.time()}".encode()).hexdigest()
                    new_filename = f"{hashed_filename}.{file_extension}"
                    file.save(os.path.join(UPLOAD_FOLDER, new_filename))
                    put_produto.foto = new_filename  # Atualiza o campo foto

            # Atualiza os campos conforme os dados fornecidos
            put_produto.item = data.get('item', put_produto.item)
            put_produto.tipo = data.get('tipo', put_produto.tipo)
            put_produto.preco_atual = data.get('preco_atual', put_produto.preco_atual)
            put_produto.preco_antigo = data.get('preco_antigo', put_produto.preco_antigo)
            put_produto.status = data.get('status', put_produto.status)
            put_produto.quantidade = data.get('quantidade', put_produto.quantidade)
            put_produto.observacoes = data.get('observacoes', put_produto.observacoes)
            put_produto.cod_estoque = data.get('cod_estoque', put_produto.cod_estoque)

            db.session.commit()
            return jsonify({'message': 'Produto alterado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao atualizar produto. Erro: {str(e)}'}), 400

    elif request.method == 'DELETE':
        try:
            # Recebe o código do produto a ser deletado
            codigo = request.args.get('codigo')
            delete_item = Produtos.query.get(codigo)

            if delete_item is None:
                return jsonify({'error': 'Produto não encontrado.'}), 404

            # Remove o produto do banco de dados
            db.session.delete(delete_item)
            db.session.commit()
            return jsonify({'message': 'Produto deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao deletar produto. Erro: {str(e)}'}), 400