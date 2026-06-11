import axios from "axios";
import type { SkinCare } from "../types/SkinCare";

export const getSkinCare = async (): Promise<SkinCare[]> => {
    try {
        const resposta = await axios.get("http://localhost:3000/produtos");
        console.log(resposta.data);

        return resposta.data
    } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
        throw error;
    }
}

export const deleteSkinCare = async (idSkinCare: string): Promise<void> => {
    try {
        await axios.delete(`http://localhost:3000/produtos/${idSkinCare}`)
    } catch (error) {
        console.error("Erro ao deletar o bolo: ", error);
        throw error;
    }
}

export const enviarFotoParaAPI = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await axios.post("http://localhost:3000/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return res.data.filename;
    } catch (error) {
        console.error("Erro no upload da imagem: ", error);
        return undefined;
    }
};

export const postSkinCare = async (skinCare: SkinCare): Promise<void> => {
    try {
        await axios.post("http://localhost:3000/produtos", skinCare);
    } catch (error) {
        console.error("Erro ao cadastrar o produto: ", error);
        throw error;
    }
};

export const putSkinCare = async (skinCare: SkinCare): Promise<void> => {
  try {
    if (!skinCare.id) {
      throw new Error("ID do skinCare não informado");
    }
    await axios.put(`http://localhost:3000/produtos/${skinCare.id}`, skinCare);
  } catch (error) {
    console.error("Erro ao atualizar o skinCare", error);
    throw error;
  }
}