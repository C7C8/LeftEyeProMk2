import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: "Home" },
	{ path: 'gallery', component: HomeComponent, title: "Gallery" },
	{ path: 'other-products', component: HomeComponent, title: "Other Products" },
	{ path: 'about', component: HomeComponent, title: "About the Photographer" },
	{ path: 'latest-adventures', component: HomeComponent, title: "Latest Adventures" },
	{ path: 'current-project', component: HomeComponent, title: "Current Project" },
	{ path: 'contact', component: HomeComponent, title: "Contact" },
];
