import fs from "fs";
import path from "path";

type MarkdownFileInput<T extends string> = {
  path: string;
  id: T;
};

interface MarkdownData {
  content: string;
}

class PromptLoader<T extends string> {
  private markdownCache: Map<T, MarkdownData>;
  public markdownFiles: MarkdownFileInput<T>[];

  constructor(markdownFiles: readonly MarkdownFileInput<T>[]) {
    this.markdownCache = new Map<T, MarkdownData>();
    this.markdownFiles = [...markdownFiles];
    this.loadMarkdownFiles();
  }

  private loadMarkdownFiles(): void {
    const files = this.markdownFiles;
    files.forEach(({ path: filePath, id }) => {
      const absolutePath = path.join(process.cwd(), filePath);
      if (!fs.existsSync(absolutePath)) {
        console.warn(`File not found: ${absolutePath}`);
        return;
      }
      const content = fs.readFileSync(absolutePath, "utf8");

      const markdownData: MarkdownData = {
        content,
      };

      this.markdownCache.set(id, markdownData);
    });
  }

  public getPromptById(id: T): MarkdownData {
    return this.markdownCache.get(id)!;
  }

  public clearCache(): void {
    this.markdownCache.clear();
  }

  public getCacheSize(): number {
    return this.markdownCache.size;
  }
}

const prompts = [
  {
    path: "src/prompts/thread-title-generator.md",
    id: "TITLE_GENERATOR",
  },
] as const;

type PromptIds = (typeof prompts)[number]["id"];

/**
 * This will load the all prompt in memory once file executed.
 * But don't add too much files or too big file.
 * We don't want to overload the memory.
 */
const promptLoader = new PromptLoader<PromptIds>(prompts);

export default promptLoader;
