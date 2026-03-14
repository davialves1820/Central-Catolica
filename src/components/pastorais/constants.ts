import { Users, Heart, BookOpen, Music, Cross, Baby, Flower2, Hand, Soup, Church } from "lucide-react";
import { Pastoral } from "../../types/index";

export const pastorais: Pastoral[] = [
  {
    id: "pascom",
    name: "PASCOM",
    tag: "Pastoral",
    description: "Pastoral da Comunicação, responsável pela evangelização através dos meios de comunicação social.Pastoral da Comunicação, responsável pela evangelização através dos meios de comunicação sociPastoral da Comunicação, responsável pela evangelização através dos meios de comunicação sociPastoral da Comunicação, responsável pela evangelização através dos meios de comunicação sociPastoral da Comunicação, responsável pela evangelização através dos meios de comunicação soci",
    icon: BookOpen,
    location: "Sala da Pascom - 2º andar",
    email: "comunicacao@paroquia.com",
    instagram: "@pascom_paroquia",
    coordinators: [
      { name: "João Silva", phone: "(83) 98888-0001" },
      { name: "Maria Oliveira", phone: "(83) 98888-0002" }
    ]
  },
  {
    id: "jupac",
    name: "JUPAC",
    tag: "Movimento",
    description: "Juventude Paroquial Católica — formação e acolhimento dos jovens na fé e na comunidade.",
    icon: Users,
    location: "Centro Pastoral",
    instagram: "@jupac_oficial",
    coordinators: [
      { name: "Pedro Santos", phone: "(83) 98888-0003" }
    ]
  },
  {
    id: "ajec",
    name: "AJEC",
    tag: "Movimento",
    description: "Associação de Jovens Encontristas Católicos — retiros e formação espiritual para jovens.",
    icon: Heart,
    location: "Salão Paroquial",
    coordinators: [
      { name: "Ana Beatriz", phone: "(83) 98888-0004" }
    ]
  },
  {
    id: "vicentinos",
    name: "Vicentinos",
    tag: "Pastoral",
    description: "Sociedade de São Vicente de Paulo — assistência social e caridade aos mais necessitados.",
    icon: Hand,
    location: "Secretaria de Obras Sociais",
  },
  {
    id: "sopa-solidaria",
    name: "Sopa Solidária",
    tag: "Pastoral",
    description: "Projeto social que oferece alimentação e acolhimento aos moradores em situação de rua.",
    icon: Soup,
    location: "Cozinha Comunitária",
  },
  {
    id: "terco-homens",
    name: "Terço dos Homens",
    tag: "Movimento",
    description: "Movimento de oração e espiritualidade masculina através da devoção do Santo Terço.",
    icon: Cross,
    location: "Nave da Igreja",
  },
  {
    id: "saude",
    name: "Pastoral da Saúde",
    tag: "Pastoral",
    description: "Acompanhamento e visitas aos enfermos, levando conforto espiritual e a presença de Cristo.",
    icon: Heart,
    location: "Coordenação de Saúde",
  },
  {
    id: "pequeninos",
    name: "Pequeninos do Senhor",
    tag: "Pastoral",
    description: "Catequese e formação cristã para as crianças, preparando-as para a vida sacramental.",
    icon: Baby,
    location: "Salas de Catequese",
  },
  {
    id: "rosa-mistica",
    name: "Rosa Mística",
    tag: "Movimento",
    description: "Movimento mariano de oração e devoção a Nossa Senhora Rosa Mística.",
    icon: Flower2,
    location: "Capela do Santíssimo",
  },
  {
    id: "oficina-oracao",
    name: "Oficina de Oração",
    tag: "Movimento",
    description: "Espaço de aprendizado e prática de diferentes formas de oração e vida interior.",
    icon: Church,
    location: "Sala 3 - Centro Pastoral",
  },
  {
    id: "musica",
    name: "Pastoral da Música",
    tag: "Pastoral",
    description: "Ministério de música litúrgica que anima as celebrações com cânticos e louvores.",
    icon: Music,
    location: "Coro da Igreja",
  },
  {
    id: "acampamento",
    name: "Acampamento",
    tag: "Movimento",
    description: "Retiros e acampamentos de formação espiritual para jovens e adolescentes da paróquia.",
    icon: Users,
    location: "Sítio Paroquial",
  },
];
