#produtosController.py
from flask import request, jsonify
from database.db import db
from models.produtos import Produtos
from models.estoque import Estoque  # Importe o modelo de Estoque
from models.clientes import Clientes

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

# Verifica se o diretório de upload existe
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

#Busca de produtos por código
def get_produto(codigo):
    produto = Produtos.query.get(codigo)  # Busca o produto pelo código
    if produto:
        return jsonify(produto.to_dict()), 200  # Supondo que você tenha um método to_dict() no modelo
    else:
        return jsonify({'error': 'Produto não encontrado'}), 404  # Retorna 404 se o produto não existir

# Função para limpar arquivos órfãos na pasta uploads
def clean_orphan_files():
    try:
        # Lista de arquivos de foto atualmente no banco de dados
        db_files = {produto.foto for produto in Produtos.query.with_entities(Produtos.foto).all()}
        
        # Verifica os arquivos na pasta de uploads
        for filename in os.listdir(UPLOAD_FOLDER):
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            
            # Remove o arquivo se não estiver na lista de fotos do banco de dados
            if filename not in db_files and os.path.isfile(file_path):
                os.remove(file_path)
                print(f"Arquivo órfão removido: {filename}")
    except Exception as e:
        print(f"Erro ao limpar arquivos órfãos: {str(e)}")

def produtosController():
    if request.method == 'POST':
        try:
            data = request.form

            # Verifica se todos os campos obrigatórios estão preenchidos
            required_fields = ['codigo', 'item', 'tipo', 'preco_padrao', 'status', 'quantidade', 'observacoes', 'cod_estoque']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field.capitalize()} é obrigatória.'}), 400

            # Verifica se o código já existe
            existing_item = Produtos.query.get(data['codigo'])
            if existing_item:
                return jsonify({'error': 'Código já existe'}), 409  # Código duplicado

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
                preco_padrao=data['preco_padrao'],  # Alterado
                desconto=int(data.get('desconto', 0)),  # Ajuste para tratar 0 como default
                status=data['status'],
                quantidade=data['quantidade'],
                foto=new_filename,  # Salva o novo nome do arquivo
                observacoes=data['observacoes'],
                cod_estoque=data['cod_estoque'],
            )
            db.session.add(produto_item)
            db.session.commit()

            # Limpa arquivos órfãos após a inserção
            clean_orphan_files()

            return jsonify({'message': 'Produto inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao cadastrar produto. Erro: {str(e)}'}), 400

    elif request.method == 'GET':
        try:
            # Verifica se um código específico foi fornecido
            codigo = request.view_args.get('codigo')
            if codigo:
                produto = Produtos.query.get(codigo)
                if produto:
                    return jsonify(produto.to_dict()), 200
                else:
                    return jsonify({'error': 'Produto não encontrado'}), 404
                
            # Busca todos os produtos e converte em um dicionário
            data = Produtos.query.all()
            produtos = []
            
            # Cria o caminho absoluto para as imagens
            base_url = 'http://localhost:3000/uploads/'  # Ajuste para o URL do seu servidor

            for item in data:
                produto_dict = item.to_dict()
                
                # Adiciona a lógica de exibição "Sem desconto" caso desconto seja 0 ou None
                produto_dict['desconto'] = "Sem desconto" if produto_dict['desconto'] in (0, None) else f"{produto_dict['desconto']}%"
                
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

            # Atualiza os campos conforme os dados fornecidos, considerando valores 0 e None
            put_produto.item = data.get('item', put_produto.item)
            put_produto.tipo = data.get('tipo', put_produto.tipo)
            put_produto.preco_padrao = float(data.get('preco_padrao', put_produto.preco_padrao)) if data.get('preco_padrao') not in (None, '') else put_produto.preco_padrao
            put_produto.desconto = int(data.get('desconto', put_produto.desconto)) if data.get('desconto') is not None else put_produto.desconto
            put_produto.status = data.get('status', put_produto.status)
            put_produto.quantidade = int(data.get('quantidade', put_produto.quantidade)) if data.get('quantidade') not in (None, '') else put_produto.quantidade
            put_produto.observacoes = data.get('observacoes', put_produto.observacoes)
            put_produto.cod_estoque = int(data.get('cod_estoque', put_produto.cod_estoque)) if data.get('cod_estoque') not in (None, '') else put_produto.cod_estoque

            db.session.commit()

            # Limpa arquivos órfãos após a atualização
            clean_orphan_files()

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

            # Limpa arquivos órfãos após a exclusão
            clean_orphan_files()

            return jsonify({'message': 'Produto deletado com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': f'Erro ao deletar produto. Erro: {str(e)}'}), 400