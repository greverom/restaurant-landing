type MockUser = {
    email: string
    password: string
    name: string
  }
  
  const mockUsers: MockUser[] = [
    {
      email: "goyo@gmail.com",
      password: "123456",
      name: "Gregorio Velez",

    },
    {
      email: "cindy@gmail.com",
      password: "123456",
      name: "Cindy García",

    },
    {
      email: "silvana@gmail.com",
      password: "123456",
      name: "Silvana García",

    },
  ]
  
  export const signinMock = async (email: string, password: string): Promise<MockUser | null> => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    )
  
    return user ?? null
  }