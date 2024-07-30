import { CarouselImage } from "../../components/carousel/carousel.component";
import { AdventureData } from "../../../pages/latest-adventures/adventure-card/adventure-card.component";
import { CurrentProjectData } from "../../../pages/current-project/current-project.component";

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface RuntimeConfig<Type> {
	path: string;
}

export const CFG_HERO_IMAGES: RuntimeConfig<CarouselImage[]> = { path: "/assets/configs/hero_images.yaml" };
export const CFG_PUBLICATIONS: RuntimeConfig<string[]> = { path: "/assets/configs/publications.yaml" };
export const CFG_ADVENTURES: RuntimeConfig<AdventureData[]> = { path: "/assets/configs/adventures.yaml" };
export const CFG_CURRENT_PROJECT: RuntimeConfig<CurrentProjectData> = { path: "/assets/configs/current_project.yaml" };
