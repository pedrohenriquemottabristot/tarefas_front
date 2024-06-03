import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";

const ManutencaoProdutos = () => {
    const { register, handleSubmit, reset } = useForm();
    const [produtos, setProdutos] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("product/all");
            setProdutos(lista.data);
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error.message}`);
        }
    };

    useEffect(() => {
        obterLista();
    }, []);

    const filtrarLista = async (campos) => {
        try {
            const lista = await api.get(`product/filtro/${campos.palavra}`);
            if (lista.data.length) {
                setProdutos(lista.data);
            } else {
                alert("Não há produtos cadastrados com a palavra chave pesquisada");
            }
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error.message}`);
        }
    };

    const excluir = async (id, name) => {
        if (!window.confirm(`Confirma a exclusão do Produto ${name}?`)) {
            return;
        }
        try {
            await api.delete(`product/deleteProduct/${id}`);
            setProdutos(produtos.filter(produto => produto.id !== id));
        } catch (error) {
            alert(`Erro: Não foi possível excluir o produto ${name}: ${error.message}`);
        }
    };

    const alterar = async (id, name) => {
        const novoPrice = prompt(`Digite o novo preço do produto ${name}`);
        if (!novoPrice || isNaN(novoPrice)) {
            alert('Digite um preço válido!');
            return;
        }
        try {
            await api.put(`product/updateProduct/${id}`, { price: novoPrice });
            setProdutos(produtos.map(produto =>
                produto.id === id ? { ...produto, price: novoPrice } : produto
            ));
        } catch (error) {
            alert(`Erro: Não foi possível alterar o produto ${name}: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-7">
                    <h4 className="fst-italic mt-3">Manutenção de Produtos</h4>
                </div>
                <div className="col-sm-5">
                    <form onSubmit={handleSubmit(filtrarLista)}>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Nome" required {...register("palavra")} />
                            <input type="submit" className="btn btn-primary" value="Pesquisar"   style={{ backgroundColor: '#54B435', border: '1px solid #54B435' }}/>
                            <input type="button" className="btn btn-danger" value="Todos" onClick={() => { reset({ palavra: "" }); obterLista(); }} />
                        </div>
                    </form>
                </div>
            </div>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <ItemLista
                            key={produto.id}
                            id={produto.id}
                            name={produto.name}
                            description={produto.description}
                            price={produto.price}
                            excluirClick={() => excluir(produto.id, produto.name)}
                            alterarClick={() => alterar(produto.id, produto.name)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManutencaoProdutos;
