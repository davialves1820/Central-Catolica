export interface Noticia {
    id: string
    titulo: string
    resumo: string
    url: string
    imagem?: string
    categoria?: string
    publicadoEm: string
    fonte: 'vaticannews' | 'cnbb' | 'fides'
    fonteLabel: string
}