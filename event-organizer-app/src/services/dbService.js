import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

const EVENTS_COLLECTION = "events";

// Function to create an event
export const createEvent = async (eventData) => {
  try {
    const eventRef = await addDoc(collection(firestore, EVENTS_COLLECTION), {
      ...eventData,
      createdAt: new Date(),
    });
    return eventRef.id; // Return the event ID after saving
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Function to get all events for the events dashboard
export const getAllEvents = async () => {
  const snapshot = await getDocs(collection(firestore, EVENTS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Function to delete an event from the firestore db
export const deleteEvent = async (eventId) => {
  await deleteDoc(doc(firestore, EVENTS_COLLECTION, eventId));
};

// Function to update an event
export const updateEvent = async (eventId, updatedData) => {
  const eventRef = doc(firestore, EVENTS_COLLECTION, eventId);
  await updateDoc(eventRef, updatedData);
};

// get event details for a specific event id for event details screen
export const getEventDetails = async (eventId) => {
  try {
    const eventRef = doc(firestore, EVENTS_COLLECTION, eventId);
    const eventDoc = await getDoc(eventRef);

    if (!eventDoc.exists()) {
      throw new Error("Event not found");
    }

    return { id: eventDoc.id, ...eventDoc.data() };
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};

// Function to add / delete an event from a users favorite list
export const toggleFavorite = async (userId, eventId, isFavorite) => {
  // Favorite structure: collection("favorites") where each doc = { userId, eventId }
  // And the id for the docs are userId_eventId
  const favRef = doc(firestore, "favorites", `${userId}_${eventId}`);
  if (isFavorite) {
    await deleteDoc(favRef);
  } else {
    await setDoc(favRef, { userId, eventId });
  }
};

// Get a user's favorite event ids for favorites tab list
export const getFavoriteEventIds = async (userId) => {
  const q = query(
    collection(firestore, "favorites"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data().eventId);
};

// Get full event details for a user's favorite events
export const getFavoriteEvents = async (userId) => {
  const favIds = await getFavoriteEventIds(userId);
  if (favIds.length === 0) return [];
  const allEvents = await getDocs(collection(firestore, "events"));
  return allEvents.docs
    .filter((doc) => favIds.includes(doc.id))
    .map((doc) => ({ id: doc.id, ...doc.data() }));
};
