class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  blogPostIds: string[];

  constructor () {
    this.children = new Map();
    this.isEndOfWord = false;
    this.blogPostIds = [];
  }
}


export class Trie {
  private root: TrieNode;

  constructor () {
    this.root = new TrieNode();
  }

  insert (title: string, blogPostId: string): void {
    let node = this.root;
    for (const char of title.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      
      node = node.children.get(char) as TrieNode;
    }

    node.isEndOfWord = true;
    node.blogPostIds.push(blogPostId);
  }

  search(prefix: string): string[] {
    
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children.has(char)) {
        return [];
      }

      node = node.children.get(char) as TrieNode;
    }

    return this.collectAllBlogPostIds(node);
  }

  private collectAllBlogPostIds(node: TrieNode): string[] {
    const result: string[] = [];

    if (node.isEndOfWord) {
      result.push(...node.blogPostIds);
    }

    for (const childNode of node.children.values()) {
      result.push(...this.collectAllBlogPostIds(childNode));
    }

    return result;
  }
}