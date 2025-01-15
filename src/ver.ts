
import { readFileSync } from "node:fs";
import { join } from "node:path";

// package.jsonの型定義
export type PackageJson = {
  version: string;
  description: string;
  [key: string]: any;
};

// package.jsonを読み込む関数
export default function getPackageJson(): PackageJson {
  try {
    // __dirnameを使用してプロジェクトルートのpackage.jsonを参照
    const packageJsonPath = join(__dirname, '..', 'package.json');
    const packageJson: PackageJson = JSON.parse(
      readFileSync(packageJsonPath, 'utf8')
    );
    return packageJson;
  } catch (error) {
    console.error('Error reading package.json');
    return {version: "0.0.0", description: "unknown"};
  }
}
