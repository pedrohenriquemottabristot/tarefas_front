import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  

const Manutencao_Produtos = () => {
    //servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
    //guardar e setar as informações do objeto
    const [produtos, setProdutos] = useState([]);

    const obterLista = async () => {
        try{
            const lista = await api.get("produtos");
            setProdutos(lista.data);
        }catch(error){
            alert(`Erro: ..Não foi possível obter os dados: ${error}`);
        }
    }


//define o método que será executado assim que o componente
// for renderizado
useEffect(() => {
    obterLista();
},[]);

const filtrarLista = async (campos) => {
    try{
        const lista = await api.get(`produtos/filtro/${campos.palavra}`);
        lista.data.length
        ? setProdutos(lista.data)
        : alert("Não há produtos cadastrados com a palavra chave pesquisada");
    }catch(error){
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}

const excluir = async(id,titulo) => {
    if(!window.confirm(`Confirma a exclusão do Produto ${titulo}?`)){
        return;
    }
    try{
        console.log("id é:"+id)
        await api.delete(`produtos/${id}`);
        //formar uma nova lista de tarefas sem a tarefa que foi excluida
        setProdutos(produtos.filter(Produtos => produtos.id !== id));
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível excluir o produto ${titulo}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,titulo,index) => {
    const novoStatus = prompt(`Digite o novo status do produto ${titulo}`);
    if (novoStatus == "" ) {
        alert('Digite um status válido!(status em branco)')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`produtos/${id}`,{status: novoStatus});
        
        const ProdutosAtualizados = [...produtos];
        const indiceProdutos = ProdutosAtualizados.find(Produtos => Produtos.id === id);
        console.log("indice produto:"+indiceProdutos);
        ProdutosAtualizados[indiceProdutos.id].status = novoStatus;
        setProdutos(ProdutosAtualizados);
        obterLista();
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar o produto ${titulo}: ${error}`);
    }Cadastrar_produto;
}

    return (
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Manutenção de Produtos</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Titulo" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>

        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Preço</th>
            
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map((produto) => (
                    <ItemLista
                        key={produto.id}
                        id={produto.id}
                        titulo={produto.titulo}
                        descricao={produto.descricao}
                        status={produto.status}
                        data_criacao={produto.data_criacao}
                        data_limite={produto.data_limite}
                        excluirClick={()=>excluir(produto.id,produto.titulo)}
                        alterarClick={()=>alterar(produto.id,produto.titulo)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoProdutos;