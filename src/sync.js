import {doc,onSnapshot,setDoc,serverTimestamp} from 'firebase/firestore';
import {db} from './firebase';

export function observeProfile(uid, onData, onStatus, onError) {
  return onSnapshot(doc(db, 'users', uid, 'private', 'profile'), {includeMetadataChanges:true}, snap=>{
    const info = snap.metadata;
    onStatus(info.hasPendingWrites ? 'pending' : info.fromCache ? 'offline' : 'synced');
    if (snap.exists()) onData(snap.data());
    else if (!info.fromCache) onData(null);
  }, onError);
}
export async function saveCloudProfile(uid, profile) {
  // Only explicitly whitelisted personal profile fields. Never consultation data.
  await setDoc(doc(db, 'users', uid, 'private', 'profile'), {
    name:profile.name.trim().slice(0,50), birth:profile.birth,
    updatedAt:serverTimestamp(), schemaVersion:1,
  });
}
