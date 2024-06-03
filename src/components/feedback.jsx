import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "../config_axios";

const FeedbackForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const [feedbacks, setFeedbacks] = useState([]);

    const obterFeedbacks = async () => {
        try {
            const response = await api.get("/feedback/all");
            setFeedbacks(response.data);
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error.message}`);
        }
    };

    useEffect(() => {
        obterFeedbacks();
    }, []);

    const enviarFeedback = async (data) => {
        try {
            await api.post("/feedback/createFeedback", data);
            reset();
            obterFeedbacks();
            alert("Feedback enviado com sucesso!");
        } catch (error) {
            alert(`Erro: Não foi possível enviar o feedback: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4 className="fst-italic mt-3">Envio de Feedback</h4>
                </div>
            </div>
            <form onSubmit={handleSubmit(enviarFeedback)}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome:</label>
                    <input type="text" className="form-control" id="name" required {...register("name")} />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" required {...register("email")} />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoria:</label>
                    <select className="form-select" id="category" required {...register("category")}>
                        <option value="">Selecione uma categoria</option>
                        <option value="Elogio">Elogio</option>
                        <option value="Crítica">Crítica</option>
                        <option value="Sugestão">Sugestão</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Mensagem:</label>
                    <textarea className="form-control" id="message" rows="3" required {...register("message")}></textarea>
                </div>
                <button type="submit"  style={{ backgroundColor: '#54B435', border: '1px solid #54B435' }} className="btn btn-primary">Enviar Feedback  </button>
                

            </form>

            <h4 className="fst-italic mt-5">Feedbacks Recebidos</h4>
            <ul className="list-group mt-3">
                {feedbacks.map((feedback) => (
                    <li key={feedback.id} className="list-group-item">
                        <strong>{feedback.name}</strong> ({feedback.email}) - {feedback.category}
                        <p>{feedback.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedbackForm;
