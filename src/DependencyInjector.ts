import { GradeDisplay } from "./View/GradeDisplay";
import { MainPageGradeDisplay } from "./View/GradeDisplay/MainPage/MainPageGradeDisplay";

export class Injector {
    public static get GradeDisplay(): GradeDisplay { return new MainPageGradeDisplay(); }
}