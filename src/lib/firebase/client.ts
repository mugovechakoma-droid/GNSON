// Mock Firebase Client Auth
export async function signInWithEmailAndPasswordMock(email: string, password: string) {
  if (email === 'admin@hub.edu' && password === 'password') {
    return { user: { uid: 'admin_user_id', getIdToken: async () => 'mock_admin_token' } };
  } else if (email === 'instructor@hub.edu' && password === 'password') {
    return { user: { uid: 'instructor_user_id', getIdToken: async () => 'mock_instructor_token' } };
  } else if (email === 'student@hub.edu' && password === 'password') {
    return { user: { uid: 'student_user_id', getIdToken: async () => 'mock_student_token' } };
  }

  throw new Error('Invalid email or password');
}
