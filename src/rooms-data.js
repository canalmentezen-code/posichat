// ============================================================================
// POSICHAT — ESTRUTURA DE SALAS: TODOS OS ESTADOS, CAPITAIS E PORTUGAL
// Estilo Bate-papo UOL com Estados e Submenus de Capitais
// ============================================================================

export const ROOM_CATEGORIES = [
    { id: "all", label: "🌟 Todas as Salas" },
    { id: "brasil", label: "🇧🇷 Estados do Brasil & Capitais" },
    { id: "portugal", label: "🇵🇹 Portugal (Lisboa, Norte e Sul)" },
    { id: "tematicas", label: "💖 Temáticas & Paquera" }
];

// ----------------------------------------------------------------------------
// ESTADOS DO BRASIL COM SUBMENU DE CAPITAIS & INTERIOR
// ----------------------------------------------------------------------------
export const BRAZIL_STATES = [
    // SUDESTE
    {
        id: "sp",
        stateName: "São Paulo",
        icon: "🏙️",
        tag: "SP",
        description: "Encontros e conversas para quem vive em São Paulo. Escolha a Capital ou Interior:",
        subrooms: [
            { id: "sp-capital", name: "São Paulo (Capital)", desc: "Bate-papo focado na capital paulista e região metropolitana." },
            { id: "sp-interior", name: "Campinas & Interior de SP", desc: "Campinas, Ribeirão Preto, Sorocaba e cidades do interior paulista." },
            { id: "sp-litoral", name: "Baixada Santista & Litoral", desc: "Santos, Praia Grande, Guarujá, Litoral Norte e Sul." }
        ]
    },
    {
        id: "rj",
        stateName: "Rio de Janeiro",
        icon: "🏖️",
        tag: "RJ",
        description: "Vibe carioca e fluminense. Faça amizades e combine encontros pelo Rio:",
        subrooms: [
            { id: "rj-capital", name: "Rio de Janeiro (Capital)", desc: "Zona Sul, Zona Norte, Centro, Barra e Tijuca." },
            { id: "rj-interior", name: "Niterói, Baixada & Região dos Lagos", desc: "Niterói, Baixada Fluminense, Cabo Frio e cidades do interior fluminense." }
        ]
    },
    {
        id: "mg",
        stateName: "Minas Gerais",
        icon: "⛰️",
        tag: "MG",
        description: "Acolhimento mineiro para bater um bom papo, tomar café e fazer amigos:",
        subrooms: [
            { id: "mg-capital", name: "Belo Horizonte (Capital)", desc: "Encontros na capital mineira e região metropolitana." },
            { id: "mg-interior", name: "Triângulo Mineiro & Interior de MG", desc: "Uberlândia, Juiz de Fora, Montes Claros, Ouro Preto e cidades mineiras." }
        ]
    },
    {
        id: "es",
        stateName: "Espírito Santo",
        icon: "🌊",
        tag: "ES",
        description: "Comunidade capixaba reunida com leveza, carinho e boas conversas:",
        subrooms: [
            { id: "es-capital", name: "Vitória & Grande Vitória", desc: "Vitória, Vila Velha, Serra e Cariacica." },
            { id: "es-interior", name: "Interior do Espírito Santo", desc: "Linhares, Cachoeiro de Itapemirim, Colatina e litoral norte/sul." }
        ]
    },

    // SUL
    {
        id: "pr",
        stateName: "Paraná",
        icon: "🌲",
        tag: "PR",
        description: "Conexões em terras paranaenses, unindo capital e interior:",
        subrooms: [
            { id: "pr-capital", name: "Curitiba (Capital)", desc: "Bate-papo na capital paranaense e arredores." },
            { id: "pr-interior", name: "Londrina, Maringá & Interior", desc: "Londrina, Maringá, Cascavel, Ponta Grossa e Foz do Iguaçu." }
        ]
    },
    {
        id: "sc",
        stateName: "Santa Catarina",
        icon: "⛵",
        tag: "SC",
        description: "Bate-papo leve entre catarinenses para fazer amizades e combinar encontros:",
        subrooms: [
            { id: "sc-capital", name: "Florianópolis (Capital)", desc: "A Ilha da Magia e Grande Florianópolis." },
            { id: "sc-interior", name: "Vale do Itajaí & Litoral de SC", desc: "Joinville, Blumenau, Balneário Camboriú, Itajaí e Chapecó." }
        ]
    },
    {
        id: "rs",
        stateName: "Rio Grande do Sul",
        icon: "🧉",
        tag: "RS",
        description: "Conversas fraternas e acolhedoras para quem vive no Rio Grande do Sul:",
        subrooms: [
            { id: "rs-capital", name: "Porto Alegre (Capital)", desc: "Porto Alegre e Região Metropolitana do Vale dos Sinos." },
            { id: "rs-interior", name: "Serra Gaúcha & Interior do RS", desc: "Caxias do Sul, Pelotas, Santa Maria, Passo Fundo e litoral." }
        ]
    },

    // CENTRO-OESTE
    {
        id: "df",
        stateName: "Distrito Federal",
        icon: "🏛️",
        tag: "DF",
        description: "Coração do Brasil: conversas em Brasília e cidades satélites:",
        subrooms: [
            { id: "df-capital", name: "Brasília (Capital Federal)", desc: "Plano Piloto, Asa Sul/Norte, Taguatinga, Águas Claras e Ceilândia." }
        ]
    },
    {
        id: "go",
        stateName: "Goiás",
        icon: "🌻",
        tag: "GO",
        description: "Calor humano e boas prosas pelo estado de Goiás:",
        subrooms: [
            { id: "go-capital", name: "Goiânia (Capital)", desc: "Goiânia e região metropolitana." },
            { id: "go-interior", name: "Anápolis, Rio Verde & Interior de GO", desc: "Anápolis, Rio Verde, Caldas Novas e interior goiano." }
        ]
    },
    {
        id: "mt",
        stateName: "Mato Grosso",
        icon: "🌿",
        tag: "MT",
        description: "Bate-papo e novas amizades no Mato Grosso:",
        subrooms: [
            { id: "mt-capital", name: "Cuiabá (Capital)", desc: "Cuiabá, Várzea Grande e arredores." },
            { id: "mt-interior", name: "Rondonópolis, Sinop & Interior de MT", desc: "Rondonópolis, Sinop, Sorriso e região mato-grossense." }
        ]
    },
    {
        id: "ms",
        stateName: "Mato Grosso do Sul",
        icon: "🐆",
        tag: "MS",
        description: "Conexões e amizades no Pantanal e Mato Grosso do Sul:",
        subrooms: [
            { id: "ms-capital", name: "Campo Grande (Capital)", desc: "Campo Grande e cidades vizinhas." },
            { id: "ms-interior", name: "Dourados, Corumbá & Pantanal", desc: "Dourados, Três Lagoas, Corumbá e Bonito." }
        ]
    },

    // NORDESTE
    {
        id: "ba",
        stateName: "Bahia",
        icon: "☀️",
        tag: "BA",
        description: "Calor humano, alegria e amizades de coração por toda a Bahia:",
        subrooms: [
            { id: "ba-capital", name: "Salvador (Capital)", desc: "Conversas na capital baiana e região metropolitana." },
            { id: "ba-interior", name: "Feira, Conquista, Ilhéus & Interior", desc: "Feira de Santana, Vitória da Conquista, Ilhéus, Porto Seguro e sertão." }
        ]
    },
    {
        id: "pe",
        stateName: "Pernambuco",
        icon: "🎭",
        tag: "PE",
        description: "Cultura, aconchego e bate-papo com a galera de Pernambuco:",
        subrooms: [
            { id: "pe-capital", name: "Recife & Olinda (Capital)", desc: "Recife, Olinda, Jaboatão e litoral pernambucano." },
            { id: "pe-interior", name: "Caruaru, Petrolina & Agreste", desc: "Caruaru, Petrolina, Garanhuns e sertão de Pernambuco." }
        ]
    },
    {
        id: "ce",
        stateName: "Ceará",
        icon: "🏖️",
        tag: "CE",
        description: "Amizades, sol e carinho com o povo acolhedor do Ceará:",
        subrooms: [
            { id: "ce-capital", name: "Fortaleza (Capital)", desc: "Fortaleza e região metropolitana." },
            { id: "ce-interior", name: "Juazeiro do Norte, Sobral & Interior", desc: "Juazeiro do Norte, Sobral, Jericoacoara e sertão cearense." }
        ]
    },
    {
        id: "ma",
        stateName: "Maranhão",
        icon: "🌴",
        tag: "MA",
        description: "Conexões calorosas e amizades no Maranhão:",
        subrooms: [
            { id: "ma-capital", name: "São Luís (Capital)", desc: "Ilha do Amor e região metropolitana de São Luís." },
            { id: "ma-interior", name: "Imperatriz & Interior do MA", desc: "Imperatriz, Caxias, Timon e interior maranhense." }
        ]
    },
    {
        id: "pb",
        stateName: "Paraíba",
        icon: "🌅",
        tag: "PB",
        description: "Onde o sol nasce primeiro: conversas e carinho na Paraíba:",
        subrooms: [
            { id: "pb-capital", name: "João Pessoa (Capital)", desc: "João Pessoa, Cabedelo e litoral paraibano." },
            { id: "pb-interior", name: "Campina Grande & Sertão da PB", desc: "Campina Grande, Patos, Sousa e Cajazeiras." }
        ]
    },
    {
        id: "rn",
        stateName: "Rio Grande do Norte",
        icon: "🐚",
        tag: "RN",
        description: "Terra do sol e das dunas: bate-papo no Rio Grande do Norte:",
        subrooms: [
            { id: "rn-capital", name: "Natal (Capital)", desc: "Natal, Parnamirim e praias potiguares." },
            { id: "rn-interior", name: "Mossoró & Interior do RN", desc: "Mossoró, Caicó e sertão potiguar." }
        ]
    },
    {
        id: "al",
        stateName: "Alagoas",
        icon: "🌴",
        tag: "AL",
        description: "Águas quentes e carinho alagoano:",
        subrooms: [
            { id: "al-capital", name: "Maceió (Capital)", desc: "Maceió e litoral alagoano." },
            { id: "al-interior", name: "Arapiraca & Interior de AL", desc: "Arapiraca, Palmeira dos Índios e sertão alagoano." }
        ]
    },
    {
        id: "se",
        stateName: "Sergipe",
        icon: "🌊",
        tag: "SE",
        description: "Aconchego e boas prosas no menor estado do Brasil:",
        subrooms: [
            { id: "se-capital", name: "Aracaju (Capital)", desc: "Aracaju e região metropolitana." },
            { id: "se-interior", name: "Interior de Sergipe", desc: "Nossa Senhora do Socorro, Lagarto e Itabaiana." }
        ]
    },
    {
        id: "pi",
        stateName: "Piauí",
        icon: "☀️",
        tag: "PI",
        description: "Simpatia e conversas sinceras no Piauí:",
        subrooms: [
            { id: "pi-capital", name: "Teresina (Capital)", desc: "Teresina e arredores." },
            { id: "pi-interior", name: "Parnaíba & Litoral do PI", desc: "Parnaíba, Picos, Floriano e litoral do Piauí." }
        ]
    },

    // NORTE
    {
        id: "pa",
        stateName: "Pará",
        icon: "🥭",
        tag: "PA",
        description: "Cultura marcante e amizades fraternas no Pará:",
        subrooms: [
            { id: "pa-capital", name: "Belém (Capital)", desc: "Belém, Ananindeua e região metropolitana." },
            { id: "pa-interior", name: "Santarém, Marabá & Interior do PA", desc: "Santarém, Marabá, Parauapebas e interior paraense." }
        ]
    },
    {
        id: "am",
        stateName: "Amazonas",
        icon: "🌿",
        tag: "AM",
        description: "Conexões no coração da floresta amazônica:",
        subrooms: [
            { id: "am-capital", name: "Manaus (Capital)", desc: "Manaus e região metropolitana." },
            { id: "am-interior", name: "Parintins & Interior do AM", desc: "Parintins, Itacoatiara, Manacapuru e rios do Amazonas." }
        ]
    },
    {
        id: "ro",
        stateName: "Rondônia",
        icon: "🌳",
        tag: "RO",
        description: "Bate-papo acolhedor no estado de Rondônia:",
        subrooms: [
            { id: "ro-capital", name: "Porto Velho (Capital)", desc: "Porto Velho e cidades vizinhas." },
            { id: "ro-interior", name: "Ji-Paraná, Ariquemes & Interior", desc: "Ji-Paraná, Ariquemes, Cacoal e Vilhena." }
        ]
    },
    {
        id: "to",
        stateName: "Tocantins",
        icon: "☀️",
        tag: "TO",
        description: "O mais jovem estado do Brasil reunido para boas conversas:",
        subrooms: [
            { id: "to-capital", name: "Palmas (Capital)", desc: "Palmas e região central do Tocantins." },
            { id: "to-interior", name: "Araguaína, Gurupi & Interior", desc: "Araguaína, Gurupi e interior tocantinense." }
        ]
    },
    {
        id: "ac",
        stateName: "Acre",
        icon: "🌲",
        tag: "AC",
        description: "Amizades e histórias de vida no Acre:",
        subrooms: [
            { id: "ac-capital", name: "Rio Branco (Capital)", desc: "Rio Branco e arredores." },
            { id: "ac-interior", name: "Cruzeiro do Sul & Interior do AC", desc: "Cruzeiro do Sul, Sena Madureira e Tarauacá." }
        ]
    },
    {
        id: "ap",
        stateName: "Amapá",
        icon: "🦜",
        tag: "AP",
        description: "Na Linha do Equador: conversas e novas amizades no Amapá:",
        subrooms: [
            { id: "ap-capital", name: "Macapá (Capital)", desc: "Macapá, Santana e região." },
            { id: "ap-interior", name: "Interior do Amapá", desc: "Laranjal do Jari, Oiapoque e interior amapaense." }
        ]
    },
    {
        id: "rr",
        stateName: "Roraima",
        icon: "🏔️",
        tag: "RR",
        description: "Extremo norte do país: integração e carinho em Roraima:",
        subrooms: [
            { id: "rr-capital", name: "Boa Vista (Capital)", desc: "Boa Vista e municípios roraimenses." }
        ]
    }
];

// ----------------------------------------------------------------------------
// PORTUGAL DIVIDIDO EM 3 PARTES: LISBOA, NORTE E SUL
// ----------------------------------------------------------------------------
export const PORTUGAL_REGIONS = [
    {
        id: "pt-lisboa",
        title: "Portugal — Lisboa",
        icon: "🇵🇹",
        tag: "Lisboa",
        description: "Para quem vive em Lisboa, Sintra, Cascais e Margem Sul (Vale do Tejo):",
        subrooms: [
            { id: "pt-lisboa-capital", name: "Lisboa (Capital)", desc: "Lisboa cidade, concelhos vizinhos e centro cosmopolita." },
            { id: "pt-lisboa-margem-sul", name: "Sintra, Cascais & Margem Sul", desc: "Sintra, Cascais, Oeiras, Almada, Seixal e Setúbal." }
        ]
    },
    {
        id: "pt-norte",
        title: "Portugal — Norte",
        icon: "🍷",
        tag: "Porto & Norte",
        description: "Conexões no Porto, Minho, Douro, Coimbra e região centro-norte:",
        subrooms: [
            { id: "pt-norte-porto", name: "Porto (Capital do Norte)", desc: "Porto, Vila Nova de Gaia, Matosinhos e Maia." },
            { id: "pt-norte-interior", name: "Braga, Guimarães, Aveiro & Coimbra", desc: "Cidades do Norte, Minho e Centro de Portugal." }
        ]
    },
    {
        id: "pt-sul",
        title: "Portugal — Sul",
        icon: "🏖️",
        tag: "Algarve & Sul",
        description: "Algarve, Alentejo e Regiões Autónomas (Madeira e Açores):",
        subrooms: [
            { id: "pt-sul-algarve", name: "Faro & Algarve (Litoral Sul)", desc: "Faro, Portimão, Lagos, Albufeira e praias do sul." },
            { id: "pt-sul-alentejo-ilhas", name: "Alentejo, Madeira & Açores", desc: "Évora, Beja, Funchal e Ponta Delgada." }
        ]
    }
];

// ----------------------------------------------------------------------------
// SALAS TEMÁTICAS, PAQUERA E VIVÊNCIAS
// ----------------------------------------------------------------------------
export const THEMATIC_ROOMS = [
    {
        id: "global",
        title: "Sala Geral — Ponto de Encontro",
        icon: "🌟",
        tag: "Principal",
        image: "/rooms/banner_global.jpg",
        description: "A praça central de boas-vindas. Puxe conversa, conheça gente nova e descubra de onde cada um é.",
        subrooms: [
            { id: "global", name: "Entrar na Sala Geral", desc: "Bate-papo aberto a todos." }
        ]
    },
    {
        id: "flerte",
        title: "Paquera, Flerte & Afinidades",
        icon: "💖",
        tag: "Romance",
        image: "/rooms/banner_paquera.jpg",
        description: "Espaço leve para jogar charme, paquerar e buscar conexões reais sem receio de julgamentos ou estigmas.",
        subrooms: [
            { id: "flerte", name: "Entrar na Sala de Paquera", desc: "Conversas com química e carinho." }
        ]
    },
    {
        id: "diaadia",
        title: "Papo Leve & Estilo de Vida",
        icon: "☕",
        tag: "Cotidiano",
        image: "/rooms/banner_cafe.jpg",
        description: "Rotina, trabalho, filmes, viagens, academia, autocuidado e a beleza de viver a vida normal.",
        subrooms: [
            { id: "diaadia", name: "Entrar no Papo do Dia a Dia", desc: "Troca descontraída e positiva." }
        ]
    },
    {
        id: "vivencias",
        title: "Vivências, Saúde & Informação",
        icon: "🌱",
        tag: "Compartilhar",
        image: "/rooms/banner_vivencias.jpg",
        description: "Troca de experiências, novidades médicas, autocuidado e o poder libertador de I=I (Indetectável = Intransmissível).",
        subrooms: [
            { id: "vivencias", name: "Entrar na Sala de Vivências", desc: "Empatia e ciência para fortalecer." }
        ]
    }
];

// Helper para obter a imagem temática de cada sala ou estado
export function getRoomImage(roomOrState) {
    if (!roomOrState) return "/rooms/banner_global.jpg";
    if (roomOrState.image) return roomOrState.image;
    const id = (roomOrState.id || "").toLowerCase();

    // Temáticas
    if (id === "global") return "/rooms/banner_global.jpg";
    if (id === "flerte") return "/rooms/banner_paquera.jpg";
    if (id === "diaadia") return "/rooms/banner_cafe.jpg";
    if (id === "vivencias") return "/rooms/banner_vivencias.jpg";

    // Estados Específicos
    if (id === "sp") return "/rooms/banner_sp.jpg";
    if (id === "rj") return "/rooms/banner_rio.jpg";
    if (id === "mg") return "/rooms/banner_cafe.jpg";
    if (id === "es") return "/rooms/banner_rio.jpg";

    // Regiões do Brasil
    if (["pr", "sc", "rs"].includes(id)) return "/rooms/art_friends.jpg";
    if (["ba", "pe", "ce", "rn", "pb", "al", "se", "ma", "pi"].includes(id)) return "/rooms/art_sunset.jpg";
    if (["df", "go", "mt", "ms"].includes(id)) return "/rooms/banner_sp.jpg";
    if (["am", "pa", "ac", "ro", "rr", "ap", "to"].includes(id)) return "/rooms/banner_global.jpg";

    // Portugal
    if (id === "pt-lisboa") return "/rooms/art_bar.jpg";
    if (id === "pt-norte") return "/rooms/banner_cafe.jpg";
    if (id === "pt-sul") return "/rooms/banner_rio.jpg";

    return "/rooms/banner_global.jpg";
}

// Helper para obter lista plana de todas as salas/subsalas para busca e roteamento
export function getAllRoomsList() {
    const list = [];

    // Temáticas
    THEMATIC_ROOMS.forEach(t => {
        list.push({
            id: t.id,
            title: t.title,
            icon: t.icon,
            image: getRoomImage(t),
            tag: t.tag,
            category: "tematicas",
            description: t.description,
            rules: "Respeito e acolhimento mútuo"
        });
    });

    // Estados do Brasil e suas capitais
    BRAZIL_STATES.forEach(st => {
        const stImage = getRoomImage(st);
        st.subrooms.forEach(sub => {
            list.push({
                id: sub.id,
                title: `${sub.name}`,
                stateName: st.stateName,
                icon: st.icon,
                image: stImage,
                tag: st.tag,
                category: "brasil",
                description: sub.desc,
                rules: `Galera de ${st.stateName}`
            });
        });
    });

    // Portugal e suas cidades
    PORTUGAL_REGIONS.forEach(pt => {
        const ptImage = getRoomImage(pt);
        pt.subrooms.forEach(sub => {
            list.push({
                id: sub.id,
                title: `${sub.name}`,
                stateName: pt.title,
                icon: pt.icon,
                image: ptImage,
                tag: pt.tag,
                category: "portugal",
                description: sub.desc,
                rules: `Comunidade em ${pt.title}`
            });
        });
    });

    return list;
}

// ----------------------------------------------------------------------------
// MURAL DINÂMICO DE ENCONTROS COMBINADOS (AGENDA ABERTA)
// ----------------------------------------------------------------------------
export const INITIAL_MEETS = [
    {
        id: "meet-1",
        title: "Sexta do Flerte & Conexões",
        roomTitle: "Paquera, Flerte & Afinidades",
        roomId: "flerte",
        when: "Toda Sexta às 21h30",
        proposer: "Comunidade",
        description: "Bate-papo leve para solteiros e interessados em paquerar e conhecer alguém especial.",
        confirmedCount: 38
    },
    {
        id: "meet-2",
        title: "Café Paulista & Amizades em SP",
        roomTitle: "São Paulo (Capital)",
        roomId: "sp-capital",
        when: "Sábado às 16h00",
        proposer: "Galera_SP",
        description: "Quem for de São Paulo entra para combinar passeios, cafés e trocar ideias sobre a cidade.",
        confirmedCount: 29
    },
    {
        id: "meet-3",
        title: "Encontro dos Cariocas & Fluminenses",
        roomTitle: "Rio de Janeiro (Capital)",
        roomId: "rj-capital",
        when: "Domingo às 18h00",
        proposer: "PovoDoRio",
        description: "Bate-papo descontraído com quem é do Rio para fazer novas amizades.",
        confirmedCount: 24
    },
    {
        id: "meet-4",
        title: "Roda Aberta sobre Autocuidado & I=I",
        roomTitle: "Vivências, Saúde & Informação",
        roomId: "vivencias",
        when: "Quarta às 20h00",
        proposer: "EquipePosi",
        description: "Dúvidas leves, celebração de exames e desmistificação do preconceito com leveza.",
        confirmedCount: 33
    },
    {
        id: "meet-5",
        title: "Bate-Papo de Portugal (Lisboa & Norte)",
        roomTitle: "Lisboa (Capital)",
        roomId: "pt-lisboa-capital",
        when: "Sábado às 20h00 (Hora de Portugal)",
        proposer: "ComunidadePT",
        description: "Encontro dos membros que vivem em Portugal para partilhar o dia a dia e fazer amizades.",
        confirmedCount: 19
    }
];

// ----------------------------------------------------------------------------
// AVATARES E PERSONAGENS (NOMES 100% EM PORTUGUÊS)
// ----------------------------------------------------------------------------
export const AVATARS = [
    { id: "sun", emoji: "☀️", name: "Luz" },
    { id: "heart", emoji: "💖", name: "Amor" },
    { id: "leaf", emoji: "🌿", name: "Esperança" },
    { id: "coffee", emoji: "☕", name: "Aconchego" },
    { id: "star", emoji: "✨", name: "Brilho" },
    { id: "dove", emoji: "🕊️", name: "Paz" },
    { id: "lotus", emoji: "🌸", name: "Florescer" },
    { id: "smile", emoji: "😊", name: "Alegria" },
    { id: "rainbow", emoji: "🌈", name: "Recomeço" },
    { id: "tree", emoji: "🌳", name: "Fortaleza" }
];

export const FRIENDLY_NICKS = [
    "CaminhoDoSol", "VidaLeve", "SorrisoAberto", "LuzDaManha",
    "AlmaLivre", "VivaMais", "CoracaoSereno", "NovoOlhar",
    "ViajantePosi", "BrisaSuave", "GiraSol", "EstrelaGuia",
    "VozAmiga", "RaioDeLuz", "AbraçoBom", "DoceEncontro"
];

export function generateFriendlyNickname() {
    const base = FRIENDLY_NICKS[Math.floor(Math.random() * FRIENDLY_NICKS.length)];
    const num = Math.floor(10 + Math.random() * 89);
    return `${base}_${num}`;
}
