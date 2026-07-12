export interface AboutMe {
  name: string
  tagline: string
  avatarSrc: string
  location: string
  bio: string[]
}

export const aboutMe: AboutMe = {
  name: 'Miiysa',
  tagline: 'Graphic Designer.',
  avatarSrc: '/photos/icon.jpg',
  location: 'Jakarta, Indonesia',
  bio: [
    "Hi! Nice to know you stopped by my profile", 
    "I'm a graphic designer who loves turning ideas into visuals that are both meaningful and aesthetically pleasing. Beyond design, I'm currently learning iOS development because I'm passionate about creating beautiful, functional digital experiences.",
    "Whether you're here to hire me, collaborate, or just say hi, I'd love to connect, become friends"
  ],
}

export interface SkillGroup {
  category: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { category: 'Design Tools', items: ['Photoshop', 'Illustrator', 'Figma', 'Capcut', 'After Effects', 'Canva'] },
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'HTML', 'CSS']
  },
  {
    category: 'Frameworks & Libraries',
    items: ['Vue', 'React', 'Tailwind CSS']
  }
]

export interface ProjectItem {
  title: string
  description: string
  tags: string[]
  link?: string
}

export const projects: ProjectItem[] = [
  {
    title: 'I will update this later'
  },
  
]

export interface HobbyItem {
  title: string
  description: string
}

export const hobbies: HobbyItem[] = [
  { title: 'Content creation', description: 'Capturing me and a moment, sometimes my ideas too.' },
  { title: 'Makeup', description: 'Feel so happy to see my makeup looks come to life.' },
  { title: 'Code', description: 'Writing clean, efficient code.' },
  { title: 'Music', description: 'Playing tate mcrae songs and rap are my fav.' },
  { title: 'Drawing', description: 'This release stress sometimes.' },
]

export interface NoteItem {
  id: string
  title: string
  date: string
  content: string
}

export const notes: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Welcome to my notes',
    date: 'Jul 12 2026',
    content:
      'This is where I share my thoughts, ideas, and insights on design, development, and life in general. I always dream of reading these notes years from now, so I can see how much I have grown and changed over time. I hope you enjoy reading them as much as I enjoy writing them.'
  }
]
