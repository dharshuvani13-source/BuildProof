'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDocs, updateDoc, collection, query, where } from 'firebase/firestore';

// NOTE: In a real-world application, NEVER store passwords in plaintext.
// Always hash and salt passwords using a library like bcrypt.
// This is a simplified example due to project constraints.

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

interface UserData {
    uid: string;
    email: string;
    password?: string; // Should be hashed
    isVerified: boolean;
    otp?: string;
    otpExpires?: {
      seconds: number;
      nanoseconds: number;
    } | Date;
}


// A simple function to generate a random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function signupUser(values: z.infer<typeof SignupSchema>) {
    const validatedFields = SignupSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid fields.' };
    }

    const { email, password } = validatedFields.data;

    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return { success: false, message: 'Email already in use.' };
        }
        
        const uid = doc(collection(db, 'users')).id;
        const otp = generateOtp();
        const otpExpires = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes

        const newUser: UserData = {
            uid,
            email,
            password, // Again, HASH THIS in a real app
            isVerified: false,
            otp,
            otpExpires,
        };

        await setDoc(doc(db, 'users', uid), newUser);

        // In a real app, you would send the OTP via email here.
        console.log(`Generated OTP for ${email}: ${otp}`);

        return { success: true, message: 'Confirmation OTP sent. Please check your console.', email: email };

    } catch (error) {
        console.error("Signup error:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function verifyOtp(email: string, otp: string) {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, message: "User not found." };
        }
        
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data() as UserData;

        if (userData.isVerified) {
            return { success: true, message: "Email already verified." };
        }

        if (userData.otp !== otp) {
            return { success: false, message: "Invalid OTP." };
        }
        
        const otpExpiresDate = userData.otpExpires ? ('seconds' in userData.otpExpires ? new Date(userData.otpExpires.seconds * 1000) : new Date(userData.otpExpires)) : null;

        if (otpExpiresDate && new Date() > otpExpiresDate) {
            return { success: false, message: "OTP has expired." };
        }

        await updateDoc(userDoc.ref, {
            isVerified: true,
            otp: null,
            otpExpires: null,
        });

        return { success: true, message: "Email verified successfully.", user: { uid: userData.uid, email: userData.email } };

    } catch (error) {
        console.error("OTP verification error:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}


export async function loginUser(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid fields.' };
    }
    
    const { email, password } = validatedFields.data;

    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { success: false, message: 'Invalid email or password.' };
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data() as UserData;

        if (userData.password !== password) {
            return { success: false, message: 'Invalid email or password.' };
        }

        if (!userData.isVerified) {
            return { success: false, message: 'Please verify your email first.' };
        }

        return { success: true, user: { uid: userData.uid, email: userData.email } };

    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
