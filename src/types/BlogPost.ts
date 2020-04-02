export default interface BlogPost {
  title: string;
  slug?: string;
  author: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
