import { useForm } from "react-hook-form";
import { api } from "../config_axios";
import { useState } from "react";

const Cadastrar_Usuario = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");

  const salvar = async (campos) => {
    try {
      //vamos enviar os dados digitados para a rota /user do backend
      const response = await api.post("user/createUsers", campos);
      setAviso(`Usuário cadastrado com sucesso!"`);
      reset();
    } catch (error) {
      setAviso("Erro ao cadastrar usuário!");
    }
  };

  return (
    <div className="container-fluid bg-white text-light min-vh-100 d-flex align-items-center">
      <div className="container p-5 bg-white text-dark rounded"> {/* Alteração aqui */}
        <h4 className="fst-italic mb-3">Cadastrar Usuário</h4>
        <form onSubmit={handleSubmit(salvar)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              autoFocus
              {...register("username")}
              style={{ backgroundColor: '#f2f2f2' }}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              {...register("email")}
              style={{ backgroundColor: '#f2f2f2' }}
            />
          </div>
          
          <div className="form-group mt-2">
            <label htmlFor="status">Senha:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              {...register("password")}
              style={{ backgroundColor: '#f2f2f2' }}
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

export default Cadastrar_Usuario;
