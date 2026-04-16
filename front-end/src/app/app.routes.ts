import { Routes } from '@angular/router';

import { Pagina1Component } from './pages/pagina-1.component';
import { Pagina2Component } from './pages/pagina-2.component';
import { Pagina3Component } from './pages/pagina-3.component';
import { Pagina4Component } from './pages/pagina-4.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'pagina-1', pathMatch: 'full' },
	{ path: 'pagina-1', component: Pagina1Component },
	{ path: 'pagina-2', component: Pagina2Component },
	{ path: 'pagina-3', component: Pagina3Component },
	{ path: 'pagina-4', component: Pagina4Component },
	{ path: '**', redirectTo: 'pagina-1' }
];
