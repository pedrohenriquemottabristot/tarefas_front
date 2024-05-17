import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";
import ItemLista from "./ItemLista";  

const ManutencaoProdutos = () => {
    //servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
    //guardar e setar as informações do objeto
    const [produtos, setProdutos] = useState([]);

    const obterLista = async () => {
        try{
            const lista = await api.get("product/all");
            console.log("lista:"+lista.data);
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
        ? setTarefas(lista.data)
        : alert("Não há produtos cadastrados com a palavra chave pesquisada");
    }catch(error){
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}

const excluir = async(id,name) => {
    if(!window.confirm(`Confirma a exclusão do Produto ${name}?`)){
        return;
    }
    try{
        console.log("id é:"+id)
        await api.delete(`product/deleteProduct/${id}`);
        //formar uma nova lista de tarefas sem a tarefa que foi excluida
        setProdutos(produtos.filter(Produtos => produto.id !== id));
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível excluir o produto ${name}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,name,index) => {
    const novoNome = prompt(`Digite o novo nome do produto ${name}`);
    if (novoNome == "" ) {
        alert('Digite um nome válido!(nome em branco)')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`product/updateProduct`,{id: id, name: novoNome});
        // await api.put(`product/${id}`,{status: novoStatus});
       
        const ProdutosAtualizados = [...produtos];
        const indiceProdutos = ProdutosAtualizados.find(Produtos => Produtos.id === id);
        console.log("indice produto:"+indiceProdutos);
        ProdutosAtualizados[indiceProdutos.id].name = novoNome;
        setProdutos(ProdutosAtualizados);
        obterLista();
        location.reload();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar a tarefa ${name}: ${error}`);
    }
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
                        <input type="text" className="form-control" placeholder="Nome" required {...register("palavra")} />
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
                    <th>Nome</th>
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
                        name={produto.name}
                        description={produto.description} 
                        price={produto.price}                             
                        excluirClick={()=>excluir(produto.id,produto.name)}
                        alterarClick={()=>alterar(produto.id,produto.name)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoProdutos;