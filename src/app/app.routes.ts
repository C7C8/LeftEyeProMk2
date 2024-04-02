import { Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: "Left Eye Productions by Steven Kazlowski" },
	{ path: 'gallery', component: HomeComponent, title: "Left Eye Productions - Gallery",},
	{ path: 'other-products', component: HomeComponent, title: "Left Eye Productions - Other Products" },
	{ path: 'about', component: HomeComponent, title: "Left Eye Productions - About the Photographer" },
	{ path: 'latest-adventures', component: HomeComponent, title: "Left Eye Productions - Latest Adventures" },
	{ path: 'current-project', component: HomeComponent, title: "Left Eye Productions - Current Project" },
	{ path: 'contact', component: HomeComponent, title: "Left Eye Productions - Contact" },
];
