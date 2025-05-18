export interface Tester {
  id: number
  email: string
  password: string
  name: string
  isDev: boolean
  karma: number
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
  type: BugType
  image: string
}

export enum BugType {
  Crash = 'Crash',
  Graphical = 'Graphical',
  Sound = 'Sound',
  UI = 'UI',
  Performance = 'Performance',
  Gameplay = 'Gameplay',
  Network = 'Network'
}
