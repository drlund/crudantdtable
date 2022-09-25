/** @format */

import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditar, setIsEditar] = useState(false);
  const [editarAluno, setEditarAluno] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      nome: "Paulo",
      email: "paulo@gmail.com",
      endereco: "Endereço do Paulo",
    },
    {
      id: 2,
      nome: "João",
      email: "joao@gmail.com",
      endereco: "Endereço do João",
    },
    {
      id: 3,
      nome: "Isabela",
      email: "isabela@gmail.com",
      endereco: "Endereço da Isabela",
    },
    {
      id: 4,
      nome: "Patrícia",
      email: "patricia@gmail.com",
      endereco: "Endereço da Patrícia",
    },
  ]);
  
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Nome",
      dataIndex: "nome",
    },
    {
      key: "3",
      title: "E-mail",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Endereço",
      dataIndex: "endereco",
    },
    {
      key: "5",
      title: "Ações",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditarAluno(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onApagartEstudante(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAdicionarAluno = () => {
    const numAleatorio = parseInt(Math.random() * 1000);
    const novoAluno = {
      id: numAleatorio,
      nome: "Nome " + numAleatorio,
      email: numAleatorio + "@gmail.com",
      endereco: "Endereço do " + numAleatorio,
    };
    setDataSource((pre) => {
      return [...pre, novoAluno];
    });
  };

  const onApagartEstudante = (record) => {
    Modal.confirm({
      title: "Tem certeza de que deseja excluir este registro de aluno?",
      cancelText: "Cancelar",
      okText: "Sim",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((aluno) => aluno.id !== record.id);
        });
      },
    });
  };

  const onEditarAluno = (record) => {
    setIsEditar(true);
    setEditarAluno({ ...record });
  };

  const resetaEditar = () => {
    setIsEditar(false);
    setEditarAluno(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAdicionarAluno} style={{marginBottom: 12, fontWeight: 'bold'}}>Adiciona novo aluno</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Editar aluno"
          visible={isEditar}
          okText="Salvar"
          cancelText="Cancelar"
          onCancel={() => {
            resetaEditar()
          }}
          onOk={() => {
            setDataSource(pre => {
              return pre.map(aluno => {
                if(aluno.id === editarAluno.id){
                  return editarAluno
                } else {
                  return aluno
                }
              })
            })
            resetaEditar()
          }}>
          <Input
            value={editarAluno?.nome}
            style={{ marginBottom: 12 }}
            onChange={(e) => {
              setEditarAluno((pre) => {
                return { ...pre, nome: e.target.value };
              });
            }}
          />{" "}
          {/* Sem o sinal de interrogação os valores voltam undefined */}
          <Input
            value={editarAluno?.email}
            style={{ marginBottom: 12 }}
            onChange={(e) => {
              setEditarAluno((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editarAluno?.endereco}
            onChange={(e) => {
              setEditarAluno((pre) => {
                return { ...pre, endereco: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
