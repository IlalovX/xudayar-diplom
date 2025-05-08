export interface User {
  id: number
  username: string
  role: "admin" | "teacher"
  fullName: string
  email?: string
  avatar?: string
}

export interface News {
  id: number
  title: string
  text: string
  images: Record<string, string>
  createdAt?: string
  updatedAt?: string
  slug?: string
}

export interface Document {
  id: string
  document_name: string
  document_description?: string
  document: string
  category_id: string
  document_year: string
  createdAt?: string
  updatedAt?: string
}

export interface DocumentCategory {
  id: number
  name: string
  description?: string
  category_name?: string
}

export interface EducationYear {
  id: number
  name: string
  isActive: boolean
  year?: string
}

export interface Teacher {
  id: string
  full_name: string
  logo_teacher?: string
  position_id: number
  username?: string
  password?: string
  role?: string
  phone_number?: string
}

export interface MenuItem {
  id: string
  title: string
  path: string
  icon?: string
  children?: MenuItem[]
}
