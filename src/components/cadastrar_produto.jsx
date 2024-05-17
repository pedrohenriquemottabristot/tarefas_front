import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Cadastrar_produto = () => {
  const { register, handleSubmit, reset} = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await api.post("product/createProduct", campos);
      setAviso(`Tarefa cadastrada com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar tarefa!");
    }
  };

  return (
    <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Produto</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group">
            <label htmlFor="titulo">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              autoFocus
              {...register("name")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              {...register("description")}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="price">Preço:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              step="0.01"
              {...register("price")}
            />
          </div>
          {/* <div className="row mt-2">
            <div className="col-sm-4">
              <div className="form-group">
                <label htmlFor="data_criacao">Data de Criação</label>
                <input
                  type="date"
                  className="form-control"
                  id="data_criacao"
                  required
                  {...register("data_criacao")}
                />
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-sm-4">
              <div className="form-group">
                <label htmlFor="data_limite">Data Limite</label>
                <input
                  type="date"
                  className="form-control"
                  id="data_limite"
                  required
                  {...register("data_limite")}
                />
              </div>
            </div>
          </div> */}
          <input
            type="submit"
            className="btn btn-primary mt-3"
            value="Enviar"
          />
          <input
            type="reset"
            className="btn btn-danger mt-3 ms-3"
            value="Limpar"
          />
        </form>
        <div className="alert mt-3">{aviso}</div>
      </div>
    </div>
  );
};

export default Cadastrar_produto;
