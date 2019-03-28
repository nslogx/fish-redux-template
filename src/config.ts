import * as path from 'path';
import * as os from 'os';
const json = require('../package.json');

export class Config {
    public get templatesFolderPath(): string {
        return path.join(os.homedir(), `.vscode${path.sep}fish-redux-templates_${json.version}`);
    }
    
    public get pageTemplatesFolderPath(): string {
        return path.join(this.templatesFolderPath, `${path.sep}page`);
    }

    public get componentTemplatesFolderPath(): string {
        return path.join(this.templatesFolderPath, `${path.sep}component`);
    }

    public get adapterTemplatesFolderPath(): string {
        return path.join(this.templatesFolderPath, `${path.sep}adapter`);
    }
} 

export default new Config();