export type Post = {
    title: string,
    slug: string | undefined,
    author: string,
    text: string,
    createdAt: Date,
    updatedAt: Date,
}