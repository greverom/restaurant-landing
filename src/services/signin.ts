type Role = "administrador" | "mesero" | "cocinero"

type MockUser = {
  email: string
  password: string
  name: string
  role: Role
}

const mockUsers: MockUser[] = [
  {
    email: "goyo@gmail.com",
    password: "123456",
    name: "Gregorio Velez",
    role: "administrador",
  },
  {
    email: "cindy@gmail.com",
    password: "123456",
    name: "Cindy García",
    role: "mesero",
  },
  {
    email: "silvana@gmail.com",
    password: "123456",
    name: "Silvana García",
    role: "cocinero",
  },
]

export const signinMock = async (
  email: string,
  password: string
): Promise<MockUser | null> => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  )
  return user ?? null
}