import axios from 'axios';

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// User data storage (in-memory database with localStorage persistence)
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Default demo users
const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'Demo@123',
  },
];

// Load users from localStorage or use defaults
const loadUsers = (): User[] => {
  if (typeof window === 'undefined') return defaultUsers;
  const stored = localStorage.getItem('usersDatabase');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('usersDatabase', JSON.stringify(defaultUsers));
  return defaultUsers;
};

// Save users to localStorage
const saveUsers = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('usersDatabase', JSON.stringify(users));
  }
};

// Initialize users database
let usersDatabase: User[] = loadUsers();

// Types for authentication
export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

// Get all users (for debugging)
export const getAllUsers = (): User[] => {
  return usersDatabase;
};

// API functions
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  console.log('SignIn API Call - Data:', data);
  
  // Reload users from localStorage to get latest data
  usersDatabase = loadUsers();
  console.log('Current Users Database (reloaded):', usersDatabase);
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find user by email
      const user = usersDatabase.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
      
      if (!user) {
        reject(new Error('User not found. Please sign up first.'));
        return;
      }
      
      // Validate password
      if (user.password !== data.password) {
        reject(new Error('Invalid password. Please try again.'));
        return;
      }
      
      console.log('SignIn Successful - User Found:', user);
      
      resolve({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: `jwt-token-${user.id}`,
      });
    }, 1000);
  });
};

export const signUp = async (data: SignUpData): Promise<AuthResponse> => {
  console.log('SignUp API Call - Data:', data);
  
  // Reload users from localStorage to get latest data
  usersDatabase = loadUsers();
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if email already exists
      const existingUser = usersDatabase.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
      
      if (existingUser) {
        reject(new Error('Email already registered. Please sign in.'));
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: String(usersDatabase.length + 1),
        name: data.name,
        email: data.email,
        password: data.password,
      };
      
      // Add to database
      usersDatabase.push(newUser);
      
      // Persist to localStorage
      saveUsers(usersDatabase);
      
      console.log('SignUp Successful - New User Created:', newUser);
      console.log('Updated Users Database:', usersDatabase);
      
      resolve({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token: `jwt-token-${newUser.id}`,
      });
    }, 1000);
  });
};
