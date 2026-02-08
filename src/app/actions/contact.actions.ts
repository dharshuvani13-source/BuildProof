
'use server';

import { z } from 'zod';
import { initializeFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendContactMessage(values: z.infer<typeof ContactSchema>) {
    const validatedFields = ContactSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid fields.' };
    }

    try {
        const { firebaseApp } = initializeFirebase();
        const db = getFirestore(firebaseApp);
        await addDoc(collection(db, 'contactMessages'), {
            ...validatedFields.data,
            sentAt: serverTimestamp(),
        });
        return { success: true, message: 'Message sent successfully.' };
    } catch (error) {
        console.error("Contact form error:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
