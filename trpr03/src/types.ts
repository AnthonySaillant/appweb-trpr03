export interface Tester {
  id: number
  email: string
  password: string
  name: string
  isDev: boolean
}

export interface Bug {
  id: number
  userId: number
  title: string
  description: string
  productionStep: string
  platform: string
  priority: string
  isVerified: boolean
}
