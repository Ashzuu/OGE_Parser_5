import 'jest';
import { chromeMock } from './jest.setup';

declare global {
    namespace NodeJS {
        interface Global {
            chrome: any;
        }
    }
}

declare global {
    var chrome: typeof chromeMock;
}
