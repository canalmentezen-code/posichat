// Motor do Chat em Tempo Real — PosiChat Lounge
import { 
    db, 
    auth, 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    limit, 
    onSnapshot, 
    serverTimestamp 
} from "./firebase.js";

let unsubscribeCurrentRoom = null;
let currentRoomId = "global";

export function formatTime(timestamp) {
    if (!timestamp) return "Agora";
    try {
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } catch {
        return "Agora";
    }
}

export function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Conecta à sala selecionada e escuta as mensagens em tempo real
 */
export function subscribeToRoom(roomId, onMessagesUpdate) {
    if (unsubscribeCurrentRoom) {
        unsubscribeCurrentRoom();
        unsubscribeCurrentRoom = null;
    }

    currentRoomId = roomId;

    const messagesRef = collection(db, "rooms", currentRoomId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"), limit(120));

    unsubscribeCurrentRoom = onSnapshot(q, (snapshot) => {
        const messages = [];
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            messages.push({
                id: docSnap.id,
                ...data
            });
        });
        onMessagesUpdate(messages);
    }, (error) => {
        console.error("Erro ao escutar mensagens:", error);
    });

    return {
        isBotRoom: false
    };
}

/**
 * Envia uma mensagem pública ou ação especial para a sala atual
 */
export async function sendChatMessage(text, userProfile, options = {}) {
    if (!text.trim() || !userProfile || !auth.currentUser) return;

    const messagesRef = collection(db, "rooms", currentRoomId, "messages");
    
    // Verifica se é comando de sussurro
    let isWhisper = options.isWhisper || false;
    let whisperTo = options.whisperTo || null;
    let cleanText = text.trim();

    if (cleanText.toLowerCase().startsWith("/sussurro") || cleanText.toLowerCase().startsWith("/w")) {
        const parts = cleanText.split(" ");
        if (parts.length >= 3) {
            whisperTo = parts[1].replace('@', '');
            cleanText = parts.slice(2).join(" ");
            isWhisper = true;
        }
    }

    await addDoc(messagesRef, {
        text: cleanText,
        uid: auth.currentUser.uid,
        displayName: userProfile.displayName || "Visitante",
        avatar: userProfile.avatar || "🍸",
        subnick: userProfile.subnick || "",
        isAction: options.isAction || false,
        isWhisper: isWhisper,
        whisperTo: whisperTo,
        reactions: { charm: 0, cheers: 0, fire: 0 },
        createdAt: serverTimestamp()
    });
}
