// Mapeamento de abreviações e variações para nomes canônicos
const LIVROS: Record<string, string> = {
  // Antigo Testamento
  "gn": "Gênesis", "gen": "Gênesis", "gênesis": "Gênesis",
  "ex": "Êxodo", "exo": "Êxodo", "êxodo": "Êxodo",
  "lv": "Levítico", "lev": "Levítico",
  "nm": "Números", "num": "Números",
  "dt": "Deuteronômio", "deu": "Deuteronômio",
  "js": "Josué", "jos": "Josué",
  "jz": "Juízes", "jui": "Juízes",
  "rt": "Rute",
  "1sm": "1 Samuel", "1sam": "1 Samuel",
  "2sm": "2 Samuel", "2sam": "2 Samuel",
  "1rs": "1 Reis", "1rei": "1 Reis",
  "2rs": "2 Reis", "2rei": "2 Reis",
  "1cr": "1 Crônicas", "1cro": "1 Crônicas",
  "2cr": "2 Crônicas", "2cro": "2 Crônicas",
  "ed": "Esdras", "esd": "Esdras",
  "ne": "Neemias", "nee": "Neemias",
  "tb": "Tobias", "tob": "Tobias",
  "jdt": "Judite",
  "est": "Ester",
  "1mc": "1 Macabeus",
  "2mc": "2 Macabeus",
  "jó": "Jó",
  "sl": "Salmos", "sal": "Salmos", "ps": "Salmos",
  "pr": "Provérbios", "pro": "Provérbios",
  "ecl": "Eclesiastes",
  "ct": "Cântico dos Cânticos",
  "sb": "Sabedoria", "sab": "Sabedoria",
  "si": "Sirácida", "eclo": "Sirácida",
  "is": "Isaías", "isa": "Isaías",
  "jr": "Jeremias", "jer": "Jeremias",
  "lm": "Lamentações",
  "br": "Baruc", "bar": "Baruc",
  "ez": "Ezequiel", "eze": "Ezequiel",
  "dn": "Daniel", "dan": "Daniel",
  "os": "Oseias", "ose": "Oseias",
  "jl": "Joel",
  "am": "Amós",
  "ob": "Abdias",
  "jn": "Jonas", "jon": "Jonas",
  "mq": "Miquéias", "mic": "Miquéias",
  "na": "Naum",
  "hc": "Habacuc", "hab": "Habacuc",
  "sf": "Sofonias", "sof": "Sofonias",
  "ag": "Ageu",
  "zc": "Zacarias", "zac": "Zacarias",
  "ml": "Malaquias", "mal": "Malaquias",
  // Novo Testamento
  "mt": "Mateus", "mat": "Mateus",
  "mc": "Marcos", "mar": "Marcos",
  "lc": "Lucas", "luc": "Lucas",
  "jo": "João", "joão": "João",
  "at": "Atos", "atos": "Atos",
  "rm": "Romanos", "rom": "Romanos",
  "1co": "1 Coríntios", "1cor": "1 Coríntios",
  "2co": "2 Coríntios", "2cor": "2 Coríntios",
  "gl": "Gálatas", "gal": "Gálatas",
  "ef": "Efésios", "efe": "Efésios",
  "fl": "Filipenses", "fil": "Filipenses",
  "cl": "Colossenses", "col": "Colossenses",
  "1ts": "1 Tessalonicenses", "1tes": "1 Tessalonicenses",
  "2ts": "2 Tessalonicenses", "2tes": "2 Tessalonicenses",
  "1tm": "1 Timóteo", "1tim": "1 Timóteo",
  "2tm": "2 Timóteo", "2tim": "2 Timóteo",
  "tt": "Tito", "tit": "Tito",
  "fm": "Filemon", "flm": "Filemon",
  "hb": "Hebreus", "heb": "Hebreus",
  "tg": "Tiago", "tia": "Tiago",
  "1pe": "1 Pedro", "1pd": "1 Pedro",
  "2pe": "2 Pedro", "2pd": "2 Pedro",
  "1jo": "1 João",
  "2jo": "2 João",
  "3jo": "3 João",
  "jd": "Judas",
  "ap": "Apocalipse", "apo": "Apocalipse",
};

export interface ReferenciaBiblica {
  livro: string;
  capitulo: number;
  versiculo?: number;
}

export function parsearReferencia(input: string): Referenciabiblica | null {
  // Remove espaços extras e normaliza
  const texto = input.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


  const match = texto.match(
    /^(\d)?([a-záéíóúãõâêîôûç]+)\s+(\d+)(?:[,;:\s](\d+))?/i
  );

  if (!match) {
    return null;
  }

  const [, prefixo, abrevRaw, capStr, verStr] = match;
  const abrev = (prefixo ? prefixo + abrevRaw : abrevRaw).replace(/\s/g, "");

  const livro = LIVROS[abrev];
  if (!livro) {
    return null;
  }

  const capitulo = parseInt(capStr, 10);
  const versiculo = verStr ? parseInt(verStr, 10) : undefined;

  if (isNaN(capitulo) || capitulo < 1) {
    return null;
  }

  return { livro, capitulo, versiculo };
}

export function urlDaReferencia(ref: Referenciabiblica): string {
  const base = `/biblia/${encodeURIComponent(ref.livro)}/${ref.capitulo}`;
  return ref.versiculo ? `${base}?v=${ref.versiculo}` : base;
}

// Alias para consistência de tipo
export type Referenciabiblica = ReferenciabiblicaBase;
interface ReferenciabiblicaBase {
  livro: string;
  capitulo: number;
  versiculo?: number;
}
