import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { GalleryComponent } from "./pages/gallery/gallery.component";
import { OtherProductsComponent } from "./pages/other-products/other-products.component";
import { LatestAdventuresComponent } from "./pages/latest-adventures/latest-adventures.component";
import { CurrentProjectComponent } from "./pages/current-project/current-project.component";
import { ContactComponent } from "./pages/contact/contact.component";

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: "Left Eye Productions by Steven Kazlowski" },
	{ path: 'about', component: AboutComponent, title: "Left Eye Productions - About the Photographer" },
	{ path: 'gallery', component: GalleryComponent, title: "Left Eye Productions - Gallery",},
	{ path: 'other-products', component: OtherProductsComponent, title: "Left Eye Productions - Other Products" },
	{ path: 'latest-adventures', component: LatestAdventuresComponent, title: "Left Eye Productions - Latest Adventures" },
	{ path: 'current-project', component: CurrentProjectComponent, title: "Left Eye Productions - Current Project" },
	{ path: 'contact', component: ContactComponent, title: "Left Eye Productions - Contact" },
];
