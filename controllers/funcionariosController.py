from flask import request, jsonify
from database.db import db
from models.funcionarios import Funcionarios

def funcionariosController():
    # Método POST
    if request.method == 'POST':
        try:
            print(data)
            data = request.get_json()
            funcionarios = Funcionarios(codigo=data['codigo'], nome=data['nome'], email=data['email'], datanasc=data['datanasc'], cargo=data['cargo'], salario=data['salario'], endereco=data['endereco'], carga_horaria=data['carga_horaria'])
            db.session.add(funcionarios)
            db.session.commit()
            return jsonify({'message': 'Funcionario inserido com sucesso'}), 200
        except Exception as e:
            return jsonify({'error': 'Erro ao cadastrar Funcionario. Erro: {}'.format(str(e))}), 400
    
    # Método GET
    elif request.method == 'GET':
        try:
            data = Funcionarios.query.all()
            funcionario = {'funcionarios': [funcionarios.to_dict() for funcionarios in data]}
            return funcionario

        except Exception as e:
            return 'Não foi possível buscar Funcionários. Error: {}'.format(str(e)), 405

    # Método PUT
    elif request.method == 'PUT':
            try:
                data = request.get_json()
                put_funcionarios_id = data['codigo']
                put_funcionarios = Funcionarios.query.get(put_funcionarios_id)
                if put_funcionarios is None:
                    return {'error': 'Funcionario não encontrado'}, 404
                put_funcionarios.nome = data.get('nome', put_funcionarios.nome)
                put_funcionarios.email = data.get('email', put_funcionarios.email)
                put_funcionarios.datanasc = data.get('datanasc', put_funcionarios.datanasc)
                put_funcionarios.cargo = data.get('cargo', put_funcionarios.cargo)
                put_funcionarios.salario = data.get('salario', put_funcionarios.salario)
                put_funcionarios.endereco = data.get('endereco', put_funcionarios.endereco)
                put_funcionarios.carga_horaria = data.get('carga_horaria', put_funcionarios.carga_horaria)
                # print
                print(put_funcionarios.nome, put_funcionarios.email, put_funcionarios.datanasc, put_funcionarios.cargo, put_funcionarios.salario, put_funcionarios.endereco, put_funcionarios.carga_horaria)
                db.session.commit()
                return 'Funcionario alterado com sucesso', 200
            except Exception as e:
                return {'error': 'Erro ao atualizar Funcionario. Erro{}'.format(e)}, 400

    # Método DELETE
    elif request.method == 'DELETE':
        try:
            codigo = request.args.get('codigo')
            delete_funcionario = Funcionarios.query.get(codigo)
            if delete_funcionario is None:
                return {'error': 'Funcionario não encontrado'}, 404
            db.session.delete(delete_funcionario)
            db.session.commit()
            return 'Funcionario deletado com sucesso', 200
        except Exception as e:
            return {'error': 'Erro ao deletar Funcionario. Erro{}'.format(e)}, 400