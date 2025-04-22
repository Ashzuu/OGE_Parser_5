import { GradeDisplay } from './View/GradeDisplay';
import { MainPageGradeDisplay } from './View/GradeDisplay/MainPage/MainPageGradeDisplay';

/**
 * Injecteur de dependance
 */
export class Injector {
    /** Grade display utilisé */
    public static get GradeDisplay(): GradeDisplay {
        return new MainPageGradeDisplay();
    }
}
