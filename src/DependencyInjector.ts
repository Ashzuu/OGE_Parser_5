import { GradeDisplay } from "./View/GradeDisplay";
import { DebugGradeDisplay } from "./View/GradeDisplay/Debug/DebugGradeDisplay";
import { MainPageGradeDisplay } from "./View/GradeDisplay/MainPage/MainPageGradeDisplay";
import { OverrideGradeDisplay } from "./View/GradeDisplay/Override/OverrideGradeDisplay";

/**
 * Injecteur de dependance
 */
export class Injector {
    /** Grade display utilisé */
    public static get GradeDisplay(): GradeDisplay { return new OverrideGradeDisplay(); }
}