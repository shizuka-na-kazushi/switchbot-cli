import * as os from 'os';
import * as path from 'path';
import fs from 'fs/promises';

export class XDGPaths {
  private readonly appName: string;
  
  constructor(appName: string = "switchbot-cli") {
    this.appName = appName;
  }

  /**
   * アプリケーションの設定ディレクトリのパスを取得
   */
  getConfigPath(): string {
    const configBase = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config');
    return path.join(configBase, this.appName);
  }

  /**
   * アプリケーションのキャッシュディレクトリのパスを取得
   */
  getCachePath(): string {
    const cacheBase = process.env.XDG_CACHE_HOME || path.join(os.homedir(), '.cache');
    return path.join(cacheBase, this.appName);
  }

  /**
   * アプリケーションのデータディレクトリのパスを取得
   */
  getDataPath(): string {
    const dataBase = process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share');
    return path.join(dataBase, this.appName);
  }

  /**
   * アプリケーションの状態ディレクトリのパスを取得
   */
  getStatePath(): string {
    const stateBase = process.env.XDG_STATE_HOME || path.join(os.homedir(), '.local', 'state');
    return path.join(stateBase, this.appName);
  }

  /**
   * create dirs
   */
  async init(): Promise<boolean> {
    // 必要なディレクトリを作成
    const dirs = [
      this.getConfigPath(),
      this.getCachePath(),
      this.getDataPath(),
      this.getStatePath()
    ];

    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }
    return true;
  }

  /**
   * clean dirs
   */
  async clean(): Promise<boolean> {
      // 必要なディレクトリを作成
      const dirs = [
        this.getConfigPath(),
        this.getCachePath(),
        this.getDataPath(),
        this.getStatePath()
      ];

      for (const dir of dirs) {
        console.log(`removing: ${dir}`);
        await fs.rm(dir, { recursive: true, force: true });
      }
      return true;
  }
}

