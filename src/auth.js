// Dans ce module je centralise l'état de isAdmin pour toute l'application
// Un changement d'état de isAdmin provoquera le re-render de tous les composants que j'aurais configuré

let isAdmin = false;

export function setAdmin(value){
    isAdmin = value
    // provoquer le re render de tous les composants associé à listeners
    notifyListeners()
}

export function getIsAdmin(){
    return isAdmin
}

// Liste d'écoute
const listeners = []

// J'ajoute tous les setIsAdmin qui appartiennent aux composants
// dont je souhaite provoquer le re-render à la mise à jour de isAdmin de n'importe lequel
// de ces composants
export function subscribeToAuth(callback){
    listeners.push(callback)
}

function notifyListeners(){
    listeners.forEach(callback => callback(isAdmin))
}