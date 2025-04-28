class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
  blogPostIds: Set<string> = new Set();

  constructor() {

  }
}

export class Trie {
  private root = new TrieNode();

  insert(word: string, blogPostId: string): void {

    let node = this.root;

    for (const char of word.toLowerCase()) {

      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }

    node.isEndOfWord = true;
    node.blogPostIds.add(blogPostId);
  }

  search(prefix: string): string[] {

    const term = prefix.toLowerCase().trim();
    let node = this.root;

    for (const char of term) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }

    return Array.from(this.collectAllIds(node));
  }

  // Recursively collect IDs into a Set to avoid duplicates
  private collectAllIds(node: TrieNode): Set<string> {
    
    const ids = new Set<string>();

    if (node.isEndOfWord) {
      for (const id of node.blogPostIds) {
        ids.add(id);
      }
    }

    for (const child of node.children.values()) {
      for (const id of this.collectAllIds(child)) {
        ids.add(id);
      }
    }

    return ids;
  }
}
