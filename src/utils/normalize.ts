export const removeAccents = (str: string): string => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

export const normalizeCategory = (cat: string): string => {
    let normalized = cat
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    
    // Remove tudo que não for caractere alfanumérico para evitar problemas com espaços, & ou -
    normalized = normalized.replace(/[^a-z0-9]/g, "");
    
    // Tratamento de erros de digitação (typos) e variações de categorias
    if (normalized.includes("fran") || normalized.includes("frag")) {
        return "fragrancia";
    }
    if (normalized === "corpoebanho" || normalized === "corpobanho") {
        return "corpobanho";
    }
    return normalized;
};
