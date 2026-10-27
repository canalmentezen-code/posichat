// POSICHAT — Lógica do Espaço com Salas por Estados, Capitais & Portugal
import { 
    auth, 
    googleProvider, 
    signInWithPopup, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    signOut, 
    onAuthStateChanged 
} from "./firebase.js";
import { 
    ROOM_CATEGORIES, 
    BRAZIL_STATES,
    PORTUGAL_REGIONS,
    THEMATIC_ROOMS,
    getAllRoomsList,
    getRoomImage,
    INITIAL_MEETS, 
    AVATARS, 
    generateFriendlyNickname 
} from "./rooms-data.js";
import { 
    subscribeToRoom, 
    sendChatMessage, 
    formatTime, 
    escapeHTML 
} from "./chat-engine.js";

// ============================================================================
// ESTADO GLOBAL DA APLICAÇÃO
// ============================================================================
const initialRoomsList = getAllRoomsList();

const state = {
    user: null,
    userProfile: {
        displayName: "Visitante",
        subnick: "",
        avatar: "☀️",
        uid: null
    },
    allRooms: initialRoomsList,
    currentRoom: initialRoomsList[0],
    selectedCategory: "all",
    searchQuery: "",
    selectedAvatar: "☀️",
    authMode: "login",
    meets: JSON.parse(localStorage.getItem("posichat_custom_meets") || JSON.stringify(INITIAL_MEETS)),
    rsvps: JSON.parse(localStorage.getItem("posichat_rsvps") || "{}")
};

// ============================================================================
// ELEMENTOS DO DOM
// ============================================================================
const dom = {
    app: document.getElementById('app'),
    pages: document.querySelectorAll('.page'),
    pageHome: document.getElementById('page-home'),
    pageLobby: document.getElementById('page-lobby'),
    pageChat: document.getElementById('page-chat'),

    // Navegação
    navBrand: document.getElementById('nav-brand'),
    navAuthContainer: document.getElementById('nav-auth-container'),
    btnNavAgenda: document.getElementById('btn-nav-agenda'),
    btnHeroEnter: document.getElementById('btn-hero-enter'),
    btnHeroAgenda: document.getElementById('btn-hero-agenda'),
    linkFooterHome: document.getElementById('link-footer-home'),
    linkFooterAgenda: document.getElementById('link-footer-agenda'),

    // Agenda & Lobby
    meetsGridContainer: document.getElementById('meets-grid-container'),
    categoryFilterBar: document.getElementById('category-filter-bar'),
    roomsSearchInput: document.getElementById('rooms-search-input'),
    roomsGridContainer: document.getElementById('rooms-grid-container'),
    btnOpenProposeModal: document.getElementById('btn-open-propose-modal'),

    // Modal Propor Encontro
    modalProposeMeet: document.getElementById('modal-propose-meet'),
    btnCloseProposeModal: document.getElementById('btn-close-propose-modal'),
    formProposeMeet: document.getElementById('form-propose-meet'),
    meetSelectRoom: document.getElementById('meet-select-room'),
    meetInputTitle: document.getElementById('meet-input-title'),
    meetInputWhen: document.getElementById('meet-input-when'),
    meetInputDesc: document.getElementById('meet-input-desc'),

    // Chat
    btnChatBackLobby: document.getElementById('btn-chat-back-lobby'),
    chatCurrentRoomTitle: document.getElementById('chat-current-room-title'),
    chatCurrentRoomDesc: document.getElementById('chat-current-room-desc'),
    chatMessagesContainer: document.getElementById('chat-messages-container'),
    chatForm: document.getElementById('chat-form'),
    chatMessageInput: document.getElementById('chat-message-input'),

    // Ações Rápidas
    btnActionCharme: document.getElementById('btn-action-charme'),
    btnActionCafe: document.getElementById('btn-action-cafe'),
    btnActionLuz: document.getElementById('btn-action-luz'),
    btnActionAbraco: document.getElementById('btn-action-abraço'),

    // Modal Auth
    modalAuth: document.getElementById('modal-auth'),
    btnCloseAuthModal: document.getElementById('btn-close-auth-modal'),
    tabLogin: document.getElementById('tab-login'),
    tabSignup: document.getElementById('tab-signup'),
    btnGoogleAuth: document.getElementById('btn-google-auth'),
    authEmailForm: document.getElementById('auth-email-form'),
    authEmail: document.getElementById('auth-email'),
    authPassword: document.getElementById('auth-password'),
    authNickname: document.getElementById('auth-nickname'),
    authSubnick: document.getElementById('auth-subnick'),
    btnGenerateNick: document.getElementById('btn-generate-nick'),
    avatarPickerContainer: document.getElementById('avatar-picker-container'),
    authErrorBanner: document.getElementById('auth-error-banner'),
    btnAuthSubmit: document.getElementById('btn-auth-submit')
};

// ============================================================================
// NAVEGAÇÃO ENTRE PÁGINAS (SPA)
// ============================================================================
function navigateTo(pageId) {
    dom.pages.forEach(page => page.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================================================================
// MURAL DINÂMICO DE ENCONTROS (FLEXÍVEL & ABERTO)
// ============================================================================
function initMeetsGrid() {
    dom.meetsGridContainer.innerHTML = '';
    state.meets.forEach(meet => {
        const isConfirmed = !!state.rsvps[meet.id];
        const count = (meet.confirmedCount || 0) + (isConfirmed ? 1 : 0);

        const card = document.createElement('div');
        card.className = 'meet-card';
        card.innerHTML = `
            <div>
                <div class="meet-time-badge">
                    <span>🗓️ ${escapeHTML(meet.when)}</span>
                </div>
                <h3 class="meet-title">${escapeHTML(meet.title)}</h3>
                <div class="meet-room-name">Sala: <strong>${escapeHTML(meet.roomTitle)}</strong> • por ${escapeHTML(meet.proposer || 'Membro')}</div>
                <p class="meet-desc">${escapeHTML(meet.description)}</p>
            </div>
            <div class="meet-footer">
                <span style="font-size: 0.8rem; color: var(--text-muted);">
                    👥 <strong class="rsvp-count">${count}</strong> presenças confirmadas
                </span>
                <button class="btn-rsvp ${isConfirmed ? 'confirmed' : ''}" data-meet-id="${meet.id}">
                    ${isConfirmed ? '✓ Presença Marcada!' : '+ Vou Estar Lá!'}
                </button>
            </div>
        `;

        const rsvpBtn = card.querySelector('.btn-rsvp');
        rsvpBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleRsvp(meet.id, rsvpBtn, card.querySelector('.rsvp-count'), meet.confirmedCount || 0);
        });

        card.addEventListener('click', () => {
            const targetRoom = state.allRooms.find(r => r.id === meet.roomId) || state.allRooms[0];
            enterRoom(targetRoom);
        });

        dom.meetsGridContainer.appendChild(card);
    });
}

function toggleRsvp(meetId, buttonEl, countEl, baseCount) {
    if (state.rsvps[meetId]) {
        delete state.rsvps[meetId];
        buttonEl.classList.remove('confirmed');
        buttonEl.textContent = '+ Vou Estar Lá!';
        countEl.textContent = baseCount;
    } else {
        state.rsvps[meetId] = true;
        buttonEl.classList.add('confirmed');
        buttonEl.textContent = '✓ Presença Marcada!';
        countEl.textContent = baseCount + 1;
    }
    localStorage.setItem("posichat_rsvps", JSON.stringify(state.rsvps));
}

// Modal de Propor Encontro
function initProposeMeetModal() {
    dom.meetSelectRoom.innerHTML = '';

    // Grupo de Temáticas
    const grpTematicas = document.createElement('optgroup');
    grpTematicas.label = "💖 Salas Temáticas & Conexões";
    THEMATIC_ROOMS.forEach(room => {
        const opt = document.createElement('option');
        opt.value = room.id;
        opt.textContent = `${room.icon} ${room.title}`;
        grpTematicas.appendChild(opt);
    });
    dom.meetSelectRoom.appendChild(grpTematicas);

    // Grupo de Estados e Capitais
    const grpBrasil = document.createElement('optgroup');
    grpBrasil.label = "🇧🇷 Estados & Capitais do Brasil";
    BRAZIL_STATES.forEach(st => {
        st.subrooms.forEach(sub => {
            const opt = document.createElement('option');
            opt.value = sub.id;
            opt.textContent = `${st.icon} [${st.tag}] ${sub.name}`;
            grpBrasil.appendChild(opt);
        });
    });
    dom.meetSelectRoom.appendChild(grpBrasil);

    // Grupo de Portugal
    const grpPT = document.createElement('optgroup');
    grpPT.label = "🇵🇹 Portugal (Lisboa, Norte e Sul)";
    PORTUGAL_REGIONS.forEach(pt => {
        pt.subrooms.forEach(sub => {
            const opt = document.createElement('option');
            opt.value = sub.id;
            opt.textContent = `${pt.icon} ${sub.name}`;
            grpPT.appendChild(opt);
        });
    });
    dom.meetSelectRoom.appendChild(grpPT);

    dom.btnOpenProposeModal.addEventListener('click', () => {
        if (!state.user) {
            openAuthModal("login", "Entre ou registre seu Nick para combinar um horário no mural!");
            return;
        }
        dom.modalProposeMeet.classList.add('active');
    });

    dom.btnCloseProposeModal.addEventListener('click', () => {
        dom.modalProposeMeet.classList.remove('active');
    });

    dom.modalProposeMeet.addEventListener('click', (e) => {
        if (e.target === dom.modalProposeMeet) dom.modalProposeMeet.classList.remove('active');
    });

    dom.formProposeMeet.addEventListener('submit', (e) => {
        e.preventDefault();
        const roomId = dom.meetSelectRoom.value;
        const targetRoom = state.allRooms.find(r => r.id === roomId) || state.allRooms[0];

        const newMeet = {
            id: `user-meet-${Date.now()}`,
            title: dom.meetInputTitle.value.trim(),
            roomTitle: targetRoom.title,
            roomId: roomId,
            when: dom.meetInputWhen.value.trim(),
            proposer: state.userProfile.displayName || "Membro",
            description: dom.meetInputDesc.value.trim(),
            confirmedCount: 1
        };

        state.meets.unshift(newMeet);
        state.rsvps[newMeet.id] = true;
        localStorage.setItem("posichat_custom_meets", JSON.stringify(state.meets));
        localStorage.setItem("posichat_rsvps", JSON.stringify(state.rsvps));

        initMeetsGrid();
        dom.modalProposeMeet.classList.remove('active');
        dom.formProposeMeet.reset();
    });
}

// ============================================================================
// LOBBY & FILTROS POR CATEGORIA (ESTADOS, TEMÁTICAS, PORTUGAL)
// ============================================================================
function initCategoryFilter() {
    dom.categoryFilterBar.innerHTML = '';
    ROOM_CATEGORIES.forEach(cat => {
        const pill = document.createElement('button');
        pill.className = `category-pill ${state.selectedCategory === cat.id ? 'active' : ''}`;
        pill.textContent = cat.label;
        pill.addEventListener('click', () => {
            state.selectedCategory = cat.id;
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderRoomsGrid();
        });
        dom.categoryFilterBar.appendChild(pill);
    });

    if (dom.roomsSearchInput) {
        dom.roomsSearchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase().trim();
            renderRoomsGrid();
        });
    }
}

// ============================================================================
// RENDERIZAÇÃO DAS SALAS: ESTADOS COM SUBMENU DE CAPITAIS, PORTUGAL & TEMAS
// ============================================================================
function renderRoomsGrid() {
    dom.roomsGridContainer.innerHTML = '';
    const query = state.searchQuery;
    const cat = state.selectedCategory;
    let renderedCount = 0;

    // 1. SALAS TEMÁTICAS
    if (cat === "all" || cat === "tematicas") {
        THEMATIC_ROOMS.forEach(room => {
            const matchesQuery = !query || 
                room.title.toLowerCase().includes(query) || 
                room.description.toLowerCase().includes(query) ||
                room.tag.toLowerCase().includes(query);

            if (matchesQuery) {
                renderedCount++;
                const card = document.createElement('div');
                card.className = 'room-card';
                const roomImg = getRoomImage(room);
                card.innerHTML = `
                    <div class="room-banner">
                        <img src="${roomImg}" alt="${escapeHTML(room.title)}" class="room-banner-img" loading="lazy">
                        <span class="room-badge badge-overlay badge-pink">${room.tag}</span>
                    </div>
                    <div class="room-card-body">
                        <div>
                            <div class="room-header-row">
                                <span class="room-emoji">${room.icon}</span>
                                <h3 class="room-title">${escapeHTML(room.title)}</h3>
                            </div>
                            <p class="room-desc">${escapeHTML(room.description)}</p>
                        </div>
                        <div class="room-bottom">
                            <span>🌸 Comunidade Acolhedora</span>
                            <span class="room-join-text">Entrar na Sala →</span>
                        </div>
                    </div>
                `;
                card.addEventListener('click', () => {
                    enterRoom({
                        id: room.id,
                        title: room.title,
                        icon: room.icon,
                        description: room.description,
                        rules: "Respeito e acolhimento mútuo"
                    });
                });
                dom.roomsGridContainer.appendChild(card);
            }
        });
    }

    // 2. ESTADOS DO BRASIL COM SUBMENU DE CAPITAIS
    if (cat === "all" || cat === "brasil") {
        BRAZIL_STATES.forEach(st => {
            const matchesQuery = !query ||
                st.stateName.toLowerCase().includes(query) ||
                st.tag.toLowerCase().includes(query) ||
                st.description.toLowerCase().includes(query) ||
                st.subrooms.some(sub => sub.name.toLowerCase().includes(query) || sub.desc.toLowerCase().includes(query));

            if (matchesQuery) {
                renderedCount++;
                const card = document.createElement('div');
                card.className = 'room-card state-card';
                const stImg = getRoomImage(st);
                card.innerHTML = `
                    <div class="room-banner">
                        <img src="${stImg}" alt="${escapeHTML(st.stateName)}" class="room-banner-img" loading="lazy">
                        <span class="room-badge badge-overlay badge-state">${st.tag}</span>
                    </div>
                    <div class="room-card-body">
                        <div class="room-card-header">
                            <div class="room-header-row">
                                <span class="room-emoji">${st.icon}</span>
                                <h3 class="room-title">${escapeHTML(st.stateName)}</h3>
                            </div>
                            <p class="room-desc">${escapeHTML(st.description)}</p>
                        </div>

                        <div class="state-subrooms-container">
                            <div class="subrooms-label">🏛️ Capitais & Sub-salas:</div>
                            <div class="subrooms-grid">
                                ${st.subrooms.map(sub => `
                                    <button type="button" class="subroom-pill-btn ${sub.id.includes('capital') ? 'capital-highlight' : ''}" data-sub-id="${sub.id}">
                                        <span class="subroom-pill-icon">${sub.id.includes('capital') ? '🏛️' : '📍'}</span>
                                        <span class="subroom-pill-text">${escapeHTML(sub.name)}</span>
                                        <span class="subroom-pill-arrow">Entrar →</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

                // Adiciona clique em cada botão de capital/sub-sala
                card.querySelectorAll('.subroom-pill-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const subId = btn.getAttribute('data-sub-id');
                        const targetSub = st.subrooms.find(s => s.id === subId);
                        if (targetSub) {
                            enterRoom({
                                id: targetSub.id,
                                title: `${st.stateName} — ${targetSub.name}`,
                                icon: st.icon,
                                description: targetSub.desc,
                                rules: `Comunidade de ${st.stateName}`
                            });
                        }
                    });
                });

                dom.roomsGridContainer.appendChild(card);
            }
        });
    }

    // 3. PORTUGAL DIVIDIDO EM 3 PARTES: LISBOA, NORTE E SUL
    if (cat === "all" || cat === "portugal") {
        PORTUGAL_REGIONS.forEach(pt => {
            const matchesQuery = !query ||
                pt.title.toLowerCase().includes(query) ||
                pt.tag.toLowerCase().includes(query) ||
                pt.description.toLowerCase().includes(query) ||
                pt.subrooms.some(sub => sub.name.toLowerCase().includes(query) || sub.desc.toLowerCase().includes(query));

            if (matchesQuery) {
                renderedCount++;
                const card = document.createElement('div');
                card.className = 'room-card state-card';
                const ptImg = getRoomImage(pt);
                card.innerHTML = `
                    <div class="room-banner">
                        <img src="${ptImg}" alt="${escapeHTML(pt.title)}" class="room-banner-img" loading="lazy">
                        <span class="room-badge badge-overlay badge-rose">${pt.tag}</span>
                    </div>
                    <div class="room-card-body">
                        <div class="room-card-header">
                            <div class="room-header-row">
                                <span class="room-emoji">${pt.icon}</span>
                                <h3 class="room-title">${escapeHTML(pt.title)}</h3>
                            </div>
                            <p class="room-desc">${escapeHTML(pt.description)}</p>
                        </div>

                        <div class="state-subrooms-container">
                            <div class="subrooms-label">🇵🇹 Cidades & Zonas:</div>
                            <div class="subrooms-grid">
                                ${pt.subrooms.map(sub => `
                                    <button type="button" class="subroom-pill-btn ${sub.id.includes('capital') || sub.id.includes('porto') ? 'capital-highlight' : ''}" data-sub-id="${sub.id}">
                                        <span class="subroom-pill-icon">${sub.id.includes('capital') || sub.id.includes('porto') ? '🏛️' : '📍'}</span>
                                        <span class="subroom-pill-text">${escapeHTML(sub.name)}</span>
                                        <span class="subroom-pill-arrow">Entrar →</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

                card.querySelectorAll('.subroom-pill-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const subId = btn.getAttribute('data-sub-id');
                        const targetSub = pt.subrooms.find(s => s.id === subId);
                        if (targetSub) {
                            enterRoom({
                                id: targetSub.id,
                                title: `${pt.title} — ${targetSub.name}`,
                                icon: pt.icon,
                                description: targetSub.desc,
                                rules: "Comunidade em Portugal"
                            });
                        }
                    });
                });

                dom.roomsGridContainer.appendChild(card);
            }
        });
    }

    // Se a busca não encontrou nada
    if (renderedCount === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-rooms-banner';
        empty.innerHTML = `
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">🔍</div>
            <h4 style="color: var(--text-main); margin-bottom: 0.4rem;">Nenhuma sala encontrada</h4>
            <p style="font-size: 0.88rem; max-width: 450px; margin: 0 auto 1.25rem auto;">
                Não encontramos resultados para "${escapeHTML(query)}". Tente o nome de outro estado, capital ou limpe a busca.
            </p>
            <button class="btn btn-ghost btn-sm" id="btn-clear-search">Limpar Busca</button>
        `;
        empty.querySelector('#btn-clear-search')?.addEventListener('click', () => {
            if (dom.roomsSearchInput) dom.roomsSearchInput.value = '';
            state.searchQuery = '';
            renderRoomsGrid();
        });
        dom.roomsGridContainer.appendChild(empty);
    }
}

// ============================================================================
// ENTRADA NA SALA DE CHAT
// ============================================================================
function enterRoom(room) {
    if (!state.user) {
        openAuthModal("signup", `Para entrar na sala "${room.title}", registre ou entre com seu Nick.`);
        return;
    }

    state.currentRoom = room;
    dom.chatCurrentRoomTitle.innerHTML = `${room.icon} ${escapeHTML(room.title)}`;
    dom.chatCurrentRoomDesc.textContent = `${room.description} ${room.rules ? `(${room.rules})` : ''}`;
    dom.chatMessagesContainer.innerHTML = `
        <div style="text-align: center; padding: 2rem 0; color: var(--text-muted); font-size: 0.88rem;">
            <span>💜 Conectando à sala <strong>${escapeHTML(room.title)}</strong>...</span>
        </div>
    `;

    navigateTo('page-chat');
    subscribeToRoom(room.id, renderMessagesFeed);
}

// ============================================================================
// RENDERIZAÇÃO DO FEED DE MENSAGENS
// ============================================================================
function renderMessagesFeed(messages) {
    if (!messages || messages.length === 0) {
        dom.chatMessagesContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">☀️</div>
                <h4 style="color: var(--text-soft); margin-bottom: 0.3rem;">Esta sala está serena</h4>
                <p style="font-size: 0.88rem;">Seja a primeira pessoa a deixar uma mensagem de bom dia, puxar papo ou mandar um carinho!</p>
            </div>
        `;
        return;
    }

    dom.chatMessagesContainer.innerHTML = '';
    const currentUid = state.user?.uid;

    messages.forEach(msg => {
        const isSent = msg.uid === currentUid;
        const isAction = msg.isAction === true;

        const row = document.createElement('div');

        if (isAction) {
            row.className = 'msg-row action-event';
            row.innerHTML = `
                <div class="msg-action-bubble">
                    ${escapeHTML(msg.text)}
                </div>
            `;
            dom.chatMessagesContainer.appendChild(row);
            return;
        }

        row.className = `msg-row ${isSent ? 'sent' : 'received'}`;

        const avatarEmoji = msg.avatar || "☀️";
        const authorName = escapeHTML(msg.displayName || (isSent ? 'Você' : 'Amigo(a)'));
        const subnickText = msg.subnick ? ` • ${escapeHTML(msg.subnick)}` : '';
        const safeText = escapeHTML(msg.text);
        const timeStr = formatTime(msg.createdAt);

        row.innerHTML = `
            <div class="msg-avatar" title="${authorName}">${avatarEmoji}</div>
            <div class="msg-bubble-wrap">
                <div class="msg-header">
                    <span class="msg-author">${authorName}</span>
                    <span style="color: var(--text-subtle); font-size: 0.72rem;">${subnickText}</span>
                    <span class="msg-time">${timeStr}</span>
                </div>
                <div class="msg-bubble">
                    ${safeText}
                </div>
            </div>
        `;

        dom.chatMessagesContainer.appendChild(row);
    });

    dom.chatMessagesContainer.scrollTop = dom.chatMessagesContainer.scrollHeight;
}

// ============================================================================
// ENVIO DE MENSAGENS E AÇÕES LEVES
// ============================================================================
dom.chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = dom.chatMessageInput.value.trim();
    if (!text) return;

    if (!state.user) {
        openAuthModal("login", "Você precisa estar conectado para enviar mensagens.");
        return;
    }

    dom.chatMessageInput.value = '';

    try {
        await sendChatMessage(text, state.userProfile);
    } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
    }
});

// Ações Sociais Acolhedoras (100% em Português)
dom.btnActionCharme.addEventListener('click', async () => {
    if (!state.user) return openAuthModal("login");
    const nick = state.userProfile.displayName;
    await sendChatMessage(`* ${nick} enviou um carinho especial para a sala 💖 ✨ *`, state.userProfile, { isAction: true });
});

dom.btnActionCafe.addEventListener('click', async () => {
    if (!state.user) return openAuthModal("login");
    const nick = state.userProfile.displayName;
    await sendChatMessage(`* ${nick} preparou uma xícara de café quentinho para acompanhar a conversa ☕ *`, state.userProfile, { isAction: true });
});

dom.btnActionLuz.addEventListener('click', async () => {
    if (!state.user) return openAuthModal("login");
    const nick = state.userProfile.displayName;
    await sendChatMessage(`* ${nick} desejou um dia leve, cheio de paz e sorrisos para todos! ✨ ☀️ *`, state.userProfile, { isAction: true });
});

dom.btnActionAbraco.addEventListener('click', async () => {
    if (!state.user) return openAuthModal("login");
    const nick = state.userProfile.displayName;
    await sendChatMessage(`* ${nick} mandou um abraço coletivo apertado para quem estiver online 🫂 💜 *`, state.userProfile, { isAction: true });
});

// ============================================================================
// GERENCIAMENTO DE AUTENTICAÇÃO
// ============================================================================
function updateAuthUI(user) {
    state.user = user;
    dom.navAuthContainer.innerHTML = '';

    if (user) {
        const savedNick = localStorage.getItem(`posichat_nick_${user.uid}`) || user.displayName || generateFriendlyNickname();
        const savedSubnick = localStorage.getItem(`posichat_subnick_${user.uid}`) || "";
        const savedAvatar = localStorage.getItem(`posichat_avatar_${user.uid}`) || "☀️";

        state.userProfile = {
            displayName: savedNick,
            subnick: savedSubnick,
            avatar: savedAvatar,
            uid: user.uid
        };

        const userBadge = document.createElement('div');
        userBadge.className = 'user-badge';
        userBadge.innerHTML = `
            <span>${savedAvatar}</span>
            <span class="user-badge-nick">${escapeHTML(savedNick)}</span>
            ${savedSubnick ? `<span class="user-subnick-tag">• ${escapeHTML(savedSubnick)}</span>` : ''}
        `;

        const btnLobbyNav = document.createElement('button');
        btnLobbyNav.className = 'btn btn-primary btn-sm';
        btnLobbyNav.innerHTML = '<span>Salas</span>';
        btnLobbyNav.addEventListener('click', () => navigateTo('page-lobby'));

        const btnLogout = document.createElement('button');
        btnLogout.className = 'btn btn-ghost btn-sm';
        btnLogout.innerHTML = '<span>Sair</span>';
        btnLogout.addEventListener('click', () => signOut(auth));

        dom.navAuthContainer.appendChild(userBadge);
        dom.navAuthContainer.appendChild(btnLobbyNav);
        dom.navAuthContainer.appendChild(btnLogout);
    } else {
        state.userProfile = {
            displayName: "Visitante",
            subnick: "",
            avatar: "☀️",
            uid: null
        };

        const btnLogin = document.createElement('button');
        btnLogin.className = 'btn btn-ghost btn-sm';
        btnLogin.textContent = 'Entrar';
        btnLogin.addEventListener('click', () => openAuthModal("login"));

        const btnSignup = document.createElement('button');
        btnSignup.className = 'btn btn-primary btn-sm';
        btnSignup.textContent = 'Registrar Nick';
        btnSignup.addEventListener('click', () => openAuthModal("signup"));

        dom.navAuthContainer.appendChild(btnLogin);
        dom.navAuthContainer.appendChild(btnSignup);
    }
}

onAuthStateChanged(auth, (user) => {
    updateAuthUI(user);
});

// ============================================================================
// MODAL DE AUTENTICAÇÃO
// ============================================================================
function openAuthModal(mode = "login", notice = "") {
    state.authMode = mode;
    dom.modalAuth.classList.add('active');
    dom.authErrorBanner.classList.remove('active');
    dom.authErrorBanner.textContent = '';

    if (notice) {
        dom.authErrorBanner.textContent = notice;
        dom.authErrorBanner.classList.add('active');
    }

    if (mode === "login") {
        dom.tabLogin.classList.add('active');
        dom.tabSignup.classList.remove('active');
        dom.btnAuthSubmit.textContent = 'Entrar no PosiChat';
    } else {
        dom.tabLogin.classList.remove('active');
        dom.tabSignup.classList.add('active');
        dom.btnAuthSubmit.textContent = 'Registrar Nick e Conectar';
        if (!dom.authNickname.value) {
            dom.authNickname.value = generateFriendlyNickname();
        }
    }
}

function closeAuthModal() {
    dom.modalAuth.classList.remove('active');
}

dom.tabLogin.addEventListener('click', () => openAuthModal("login"));
dom.tabSignup.addEventListener('click', () => openAuthModal("signup"));
dom.btnCloseAuthModal.addEventListener('click', closeAuthModal);
dom.modalAuth.addEventListener('click', (e) => {
    if (e.target === dom.modalAuth) closeAuthModal();
});

dom.btnGenerateNick.addEventListener('click', () => {
    dom.authNickname.value = generateFriendlyNickname();
});

// Login com Google
dom.btnGoogleAuth.addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        if (result.user) {
            const currentNick = localStorage.getItem(`posichat_nick_${result.user.uid}`) || result.user.displayName || generateFriendlyNickname();
            localStorage.setItem(`posichat_nick_${result.user.uid}`, currentNick);
            localStorage.setItem(`posichat_avatar_${result.user.uid}`, state.selectedAvatar || "☀️");
            closeAuthModal();
            navigateTo('page-lobby');
        }
    } catch (err) {
        showAuthError(err.message);
    }
});

// Formulário E-mail e Senha
dom.authEmailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = dom.authEmail.value.trim();
    const password = dom.authPassword.value;
    const nickname = dom.authNickname.value.trim() || generateFriendlyNickname();
    const subnick = dom.authSubnick.value.trim();

    if (state.authMode === "signup") {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCred.user, { displayName: nickname });
            localStorage.setItem(`posichat_nick_${userCred.user.uid}`, nickname);
            localStorage.setItem(`posichat_subnick_${userCred.user.uid}`, subnick);
            localStorage.setItem(`posichat_avatar_${userCred.user.uid}`, state.selectedAvatar);
            closeAuthModal();
            navigateTo('page-lobby');
        } catch (err) {
            showAuthError(err.message);
        }
    } else {
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            if (nickname) {
                localStorage.setItem(`posichat_nick_${userCred.user.uid}`, nickname);
            }
            if (subnick) {
                localStorage.setItem(`posichat_subnick_${userCred.user.uid}`, subnick);
            }
            closeAuthModal();
            navigateTo('page-lobby');
        } catch (err) {
            showAuthError(err.message);
        }
    }
});

function showAuthError(message) {
    const clean = message
        .replace("Firebase: Error ", "")
        .replace(/\(auth\/.*\)\.?/, "")
        .replace("auth/invalid-credential", "E-mail ou senha incorretos.")
        .replace("auth/email-already-in-use", "Este e-mail já possui um nick registrado.")
        .replace("auth/weak-password", "A senha deve ter pelo menos 6 caracteres.");

    dom.authErrorBanner.textContent = clean || "Ocorreu um erro ao entrar.";
    dom.authErrorBanner.classList.add('active');
}

function initAvatarPicker() {
    dom.avatarPickerContainer.innerHTML = '';
    AVATARS.forEach((av, idx) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = `avatar-option ${idx === 0 ? 'selected' : ''}`;
        item.innerHTML = av.emoji;
        item.title = av.name;
        item.addEventListener('click', () => {
            document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            state.selectedAvatar = av.emoji;
        });
        dom.avatarPickerContainer.appendChild(item);
    });
}

// ============================================================================
// NAVEGAÇÃO
// ============================================================================
dom.navBrand.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('page-home');
});

dom.btnNavAgenda.addEventListener('click', () => {
    navigateTo('page-home');
    document.getElementById('section-agenda')?.scrollIntoView({ behavior: 'smooth' });
});

dom.btnHeroEnter.addEventListener('click', () => {
    navigateTo('page-lobby');
});

dom.btnHeroAgenda.addEventListener('click', () => {
    document.getElementById('section-agenda')?.scrollIntoView({ behavior: 'smooth' });
});

dom.btnChatBackLobby.addEventListener('click', () => {
    navigateTo('page-lobby');
});

dom.linkFooterHome.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('page-home');
});

dom.linkFooterAgenda.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('page-home');
    document.getElementById('section-agenda')?.scrollIntoView({ behavior: 'smooth' });
});

// ============================================================================
// INICIALIZAÇÃO GERAL
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    initAvatarPicker();
    initCategoryFilter();
    renderRoomsGrid();
    initMeetsGrid();
    initProposeMeetModal();
    console.log("PosiChat inicializado com sucesso. Você não está só. 💜");
});
