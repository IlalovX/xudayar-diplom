export interface User {
	id: number
	username: string
	role: 'admin' | 'teacher'
	fullName: string
	email?: string
	avatar?: string
}

export interface News {
	id: number
	title: string
	content: string
	image?: string
	createdAt: string
	updatedAt: string
	slug: string
}

export interface Document {
	id: number
	title: string
	description?: string
	file: string
	categoryId: number
	yearId: number
	createdAt: string
	updatedAt: string
}

export interface DocumentCategory {
	id: number
	name: string
	description?: string
}

export interface EducationYear {
	id: number
	name: string
	isActive: boolean
}

export interface Teacher {
	id: number
	fullName: string
	position: string
	department: string
	bio?: string
	image?: string
	email?: string
	phone?: string
}

export interface MenuItem {
	id: string
	title: string
	path: string
	icon?: string
	children?: MenuItem[]
}
