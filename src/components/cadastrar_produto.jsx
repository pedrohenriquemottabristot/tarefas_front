import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Cadastrar_produto = () => {
  const { register, handleSubmit, reset} = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      const response = await api.post("product/createProduct", campos);
      setAviso(`Produto cadastrado com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar produto!");
    }
  };

  return (
    <div className="container-fluid bg-white text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-light text-dark rounded">
        <h4 className="fst-italic mb-3">Cadastrar Produto</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group">
            <label htmlFor="name">Nome do Produto</label>
            <input
              type="text"               
              className="form-control"
              id="name"
              required
              autoFocus
              {...register("name")}
              style={{ backgroundColor: '#f2f2f2' }}
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
              style={{ backgroundColor: '#f2f2f2' }}
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
              style={{ backgroundColor: '#f2f2f2'  }}
            />
          </div>
        
          <input
            type="submit"
            className="btn btn-primary mt-3"
            style={{ backgroundColor: '#54B435', border: '1px solid #54B435' }}
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
