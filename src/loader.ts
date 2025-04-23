import Injector from "./DependencyInjector";
import { OverrideGradeDisplay } from "./View/GradeDisplay/Override/OverrideGradeDisplay";

Injector.register("GradeDisplay", OverrideGradeDisplay);